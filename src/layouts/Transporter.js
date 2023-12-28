import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Transporter = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user'))
    useEffect(()=>{

    
    if(userData?.role === 'sector-leader'){
        navigate('/starter')
    }else if(userData?.role == 'district-leader'){
        navigate('/district')
    }else if(userData?.role === "rab-leader"){
        navigate('/rabportal')
    }else if(!userData){
        navigate('/register')
    }
},[])
  return (
    <div>
        <h1>Hello</h1>
      
    </div>
  )
}

export default Transporter
