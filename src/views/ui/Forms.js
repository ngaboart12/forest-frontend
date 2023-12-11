import { useState } from "react";

import Input from "./Input";
import jsonData from './data.json'
import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import axios  from "axios";
import {ThreeDots} from "react-loader-spinner"
import { ToastContainer, toast } from 'react-toastify';

const Forms = () => {
  const [loading,setLoading] = useState(false)
  const [farmerId,setFamerId] = useState(null)
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedCell, setSelectedCell] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const [acivitySelectedProvince, setActivitySelectedProvince] = useState('');
  const [activitySelectedDistrict, setActivitySelectedDistrict] = useState('');
  const [activitySelectedSector, setActivitySelectedSector] = useState('');



  
  const handleActivityProvinceChange = (event) => {
    setActivitySelectedProvince(event.target.value);
    // Reset other dropdowns when province changes
    setActivitySelectedDistrict('');
    setActivitySelectedSector('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      farmerActivities: {
        ...prevFormData.farmerActivities,
        province: event.target.value,
      },
    }));
  
  };

  const handleActivityDistrictChange = (event) => {
    setActivitySelectedDistrict(event.target.value);
    // Reset lower-level dropdowns when district changes
    setActivitySelectedSector('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      farmerActivities: {
        ...prevFormData.farmerActivities,
        district: event.target.value,
      },
    }));
    
  
  };

  const handleActivitySectorChange = (event) => {
    setActivitySelectedSector(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      farmerActivities: {
        ...prevFormData.farmerActivities,
        sector: event.target.value,
      },
    }));
    // Reset lower-level dropdown when sector changes

  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  
    // Reset other dropdowns when province changes
    setSelectedDistrict('');
    setSelectedSector('');
    setSelectedCell('');
    setSelectedVillage('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      addressDetails: {
        ...prevFormData.addressDetails,
        province: event.target.value,
      },
    }));
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    // Reset lower-level dropdowns when district changes
    setSelectedSector('');
    setSelectedCell('');
    setSelectedVillage('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      addressDetails: {
        ...prevFormData.addressDetails,
        district: event.target.value,
      },
    }));
  };

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
    // Reset lower-level dropdown when sector changes
    setSelectedCell('');
    setSelectedVillage('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      addressDetails: {
        ...prevFormData.addressDetails,
        sector: event.target.value,
      },
    }));
  };
  const handleCellChange = (event) => {
 
    setSelectedCell(event.target.value);
    setSelectedVillage('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      addressDetails: {
        ...prevFormData.addressDetails,
        cell: event.target.value,
      },
    }));
  };
  const handleSlectedVillage = (event) => {
 

    setSelectedVillage(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      addressDetails: {
        ...prevFormData.addressDetails,
        village: event.target.value,
      },
    }));
  };
  
  const [formData, setFormData] = useState({
    // Initialize your form fields here
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      contactNumber: '',
      idNumber: '',
      emailAddress: '',
      educationLevel: '',
      status: ''
    },
    addressDetails: {
      province: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
    },
    farmerActivities: {
      province: '',
      district: '',
      sector: '',
      forestType: '',
      activityName: '',
      cropType: '',
      farmerAbility: '',
      supportType: '',
      workStatus: '',
      
    },
  });
 

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (section, field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async(e) => {
    setLoading(true)
    // Handle form submission logic here
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:4000/api/register-farmer', formData);
        console.log(response)
        setFamerId(response.data.farmerId)
        toast.success('Farmer register successfully')
        setLoading(false)
      } catch (error) {
        toast.success('Farmer register failed')
        console.error(error.response.data); // handle error, maybe show an error message to the user
    }
  };


  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h1 className="text-[20px] pb-4">Person Info</h1>
            <div className="gap-x-2 gap-y-4 md:gap-y-10 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3">
              <Input placeholder="full name" label="Full Name" type="text"  value={formData.personalInfo.fullName} onChange={(e)=>handleInputChange('personalInfo', 'fullName', e.target.value)}/>
              <Input placeholder="Email" label="Email" type="email" value={formData.personalInfo.emailAddress} onChange={(e)=>handleInputChange('personalInfo', 'emailAddress', e.target.value)}/>
              <Input placeholder="Id Number" label="Id Number" type="number" value={formData.personalInfo.idNumber} onChange={(e)=>handleInputChange('personalInfo', 'idNumber', e.target.value)}/>
              <Input placeholder="Phone Number" label="Phone Number" type="number" value={formData.personalInfo.contactNumber} onChange={(e)=>handleInputChange('personalInfo', 'contactNumber', e.target.value)}/>
              <div className="flex flex-col  gap-1 text-black">
            <span>Gender</span>
            <div className="flex gap-2 w-full">
              <div className="flex gap-4 border px-6 py-3 rounded-md">
                <input
                  type="radio"
                  className="w-4"
                  name="sex"
                  value="Male"
                  onChange={(e)=>handleInputChange('personalInfo', 'gender', e.target.value)}
                />{" "}
                <label htmlFor="">Male</label>
              </div>
              <div className="flex gap-4 border px-6 py-3 rounded-md">
                <input
                  type="radio"
                  className="w-4"
                  name="sex"
                  value="Female"
                  onChange={(e)=>handleInputChange('personalInfo', 'gender', e.target.value)}
             
                />{" "}
                <label htmlFor="">Female</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
    <label>Education Level</label>
    <select value={formData.personalInfo.educationLevel} onChange={(e)=>handleInputChange('personalInfo', 'educationLevel', e.target.value)} className="border border-black/50 py-3 px-4 rounded-md">
      <option value="">Please select</option>
      <option value="o-level">O-level</option>
      <option value="SecondaryDiploma">Secondary Diploma</option>
    </select>
  

  </div>
              <Input placeholder="Status" label="Satus" type="text" value={formData.personalInfo.status} onChange={(e)=>handleInputChange('personalInfo', 'status', e.target.value)}/>
           
        
            </div>
            {/* Use handleInputChange to update the state */}
            <button className="mt-4 py-3 text-white bg-blue-500 hover:bg-blue-400/80 transition w-[130px] rounded-md" onClick={handleNext}>Next</button>
          </>
        );
      case 2:
        return (
          <>
          <h1 className="text-[20px]">Farmer Location Address</h1>
        <div className="grid gap-y-4 gap-x-4 md:gap-y-10 grid-cols-1 sm:gird-cols-2 md:grid-cols-3 py-4">

          <div className="flex flex-col gap-1">

      <label>Province:</label>
      <select className="border border-black/50 py-3 px-4 rounded-md" value={selectedProvince} onChange={handleProvinceChange}>
        <option value="">Select Province</option>
        {Object.keys(jsonData).map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>
        </div>
      

      {selectedProvince && (
       <div className="flex flex-col gap-1">
          <label>District:</label>
          <select className="border border-black/50 py-3 px-4 rounded-md" value={selectedDistrict} onChange={handleDistrictChange}>
            <option value="">Select District</option>
            {Object.keys(jsonData[selectedProvince]).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}
   
     

      {selectedDistrict && (
       <div className="flex flex-col gap-1">
          <label>Sector:</label>
          <select className="border border-black/50 py-3 px-4 rounded-md" value={selectedSector} onChange={handleSectorChange}>
            <option value="">Select Sector</option>
            {Object.keys(jsonData[selectedProvince][selectedDistrict]).map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      )}
    
     

{selectedSector && (
 <div className="flex flex-col gap-1">
    <label>Cell:</label>
    <select className="border border-black/50 py-3 px-4 rounded-md" value={selectedCell} onChange={handleCellChange}>
      <option value="">Select Cell</option>
      {Object.keys(jsonData[selectedProvince][selectedDistrict][selectedSector]).map((cell, index) => (
        <option key={index} value={cell}>
          {cell}
        </option>
      ))}
    </select>
  </div>
)}

{selectedCell && (
  <div className="flex flex-col gap-1">
    <label>Village:</label>
    <select className="border border-black/50 py-3 px-4 rounded-md" value={selectedVillage} onChange={handleSlectedVillage}>
      <option value="">Select Village</option>
      {jsonData[selectedProvince][selectedDistrict][selectedSector][selectedCell].map((village, index) => (
        <option key={index} value={village}>
          {village}
        </option>
      ))}
    </select>
  </div>
)}



</div>
   
    <div className="gap-2 flex fle-row">


            {/* Render address details input fields */}
            <button className="mt-4 py-3 text-blue-500 border-1 border-blue-500 hover:bg-orange-400/20 transition w-[130px] rounded-md" onClick={handlePrev}>Previous</button>
            <button className="mt-4 py-3 text-white bg-blue-500 hover:bg-blue-400/80 transition w-[130px] rounded-md" onClick={handleNext}>Next</button>
    </div>
          </>
        );
        case 3: 
        return (
          <>
          <h1 className="text-[20px]">Farmer Activities Registration</h1>
          <div className="gap-x-2 gap-y-4 md:gap-y-10 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 py-4">
          <div className="flex flex-col gap-1">

<label>Province:</label>
<select className="border border-black/50 py-3 px-4 rounded-md" value={acivitySelectedProvince} onChange={handleActivityProvinceChange}>
  <option value="">Select Province</option>
  {Object.keys(jsonData).map((province) => (
    <option key={province} value={province}>
      {province}
    </option>
  ))}
</select>
  </div>
  
  {acivitySelectedProvince && (
       <div className="flex flex-col gap-1">
          <label>District:</label>
          <select className="border border-black/50 py-3 px-4 rounded-md" value={activitySelectedDistrict} onChange={handleActivityDistrictChange}>
            <option value="">Select District</option>
            {Object.keys(jsonData[acivitySelectedProvince]).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}
  
  {activitySelectedDistrict && (
       <div className="flex flex-col gap-1">
          <label>Sector:</label>
          <select className="border border-black/50 py-3 px-4 rounded-md" value={activitySelectedSector} onChange={handleActivitySectorChange}>
            <option value="">Select Sector</option>
            {Object.keys(jsonData[acivitySelectedProvince][activitySelectedDistrict]).map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      )}

      <Input placeholder="Forest type" label="Forest Type" type="text" value={formData.farmerActivities.forestType} onChange={(e)=>handleInputChange('farmerActivities', 'forestType', e.target.value)} />
      <Input placeholder="Activity Name" label="Activity Name" type="text" value={formData.farmerActivities.activityName} onChange={(e)=>handleInputChange('farmerActivities', 'activityName', e.target.value)} />
      <Input placeholder="Type of crop to cultivate" label="Crop type" type="text" value={formData.farmerActivities.cropType} onChange={(e)=>handleInputChange('farmerActivities', 'cropType', e.target.value)}/>
      <Input placeholder="Farmer Ability" label="Farmer Abilty" type="text" value={formData.farmerActivities.farmerAbility} onChange={(e)=>handleInputChange('farmerActivities', 'farmerAbility', e.target.value)}/>
      <Input placeholder="Support type" label="support type" type="text" value={formData.farmerActivities.supportType} onChange={(e)=>handleInputChange('farmerActivities', 'supportType', e.target.value)}/>
      <div className="flex flex-col gap-1">
    <label>Work Status</label>
    <select onChange={(e)=>handleInputChange('farmerActivities', 'workStatus',  e.target.value)} className="border border-black/50 py-3 px-4 rounded-md">
      <option value="Individual">please select</option>
      <option value="Individual">Individual</option>
      <option value="Cooperative">Cooperative</option>
    </select>
  

  </div>
      
    

          </div>
          <div>
            
          </div>
          </>
        )
      // Add cases for other steps
      default:
        return null;
    }
  };


  return (
    <div className="flex flex-row gap-4 ">
      <aside className="sidebarArea shadow" id="sidebarArea" >
        <div className="fixed">

          <Sidebar />
        </div>
        </aside>
      <div className="flex flex-col">
        
  

        <div className="fixed w-[75%] z-40">

         
<Header />
</div>
    
      <form onSubmit={handleSubmit}  className="py-20">
        
      
      
      {renderFormStep()}
      {currentStep === 3 ? (
        <>
        <h1 className="text-[30px] pb-4">farmer registration id: {farmerId}</h1>
        <div className="flex flex-row gap-2">

        <button onClick={handlePrev}  className="py-3 border-1 border-blue-500 text-blue-500 px-10 rounded-md">Back</button>
        <button type="submit" onClick={handleSubmit} className="py-3 bg-blue-500 text-white px-10 rounded-md">{loading ? (<ThreeDots type="ThreeDots" color="white" height={50} width={50} />) : "Save"}</button>
        </div>
        </>
        ) : null}
        </form>
        </div>
    
    </div>
  );
};

export default Forms;
