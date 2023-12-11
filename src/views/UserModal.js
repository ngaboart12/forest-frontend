import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import axios from 'axios'

const UserModal = ({ isOpen, onClose,rowData}) => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
      cropname: '',
      quantity: '',
      farmerId: rowData._id, // Assuming farmerId is a property of rowData
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Make a POST request to your Node.js backend endpoint
        const response = await axios.post('http://localhost:4000/api/production', formData);
  
        // Handle the response as needed
        console.log('Response from server:', response);
        setSubmitMessage('production submitted successfully!');
  
        // Close the modal or perform other actions
       
      } catch (error) {
        // Handle errors, e.g., display an error message
        console.error('Error submitting form:', error);
        setSubmitMessage('Error submitting production. Please try again.');
      }
    };
  
  return (
    <>
    <Modal isOpen={isOpen} toggle={onClose} size="md" className='p-4 h-[40vh]'>
     <ModalHeader toggle={onClose} className='text-center text-[18px] px-7'>Add your production</ModalHeader>
     <ModalBody className="px-7 pb-6">
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2 w-full'>
                <h1 className='text-[16px] font-regular'>Product Name</h1>
            <input placeholder='product name' 
            required
            minLength={3}
            name='cropname'
             value={formData.cropname}
              onChange={handleChange} className='border-1  outline-none rounded-md p-3 border-black/30' />
            </div>
            <div className='flex flex-col gap-2 w-full '>
                <h1 className='text-[16px] font-regular'>Quantity</h1>
            <input placeholder='Quantity of your product ex: 1000kg'
            required
             name='quantity'
             value={formData.quantity}
             onChange={handleChange} className='border-1 outline-none rounded-md p-3 border-black/30'/>
            </div>
            <button type='submit' className='p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-md'>Add Production</button>
        </form>
        {submitMessage && (
          <div className={`mt-3 text-center ${submitMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {submitMessage}
          </div>
        )}
     </ModalBody>
  
     </Modal>
    
     </>
  )
}

export default UserModal
