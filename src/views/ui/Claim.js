import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Claim = ({ isOpen, onClose,rowData}) => {
    const [submitMessage, setSubmitMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
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
          const response = await axios.post('http://localhost:4000/api/claim', formData);
    
          // Handle the response as needed
          console.log('Response from server:', response.data);
          setSubmitMessage('Claim submitted successfully!');
    
          // Close the modal or perform other actions
         
        } catch (error) {
          // Handle errors, e.g., display an error message
          console.error('Error submitting form:', error);
          setSubmitMessage('Error submitting claim. Please try again.');
        }
      };
    
  return (
    <>
    <Modal isOpen={isOpen} toggle={onClose} size="md" className='p-4'>
     <ModalHeader toggle={onClose} className='text-center text-[18px]'>Report an issues</ModalHeader>
     <ModalBody className="">
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2 w-full'>
                <h1 className='text-[16px] font-regular'>Title of whta you claim</h1>
            <input placeholder='Title' 
            required
            minLength={5}
            name='title'
             value={formData.title}
              onChange={handleChange} className='border-1  outline-none rounded-md p-3 border-black/30' />
            </div>
            <div className='flex flex-col gap-2 w-full '>
                <h1 className='text-[16px] font-regular'>description</h1>
            <textarea placeholder='Description'
             required
             minLength={20}
             name='description'
             value={formData.description}
             onChange={handleChange} className='border-1 outline-none rounded-md p-3 border-black/30'></textarea>
            </div>
            <button type='submit' className='p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-md'>claim</button>
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

export default Claim
