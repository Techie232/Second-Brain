import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';

const useContent = () => {

   const [content, setContent] = useState([]);

   function refresh() {
      axios.get(BACKEND_URL + '/content', {
         headers: {
            'Authorization': localStorage.getItem('token'),
         }
      })
         .then((response) => {
            setContent(response?.data?.contents);
         })
   }

   return { content, refresh };
}

export default useContent