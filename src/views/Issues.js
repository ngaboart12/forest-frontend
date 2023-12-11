import { Col, Row } from "reactstrap";
import Tables from "./ui/Tables";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const Issues = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'))

 
  return (
    <div className="flex flex-row gap-4">
      {/***Top Cards***/}
      <aside className="sidebarArea shadow" id="sidebarArea" >
        <div className="fixed">

          <Sidebar />
        </div>
        </aside>

      {/***Sales & Feed***/}
      <div className="flex flex-col ">
       
       <div className="fixed w-[75%] z-40">

         
           <Header />
       </div>
       <div className="flex flex-col pt-20">

        <h1 className="text-[20px]">Welcome! {userData.fullname}</h1>
       </div>
  
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <Tables  />
        </Col>
      </Row>
    
      </div>
    </div>
  );
};

export default Issues;
