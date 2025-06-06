import React from 'react';

const Button = (props) => {
   const { variant, size, text, startIcon, endIcon, onClick, loading } = props;

   return (
      <button className={`flex items-center ${variant} ${size} rounded-md py-1 px-2`} onClick={onClick}>
         {startIcon && <span className="icon pr-2">{startIcon}</span>}
         {loading ? 'Loading...' : text}
         {endIcon && <span className="icon pl-2">{endIcon}</span>}
      </button>
   );
};

export default Button;