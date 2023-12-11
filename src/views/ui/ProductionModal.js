import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import axios from 'axios'


const ProductionModal = ({ isOpen, onClose,rowData}) => {
    const [production,setProduction] = useState(null)
   
    useEffect(() => {
        const fetchFinal= async () => {
          try {
            const response = await axios.get(`http://localhost:4000/api/get-production/${rowData._id}`); 
            setProduction(response.data)
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
        <div className='grid grid-cols-2'>

      {production && production.map((item,index)=>{
          return(
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>production list</span>
                <div className='flex flex-col gap-2 px-2'>
                 <h1>{item.cropname}</h1>
                 <h1>{item.quantity}</h1>

                </div>


            </div>
        )
    })}
    </div>
     </ModalBody>
  
     </Modal>
    
     </>
  )
}

export default ProductionModal
