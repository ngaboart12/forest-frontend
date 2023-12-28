import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap"; // Adjust the import path

const PopupModal = ({ isOpen, onClose, rowData }) => {
   if (!rowData) {
      // Handle the case where rowData is null or undefined
      return <div></div>;
    }
   
  
   return (
      <Modal isOpen={isOpen} toggle={onClose} size="lg">
         <ModalHeader toggle={onClose}>Information of {rowData.personalInfo.fullName}</ModalHeader>
         <ModalBody className="">
           <div className="grid grid-cols-2 gap-4">

         <div className="flex flex-col">
            <h1 className="text-[16px] font-bold">Personal Infomation</h1>
            <div className="py-2 px-14 flex flex-col gap-2">


          <h1>Name: {rowData.personalInfo.fullName}</h1>
          <h1>Email: {rowData.personalInfo.emailAddress}</h1>
          <h1>Project: {rowData.personalInfo.gender}</h1>
          <h1>ID: {rowData.personalInfo.idNumber}</h1>
          <h1>Education level: {rowData.personalInfo.idNumber}</h1>
          <h1>status: {rowData.personalInfo.status}</h1>
            </div>
         </div>
         <div className="flex flex-col">
            <h1 className="text-[16px] font-bold">Personal Address </h1>
            <div className="py-2 px-14 flex flex-col gap-2">


          <h1>Province: {rowData.addressDetails.province}</h1>
          <h1>District: {rowData.addressDetails.district}</h1>
          <h1>Sector: {rowData.addressDetails.sector}</h1>
          <h1>Cell: {rowData.addressDetails.cell}</h1>
          <h1>Village: {rowData.addressDetails.village}</h1>
        
            </div>
         </div>
         <div className="flex flex-col">
            <h1 className="text-[16px] font-bold">plan Infomation</h1>
            <div className="py-2 px-14 flex flex-col gap-2">


          <h1>Activity Name: {rowData.farmerActivities.activityName}</h1>
          <h1>forest type: {rowData.farmerActivities.forestType}</h1>
          <h1>cropType: {rowData.farmerActivities.cropType}</h1>
          <h1>Farmer Ability: {rowData.farmerActivities.farmerAbility}</h1>
          <h1>Support Type: {rowData.farmerActivities.supportType}</h1>
          <h1>Work Status: {rowData.farmerActivities.workStatus}</h1>
         
            </div>
         </div>
         <div className="flex flex-col gap-2">
            <h1 className="font-bold">Files</h1>
            <div className="flex flex-col gap-2 px-14">

            <a href={rowData.idCopy.url} target="_blank" rel="noopener noreferrer" className="text-blue-500" download>
                View ID 
               </a>
            <a href={rowData.landCertificate.url} target="_blank" rel="noopener noreferrer" className="text-blue-500" download>
                View Land Certificate 
             </a>
            </div>

         </div>
           </div>
            {/* Add more details as needed */}
         </ModalBody>
      </Modal>
   );
};

export default PopupModal;