import React from 'react'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Router, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Shared from './pages/Shared'

const App = () => {
   return (

      <div>
         <BrowserRouter>
            <Routes>
               <Route path='/signup' element={<Signup />} />
               <Route path='/signin' element={<Signin />} />
               <Route path='/dashboard' element={<Dashboard />} />
               <Route path='/share/:shareId' element={<Shared />} />
            </Routes>

         </BrowserRouter>
      </div>
   )
}

export default App