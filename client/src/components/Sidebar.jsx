import React from 'react'
import SidebarItem from './SidebarItem'
import TwitterIcon from './TwitterIcon'
import YoutubeIcon from './YoutubeIcon'
import AcademicIcon from '../icons/AcademicIcon'

const SideBar = () => {
   return (
      <div className='h-screen bg-white border-r-2 w-56 fixed left-0 top-0'>
         <div className='flex justify-center items-center gap-x-3 border p-3 text-2xl'>

            <div className='text-purple-600'>
               <AcademicIcon/>
            </div>

            <div>
               Brainly
            </div>
         </div>

         <div className='pt-2'>
            <SidebarItem text={'Twitter'} icon={<TwitterIcon />} />
            <SidebarItem text={'Youtube'} icon={<YoutubeIcon />} />
         </div>
      </div>
   )
}

export default SideBar