import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import { Card } from '../components/Card';

const Shared = () => {

   const { shareId } = useParams();
   const [content, setContent] = useState([]);
   const [username, setUsername] = useState('');

   const fetchData = async () => {

      const response = await axios.get(BACKEND_URL + '/brain/' + shareId)
      setContent(response?.data?.contents);
      setUsername(response?.data?.userName);
   }

   useEffect(() => {
      fetchData();
   }, [])

   return (
      <div>
         <div className='p-4 text-2xl font-semibold text-center text-teal-500'>
            This Brain is of <span className=' text-blue-600'>{username}</span>
         </div>

         <div className='w-screen h-screen pb-10 overflow-x-hidden bg-slate-500 flex gap-x-5  p-10'>
            <div className='bg-slate-500 flex flex-wrap gap-6 h-full w-full'>
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

export default Shared