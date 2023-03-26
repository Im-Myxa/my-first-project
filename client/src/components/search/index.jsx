import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ search, onHandleSearch }) => {
  return (
    <div className='mx-auto flex w-[450px] items-center justify-center xs:w-[400px]'>
      <input
        type='text'
        className='border-border w-full rounded-xl border p-2 pl-10 hover:border-main/[0.4]'
        value={search}
        placeholder={'Поиск'}
        onChange={event => onHandleSearch(event.target.value)}
      />
      {search && (
        <button
          onClick={() => onHandleSearch('')}
          className='ml-[-40px] flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6 opacity-50'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.string,
  onHandleSearch: PropTypes.func
};

export default Search;
