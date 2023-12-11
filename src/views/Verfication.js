import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Claim from './ui/Claim';
import UserModal from './UserModal';
import WhyModal from './ui/WhyModal';

const Verfication = () => {
    const navigate = useNavigate();
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [isModal2Open,setIsModal2Open] = useState(false)
    const [isModalWhy,setIsModalWhy] = useState(false)
    const [farmerData, setFarmerData] = useState(null);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedFarmerData = localStorage.getItem('farmerData');

    // Parse the stored JSON data
    const parsedFarmerData = JSON.parse(storedFarmerData);

    // Set the data in the state variable
    setFarmerData(parsedFarmerData);
  }, []);
    const handleContinueClick = () => {
       setIsModal2Open(true)
      };
    const handleWhyClick = () => {
       setIsModalWhy(true)
      };
      const handleBackClick = () => {
        navigate(-1);
      };
      if (!farmerData) {
        return <div>Loading...</div>; // You can add a loading indicator or some other UI while data is being retrieved.
      }
    
  return (
    <div  className='flex flex-col justify-center items-center w-full h-screen gap-y-4'>
      <div className='flex flex-col gap-4 w-full md:w-1/2 py-4 rounded-md items-center'>
      <h1 className='text-[32px]'>Farmer Infomation</h1>

      <table className='w-full'>
        <tr className='h-10 border-b border-black/30'>
          <th>name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>status</th>
        </tr> 
        <tr className=''>
          <td>{farmerData.personalInfo.fullName}</td>
          <td>{farmerData.personalInfo.emailAddress}</td>
          <td>{farmerData.personalInfo.contactNumber}</td>
          <td>{farmerData.actions === "pending" ? (<span className='text-orange-400'>undeway sector</span>) :""}{ farmerData.actions === "approved" ? (<span className='text-orange-400'>undeway district</span>) :""}
           {farmerData.actions === "underwayrab" ? (<span className='text-orange-400'>undeway rab</span>) :""} {farmerData.actions === "rejected" ? (<span className='text-red-400'> rejected</span>) :""} {farmerData.actions === "allowed" ? (<span className='text-green-500'>Allowed</span>) :""}</td>
        </tr>
        </table> 
         {farmerData.actions == "rejected" && (
          <>
          <div className='flex flex-row gap-4 w-full justify-between'>

            <div className='flex flex-col   '>

            <span className='font-[700]'>comment</span>
            <span>{farmerData.comment}</span>
            </div>
             <span className='p-2'><button onClick={()=> setIsModalOpen(true)} className='py-3 px-10 bg-orange-400 rounded-md text-white'>Claim</button></span>
          </div>
       
          </>
         )}
         {farmerData.actions === "allowed" && (
          <div className='flex flex-row gap-3'>
          <button onClick={handleWhyClick}  className='text-center p-2 mt-2 border-1 border-blue-500 rounded-sm text-blue-500 hover:scale-110 transition-all'>Why you Selected</button>
          <button onClick={handleContinueClick}  className='text-center p-2 mt-2 bg-blue-500 rounded-sm text-white hover:scale-110 transition-all'>add production</button>
          </div>
         )}
              
      </div>
      <div className='flex flex-row gap-2 items-center'>

    <button   onClick={handleBackClick} className='px-10 py-3  border-1 border-black/50 hover:bg-gray-300/80 transition-all  text-black   rounded-md'>Back</button>
   
      </div>
      {isModalOpen && (  <Claim isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} rowData={farmerData} />)}
      {isModal2Open && (  <UserModal isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} rowData={farmerData} />)}
      {isModalWhy && (  <WhyModal isOpen={isModalWhy} onClose={() => setIsModalWhy(false)} rowData={farmerData} />)}
      </div>
      
  
  )
}

export default Verfication
