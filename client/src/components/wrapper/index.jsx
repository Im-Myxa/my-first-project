import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ children }) => {
  return (
    <div className='container mx-auto min-h-screen py-4 px-10'>{children}</div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.element
};
export default Wrapper;
