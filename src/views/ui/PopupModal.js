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
           <div className="flex flex-row gap-4">

         <div className="flex flex-col">
            <h1 className="text-[16px] ">Person Infomation</h1>
            <div className="py-2 px-14 flex flex-col gap-2">


          <h1>Name: {rowData.personalInfo.fullName}</h1>
          <h1>Email: {rowData.personalInfo.emailAddress}</h1>
          <h1>Project: {rowData.personalInfo.gender}</h1>
            </div>
         </div>
         <div className="flex flex-col">
            <h1 className="text-[16px] ">plan Infomation</h1>
            <div className="py-2 px-14 flex flex-col gap-2">


          <h1>forest type: {rowData.farmerActivities.forestType}</h1>
          <h1>cropType: {rowData.farmerActivities.cropType}</h1>
         
            </div>
         </div>
           </div>
            {/* Add more details as needed */}
         </ModalBody>
      </Modal>
   );
};

export default PopupModal;