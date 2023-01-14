import React from 'react';

const Button = ({ onClick, children, moreClass, type = 'button', disabled }) => (
  <button
    disabled={disabled}
    type={type}
    onClick={onClick}
    className={`flex justify-center items-center py-[5px] px-[12px] 
      rounded-md font-normal text-base cursor-pointer border ${moreClass}`}>
    {children}
  </button>
);

export default Button;
