import React from 'react';

const MenuIcon = () => {
  return (
    <button className='flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full p-2 hover:bg-white/[0.5]'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='white'
        className='h-8 w-8 text-white'
      >
        <path
          fillRule='evenodd'
          d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
          clipRule='evenodd'
        />
      </svg>
    </button>
  );
};

export default MenuIcon;
