import { Col, Row } from "reactstrap";

import Header from "../layouts/Header";
import DistrictSidebar from "../layouts/DistrictSidebar";
import DistrictTable from "./ui/DistrictTable";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios'


const District = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user'))

    const [farmers, setFarmers] = useState([]);
    const [allowedFarmer, setAllowedFarmer] = useState([]);
    const [rejectedFarmer, setRejectedFarmer] = useState([]);
    const [pendingFarmer, setPendingFarmer] = useState([]);

    
    useEffect(() => {
      const fetchFarmers = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/farmers');
          const pendingFarmers = response.data.data.filter(farmer => farmer.actions === 'pending' || farmer.actions === 'approved' || farmer.actions === 'underwayrab');
          const allowedFarmers = response.data.data.filter(farmer => farmer.actions === 'allowed');
          const rejectedFarmers = response.data.data.filter(farmer => farmer.actions === 'rejected');
          setRejectedFarmer(rejectedFarmers)
          setAllowedFarmer(allowedFarmers)
          setPendingFarmer(pendingFarmers)
          setFarmers(response.data.data);
          console.log(allowedFarmers)
        } catch (error) {
          console.error('Error fetching farmers:', error);
        }
      };
  
      fetchFarmers();
    }, []);
    

    useEffect(() => {
    
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.role !== 'district-leader') {
    
        navigate('/login'); 
      }
    }, [navigate]);
    if (!userData || userData.role !== 'district-leader') {
      // Return null or a component indicating not logged in
      return null;
    }
  return (
    <div className="flex flex-row gap-4">
      {/***Top Cards***/}

      <aside className="sidebarArea shadow" id="sidebarArea" >
        <div className="fixed">

          <DistrictSidebar />
        </div>
        </aside>

     
      <div className="flex flex-col ">
       
       <div className="fixed w-[75%] z-40">

         
           <Header />
       </div>
       <div className="flex flex-col  pt-20 gap-2">

      
       <h1 className="text-[20px]">Welcome  {userData.fullname}</h1>
       <div className="flex flex-row gap-6"> 
          <div className="py-3 px-2 w-[120px] flex flex-col gap-1 border-1 text-white bg-[#1A2A3C] border-black/20 rounded-md items-center">
            <h1 className="text-[22px]">{farmers.length}</h1>
            <span className="text-orange-400 text-[16px]">All Farmers</span>
          </div>
          <div className="py-3 px-2 w-[120px]  flex flex-col gap-1 border-1 text-white bg-[#1A2A3C] border-black/20 rounded-md items-center">
            <h1 className="text-[22px]">{pendingFarmer.length}</h1>
            <span className="text-[16px] text-orange-400">Pending</span>
          </div>
          <div className="py-3 px-2 w-[120px]  flex flex-col gap-1 border-1 text-white bg-[#1A2A3C] border-black/20 rounded-md items-center">
            <h1 className="text-[22px]">{allowedFarmer.length}</h1>
            <span className="text-[16px] text-orange-400">Allowed</span>
          </div>
          <div className="py-3 px-2 w-[120px]  flex flex-col gap-1 border-1 text-white bg-[#1A2A3C] border-black/20 rounded-md items-center">
            <h1 className="text-[22px]">{rejectedFarmer.length}</h1>
            <span className="text-[16px] text-orange-400">Rejected</span>
          </div>
      
        </div>
       </div>
       
        
      {/***Table ***/}
      <Row>
        
        <Col lg="12">
          <DistrictTable  />
        </Col>
      </Row>
    
      </div>
    </div>
  );
};

export default District;
