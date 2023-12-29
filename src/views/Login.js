import React, { useState } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
  const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:4000/auth/login', formData);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
           toast.success('success login')
          const role = response.data.data.user.role;
          
          setLoading(false)
          switch (role) {
              case 'sector-leader':
                 
                  window.location.href = '/starter';
                  break;
              case 'district-leader':
                
                  window.location.href = '/district';
                  break;
              case 'rab-leader':
                 
                  window.location.href = '/rabportal';
                  break;
              default:
             
                  window.location.href = '/login  ';
                  break;
          }; 
          
        } catch (error) {
          toast.error('Invalid Email or Password')
          setLoading(false)
          console.error(error.message);
        }
      };
  return (
    <div className='w-full relative md:justify-center flex flex-col bg-blue-100/50 h-screen md:flex-row'>
        <motion.div
      initial={{ opacity: 0, y: 250 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }} className='md:w-1/2 py-8 w-full bg-blue-500 md:ml-[-40px] flex flex-col justify-center items-center gap-4 px-10 lg:px-20'>
        <h1 className='text-[40px] font-bold text-white text-center leading-10 uppercase'>AgroForestry management system</h1>
        <p className='text-center text-[14px] text-gray-300 leading-4'>
        Feel free to adapt this form based on your
         specific requirements and any legal or regulatory
        considerations in Rwanda. Ensure that the form clearly communicates
        the responsibilities and expectations of farmers engaging in agriculture within forested areas.
          .</p>
          <a href="/register" className='border-1 border-white py-2 px-8 text-white rounded-md hover:scale-110 transition-all'>Register Here</a>

      </motion.div>
      <motion.div
      initial={{ opacity: 0, y: -250 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration:1 }} className='sm:px-4 md:px-20 flex flex-col items-center justify-center  gap-8 w-full md:w-1/2 py-4    bg-white rounded-md '>
            <h1 className='text-[20px] font-semibold'>Sign In</h1>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>

            <div className='flex flex-col w-full gap-1'>
                <h1>Your email address</h1>
                <input placeholder='Username' className='border rounded-md outline-none border-black/80 p-3 '  
                name="email"
                value={formData.email}
                onChange={handleChange}  />

            </div>
            <div className='flex flex-col w-full gap-1'>
                <h1>Password</h1>
                <input placeholder='Password' className='border rounded-md outline-none border-black/80 p-3 '
                name="password"
                type='password'
                value={formData.password}
                onChange={handleChange}/>
                

            </div>
            <button type='submit' className='p-3 mt-4  bg-blue-400 hover:bg-blue-500 transition-all w-full rounded-md text-white text-[20px]'>{loading ? "Loading.." : "Login"}</button>
          
            </form>
        </motion.div>
      
    </div>
  )
}

export default Login
