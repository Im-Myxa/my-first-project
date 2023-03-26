import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/axios';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  const getProduct = useCallback(async () => {
    const { data } = await axios.get(`/products/${params.productId}`);
    setProduct(data);
  }, [params.productId]);

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return (
      <div className='py-10 text-center text-xl text-white'>Загрузка...</div>
    );
  }

  return (
    <div className='mx-auto my-10 space-y-4 bg-white text-main lg:w-[1000px] md:w-[750px] sm:w-[380px]'>
      <div className='mx-auto flex gap-2 sm:grid'>
        <img
          src={`http://localhost:8080/${product.image}`}
          alt='Картинка товара'
          className='mx-auto h-96 w-[288px] object-cover'
        />

        <div className='mx-auto items-center justify-center space-y-4'>
          <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>{product.name}</h1>
            <p className='text-xl '>Цена - {product.price} ₽</p>
          </div>
          <div className='space-y-2'>
            <p className='text-xl font-bold'>Описание</p>
            <p className=''>{product.description}</p>
          </div>
        </div>
      </div>
      <button
        type='button'
        className='mx-auto w-[288px] rounded-lg border border-main p-2 hover:bg-main hover:text-white'
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductPage;
