import React, { useState } from 'react';
import { sortArr } from '../../utils/sorting';
import PropTypes from 'prop-types';

const Sorting = ({ sortType, onSortType }) => {
  const [show, setShow] = useState(false);

  return (
    <div className='mx-auto sm:w-[480px] xs:w-[400px]'>
      <div className='flex items-center justify-center gap-2'>
        <span className=''>Сортировать по:</span>
        <button
          className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
          onClick={() => setShow(!show)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5'
            />
          </svg>
        </button>
      </div>
      {show && (
        <div className='absolute right-0 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md'>
          {sortArr.map(item => {
            return (
              <div
                key={item.name}
                onClick={() => {
                  onSortType(item.name);
                  setShow(!show);
                }}
                className='flex items-center justify-between border-b border-main/[0.2] p-2'
              >
                <button type='button'>{item.name}</button>
                {item.name === sortType && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

Sorting.propTypes = {
  sortType: PropTypes.string,
  onSortType: PropTypes.func
};

export default Sorting;
