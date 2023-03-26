import React from 'react';

const CloseProfileIcon = () => {
  return (
    <button className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full p-2 hover:bg-main/[0.2]'>
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
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </button>
  );
};

export default CloseProfileIcon;
