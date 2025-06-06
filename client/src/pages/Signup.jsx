import React, { useRef, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

   const navigate = useNavigate();
   const usernameRef = useRef();
   const passwordRef = useRef();
   const [loading, setLoading] = useState(false);

   const signup = async () => {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      await axios.post(BACKEND_URL + '/signup', {
         username, password
      });

      navigate('/signin');
      alert('you have signed UP');
   }

   return (
      <div className='w-screen h-screen bg-gray-200 flex justify-center items-center'>
         <div className='bg-white rounded-md border min-w-80 p-5 flex flex-col items-center'>
            <Input ref={usernameRef} type={'text'} placeholder={'Username'} />
            <Input ref={passwordRef} type={'password'} placeholder={'Password'} />
            <div className='flex justify-center items-center mt-5 w-full px-8'>
               <Button variant={'bg-purple-400 w-full flex justify-center font-semibold'} loading={loading}
                  text={'Signup'} onClick={signup} />
            </div>
         </div>
      </div>
   )
}

export default Signup