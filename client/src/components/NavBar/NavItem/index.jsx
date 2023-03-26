import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavItem = ({ text, navigate, onLogOut }) => {
  return (
    <NavLink to={navigate}>
      <button
        onClick={onLogOut}
        className='relative cursor-pointer text-xl text-white after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:scale-0 after:bg-white after:transition-transform hover:after:scale-100'
      >
        {text}
      </button>
    </NavLink>
  );
};

NavItem.propTypes = {
  text: PropTypes.string,
  navigate: PropTypes.string,
  onLogOut: PropTypes.func
};

export default NavItem;
