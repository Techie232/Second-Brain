import React from 'react'

const SidebarItem = ({ text, icon }) => {
   return (
      <div className='flex items-center gap-2 justify-start ml-5'>
         {icon} {text}
      </div>
   )
}

export default SidebarItem