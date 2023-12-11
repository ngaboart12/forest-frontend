import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

const Register = () => {
  const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        role:'', // default value
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
            const response = await axios.post('http://localhost:4000/auth/register', formData);
    
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
    
            // Redirect based on user role
            const role = response.data.user.role;
            setLoading(false)
            switch (role) {
                case 'sector-leader':
                    // Redirect to sector leader page
                    // Replace '/sector-leader' with your actual route
                    window.location.href = '/starter';
                    break;
                case 'district-leader':
                    // Redirect to district leader page
                    // Replace '/district-leader' with your actual route
                    window.location.href = '/district';
                    break;
                case 'rab-leader':
                    // Redirect to rab portal page
                    // Replace '/rab-portal' with your actual route
                    window.location.href = '/rabportal';
                    break;
                default:
                    // Redirect to a default page if the role is not recognized
                    // Replace '/default-page' with your actual route
                    window.location.href = '/login  ';
                    break;
            }
    
        } catch (error) {
            console.error(error.response.data); // handle error, maybe show an error message to the user
        }
    };
  return (
    <div className='w-full relative md:justify-center flex flex-col bg-blue-100/50 h-screen md:flex-row'>
         <motion.div
      initial={{ opacity: 0, y: -250 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    
className='md:w-1/2 py-8 w-full bg-blue-500 md:ml-[-40px] flex flex-col justify-center items-center gap-4 px-10 lg:px-20'>
        <h1 className='text-[40px] font-bold text-white text-center leading-8'>Rwanda Forest <br /> Agriculture</h1>
        <p className='text-center text-[14px] text-gray-300 leading-4'>
        Feel free to adapt this form based on your
         specific requirements and any legal or regulatory
        considerations in Rwanda. Ensure that the form clearly communicates
        the responsibilities and expectations of farmers engaging in agriculture within forested areas.
          .</p>
          <a href="/login" className='border-1 border-white py-2 px-8 text-white rounded-md hover:scale-110 transition-all'>Login Here</a>

      </motion.div>
        <motion.div
      initial={{ opacity: 0, y: 250 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration:1 }} className=' px-4 flex flex-col items-center justify-center  gap-8 w-full md:w-1/2 py-4    bg-white rounded-md '>
            <h1 className='text-[24px] font-semibold'>Sign Up</h1>
            <form action="" onSubmit={handleSubmit}  className=' items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-4'>

            <div className='flex flex-col w-full gap-1'>
                <h1>Full name</h1>
                <input required placeholder='Full name' name='fullname' value={formData.fullname}   onChange={handleChange} 
                   type='text' className='bg-gray-200 outline-none border-black/30 p-3 '/>

            </div>
            <div className='flex flex-col w-full gap-1'>
                <h1>Your email address</h1>
                <input required placeholder='Email' name='email' value={formData.email}    onChange={handleChange}  type='email' className='bg-gray-200 outline-none border-black/30 p-3 '/>

            </div>
            <div className='flex flex-col w-full gap-1'>
                <h1>Role</h1>
                <select required  name='role'
              value={formData.role}  onChange={handleChange} className='bg-gray-200 outline-none border-black/30 p-3 '>
                    <option value="">please select</option>
                    <option value="sector-leader">sector leader</option>
                    <option value="district-leader">District leader</option>
                    <option value="rab-leader">Rab</option>
                </select>

            </div>
            <div className='flex flex-col w-full gap-1'  
          
              onChange={handleChange}>
                <h1>Password</h1>
                <input required minLength={6} placeholder='Password'  
                type='password'
              name='password'
              value={formData.password}
              onChange={handleChange} className='bg-gray-200 outline-none border-black/30 p-3 '/>

            </div>
            <button type='submit' className=' h-[50px] bg-blue-400 hover:bg-blue-500 transition-all w-full rounded-md text-white text-[14px]'>{loading ? "Loading ..." : "Register"}</button>

            </form>
        </motion.div>
      
    </div>
  )
}

export default Register
