import React, { useState } from 'react';
import MenuCloseIcon from './MenuCloseIcon';
import MenuIcon from './MenuIcon';
import MobilMenu from './MobilMenu';
import NavItem from './NavItem';
import NavLogo from './NavLogo';

const NavBar = () => {
  const [isMobilMenuOpen, setMobilMenuOpen] = useState(false);

  return (
    <header className='flex items-center'>
      <NavLogo />
      <nav className='hidden md:flex space-x-10 ml-auto'>
        <NavItem text='Главная' navigate={'/services'} />
        <NavItem text='Участники' navigate={'/products'} />
        <NavItem text='Избранные' navigate={'/'} />
      </nav>
      <div
        className='flex md:hidden ml-auto cursor-pointer z-30'
        onClick={() => setMobilMenuOpen(!isMobilMenuOpen)}
      >
        {isMobilMenuOpen ? <MenuCloseIcon /> : <MenuIcon />}
      </div>
      <MobilMenu isOpen={isMobilMenuOpen} />
    </header>
  );
};

export default NavBar;
