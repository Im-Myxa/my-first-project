import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../../../components/productCard';
import { getAllProduct } from '../../../../store/features/product/productSlice';

const GetAllProduct = ({ onShow }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const { products, loading, status } = useSelector(state => state.product);

  if (!products) {
    return (
      <div className='items-center justify-center bg-white py-10 text-2xl text-main'>
        Список пуст!
      </div>
    );
  }

  return (
    <>
      {loading && status === 'pending' ? (
        <div className='content-center justify-center'>Загрузка...</div>
      ) : (
        <div className='my-4 grid grid-cols-4 gap-8'>
          {products.map(product => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                onShow={onShow}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

GetAllProduct.propTypes = {
  onShow: PropTypes.func
};

export default GetAllProduct;
