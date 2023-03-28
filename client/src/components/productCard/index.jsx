import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getAllProduct,
  removeProduct
} from '../../store/features/product/productSlice';
import { addProductInBasket } from '../../store/features/basket/basketSlice';
import { tokenIsValid } from '../../store/features/auth/authSlice';
import AddProductInBasket from '../icons/addProductInBasket';
import RemoveProduct from '../icons/removeProduct';
import EditProduct from '../icons/editProduct';

const ProductCard = ({ product, onShow }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [id, setId] = useState('');

  const getUserId = async () => {
    try {
      const data = await dispatch(tokenIsValid());
      setId(data.payload.user._id);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  const handleRemoveProduct = async () => {
    try {
      await dispatch(removeProduct(product._id));
      dispatch(getAllProduct());
    } catch (error) {
      return error;
    }
  };

  const handleAddProductInBasket = async () => {
    try {
      const addProduct = {
        userId: id,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      };
      await dispatch(addProductInBasket(addProduct));
    } catch (error) {
      return error;
    }
  };

  return (
    <div className='overflow-screen group rounded-lg text-xl text-main hover:shadow-lg'>
      <NavLink to={`/products/${product._id}`}>
        {product.image ? (
          <img
            src={`http://localhost:8080/${product.image}`}
            className='flex h-[304px] w-full flex-shrink-0 rounded-lg object-cover group-hover:opacity-75 '
          />
        ) : (
          <img
            src={`https://нт.элитсад.рф/assets/components/project/app/img/empty.png`}
            className='flex h-[304px] w-full flex-shrink-0 rounded-lg object-cover group-hover:opacity-75 '
          />
        )}
      </NavLink>
      <div className=''>
        <NavLink to={`/products/${product._id}`}>
          <p className='my-2 w-full truncate px-2 text-base'>{product.name}</p>
        </NavLink>
        <div className='my-2 flex items-center justify-between px-2'>
          <NavLink>
            <p>{product.price} ₽</p>
          </NavLink>
          {pathname === '/adminPage' ? (
            <div className='flex'>
              <button
                className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
                onClick={() => onShow({ status: true, _id: product._id })}
              >
                <EditProduct />
              </button>
              <button
                className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
                onClick={handleRemoveProduct}
              >
                <RemoveProduct />
              </button>
            </div>
          ) : (
            <button
              className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
              onClick={handleAddProductInBasket}
            >
              <AddProductInBasket />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  onShow: PropTypes.func
};

export default ProductCard;
