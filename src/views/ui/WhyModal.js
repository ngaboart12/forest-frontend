import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import axios from 'axios'


const WhyModal = ({ isOpen, onClose,rowData}) => {
    const [final,setFinal] = useState(null)
   
    useEffect(() => {
        const fetchFinal= async () => {
          try {
            const response = await axios.get(`http://localhost:4000/api/allowed/${rowData._id}`); 
            setFinal(response.data)
            console.log(response.data)
          } catch (error) {
            console.error('Error fetching issues: error');
          }
        };
      
        fetchFinal();
      }, []);
    
  return (
    <>
    <Modal isOpen={isOpen} toggle={onClose} size="md" className='p-4'>
     <ModalHeader toggle={onClose} className='text-center text-[18px]'>Why we choose you</ModalHeader>
     <ModalBody className="">
      {final && final.map((item,index)=>{
        return(
            <div className='flex flex-col gap-2'>
                <h1>full Name: {item.farmer.personalInfo.fullName}</h1>
                <span className='font-medium'>List of reasons why we choose you</span>
                <div className='flex flex-col gap-2 px-2'>
                    {item.follows.map((reason,index)=>{
                        return(
                            <div className='flex flex-row gap-2'>
                                <span>{index+1}:</span>
                                <span>{reason}</span>
                            </div>
                        )
                    })}

                </div>


            </div>
        )
      })}
     </ModalBody>
  
     </Modal>
    
     </>
  )
}

export default WhyModal
