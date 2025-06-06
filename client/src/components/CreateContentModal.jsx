import React, { useRef, useState } from 'react'
import CrossIcon from '../icons/CrossIcon'
import Input from './Input'
import Button from './Button'
import { BACKEND_URL } from '../config'
import axios from 'axios'

// Controlled Component
const CreateContentModal = ({ open, onClose }) => {

   const titleRef = useRef();
   const linkRef = useRef();
   const [type, setType] = useState('youtube');

   function trimAfterAmpersend(str) {

      let newStr = '';
      for (let i = 0; i < str.length; ++i) {
         if (str[i] == '&')
            break;
         newStr += str[i];
      }
      return newStr;
   }

   const addContent = async () => {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      const newValue = link.replace('x.com', 'twitter.com');

      await axios.post(BACKEND_URL + '/content', {
         title,
         link: type === 'twitter' ? newValue + '?ref_src=twsrc%5Etfw' : trimAfterAmpersend(newValue),
         type
      },
         {
            headers: {
               "Authorization": localStorage.getItem('token')
            }
         });

      onClose();
   }

   return (
      <div>
         {
            open &&
            <div className='w-screen h-screen fixed top-0 left-0 flex justify-center items-center'>

               {/* Translucent background */}
               <div className='absolute w-full h-full bg-black opacity-60'></div>

               {/* Modal content */}
               <div className='relative z-10 bg-white p-4 rounded-md'>
                  <div className='flex justify-end cursor-pointer' onClick={onClose}>
                     <CrossIcon />
                  </div>
                  <div>
                     <Input ref={titleRef} type={'text'} placeholder={"Title"} />
                     <Input ref={linkRef} type={'text'} placeholder={"Link"} />
                  </div>

                  <div className='flex justify-center items-center outline-none text-red-800 border mx-3 p-2'>
                     <select onChange={(e) => setType(e.target.value)} name="" id="">
                        <option className='w-full' value="youtube">Youtube</option>
                        <option value="twitter">Twitter</option>
                     </select>
                  </div>

                  <Button onClick={addContent} variant={'bg-yellow-500 ml-2 mt-4'} text={"Submit"} />
               </div>

            </div>
         }
      </div>
   )
}

export default CreateContentModal