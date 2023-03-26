import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLogo = () => {
  return (
    <div className='absolute left-4 mx-8 flex items-center gap-4'>
      <NavLink to='/products'>
        <img
          src='https://10.img.avito.st/image/1/sxCGt7axH_mwAJ307OGYSXgUH_06FhX7'
          alt='Logo'
          className='h-24 w-24 cursor-pointer rounded-full invert backdrop-invert xs:h-20 xs:w-20'
        />
      </NavLink>
      <span className='text-2xl text-white sm:hidden'>Здоровое тело</span>
    </div>
  );
};

export default NavLogo;
