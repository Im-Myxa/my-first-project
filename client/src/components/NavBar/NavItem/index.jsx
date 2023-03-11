import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavItem = ({ text, navigate, onLogOut }) => {
  return (
    <NavLink to={navigate}>
      <div className='cursor-pointer'>
        <button onClick={onLogOut} className='text-gray-500 hover:text-black '>
          {text}
        </button>
      </div>
    </NavLink>
  );
};

NavItem.propTypes = {
  text: PropTypes.string,
  navigate: PropTypes.string,
  onLogOut: PropTypes.func
};

export default NavItem;
