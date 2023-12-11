import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import SortTable from "../../components/dashboard/SortTable";
import { useEffect, useState } from "react";
import axios from 'axios'



const Tables = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/farmers'); // Replace with your actual API endpoint
        setFarmers(response.data.data);
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };

    fetchFarmers();
  }, []);
  

  const [status,setStatus] = useState("all")
  return (
    <Row>
      <Col>
      <div className="flex flex-row gap-6 py-4 items-center">
        
        <span className={`${status=== 'all' ? "text-white  bg-black " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8 `} onClick={()=> setStatus("all")}>All farmers</span>
        <span className={`${status=== 'pending' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("pending")}>Pending</span>
        <span className={`${status=== 'allowed' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("allowed")}>Allowed</span>
        <span className={`${status=== 'rejected' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("rejected")}>Rejected</span>
        <span className={`${status=== 'issues' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("issues")}>Reported issues</span>
       
        
      </div>
      </Col>
      <Col lg="12">
        <SortTable status={status} farmers={farmers}/>
      </Col>
  
   
 
 
    </Row>
  );
};

export default Tables;
