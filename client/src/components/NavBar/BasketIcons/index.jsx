import React from 'react';
import PropTypes from 'prop-types';

const BasketIcons = ({quantityProducts}) => {
  return (
    <div className='relative flex'>
      <button className='flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full p-2 hover:bg-white/[0.5]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-8 w-8 text-white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
          />
        </svg>
      </button>
      {quantityProducts && <div className='absolute rounded-full items-center justify-center bg-red-500 bottom-0 right-0 text-[11px] text-white px-1'>{quantityProducts}</div>}
    </div>
    
  );
};

BasketIcons.propTypes = {
  quantityProducts: PropTypes.number,
};

export default BasketIcons;
