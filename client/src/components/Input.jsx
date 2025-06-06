import React from 'react'

const Input = ({ type, onChange, variant, placeholder, ref }) => {
   return (
      <div>
         <input ref={ref} type={type} className={`${variant} px-4 py-2 border rounded m-2`} placeholder={placeholder} onChange={onChange} />
      </div>
   )
}

export default Input