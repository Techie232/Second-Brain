import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import PlusIcon from '../icons/PlusIcon'
import ShareIcon from '../icons/ShareIcon'
import { Card } from '../components/Card'
import CreateContentModal from '../components/CreateContentModal'
import SideBar from '../components/SideBar'
import useContent from '../hooks/UseContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

const Dashboard = () => {

   const [modalOpen, setModalOpen] = useState(false);

   const { content, refresh } = useContent();

   useEffect(() => {
      refresh();
   }, [modalOpen])

   return (
      <div className='flex'>
         <SideBar />
         <div className='p-4 ml-56 min-h-screen bg-gray-100 w-full'>
            <CreateContentModal open={modalOpen} onClose={() => {
               setModalOpen(false)
            }} />

            <div className='flex gap-x-4 justify-end'>
               <Button variant="bg-purple-300" startIcon={<PlusIcon />} size="text-xl" text="Add Content" onClick={() => setModalOpen(true)} />
               <Button variant="bg-gray-300" startIcon={<ShareIcon />} size="text-xl" text="Share Brain"
                  onClick={async () => {
                     const response = await axios.post(BACKEND_URL + '/brain/share', { share: true }, {
                        headers: {
                           'Authorization': localStorage.getItem('token')
                        }
                     });
                     const shareUrl = `http://localhost:5173/share/${response?.data?.hash}`;
                     alert(shareUrl);
                  }}
               />
            </div>

            <div className='flex gap-5 mt-4 flex-wrap'>
               {
                  content?.map(({ type, link, title }, index) => (
                     <Card key={index} link={link} title={title} type={type} />
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default Dashboard