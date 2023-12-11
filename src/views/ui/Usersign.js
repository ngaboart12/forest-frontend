import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Usersign = () => {
    const navigate = useNavigate();
    const [farmerId,setFarmerId] = useState()
    console.log(farmerId)
    const handleContinueClick = async() => {
      try {
        const response = await axios.get(`http://localhost:4000/api/single-farmer/${farmerId}`);
        const userData = response.data;

  
        localStorage.setItem('farmerData', JSON.stringify(userData));
  
        navigate('/verification');
      } catch (error) {
        console.error('Error fetching data:', error.message);
     
      }
      };
  return (
    <div  className='flex flex-col justify-center items-center w-full h-screen gap-y-4'>
      <h1 className='text-[32px]'>Rwanda Forest Agriculture</h1>
      <div className='flex flex-col gap-4 w-full md:w-1/2 items-center'>

      <input onChange={(e)=> setFarmerId(e.target.value)} placeholder='Enter Farmer Id'  className='border border-black/40 outline-none p-3 rounded-md w-[80%]' type='number'/>
    <button onClick={handleContinueClick} className='p-3 bg-blue-500 hover:bg-blue-500/80 transition-all  text-white w-[30%] rounded-md'>Continue</button>
      </div>
      
    </div>
  )
}

export default Usersign
