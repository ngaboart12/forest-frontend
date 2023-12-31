import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";

import { useEffect, useState } from "react";
import PopupModal from "./PopupModal";
import axios from 'axios'
import jsPDF from "jspdf";
import "jspdf-autotable"
import logo from '../../assets/images/logos/rab.png'
import { ToastContainer, toast } from 'react-toastify'; 


const DistrictTable = () => {
  const [farmers, setFarmers] = useState([]);
  const [openComment,setOpenComment] = useState(null)
  const [comment, setComment] = useState('');
  const [issues,setIssues] = useState()

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/farmers'); // Replace with your actual API endpoint
        setFarmers(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };

    fetchFarmers();
  }, []);
   

  const [status,setStatus] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
 };
 const handleApproveClick = async (farmerId) => {
  try {
    // Send a request to your Node.js backend to update the status
    await axios.put(`http://localhost:4000/api/update-farmer/${farmerId}`, {
      status: 'approved'
      
    });

    // Fetch updated farmers data
    toast.success("success approve")
    const response = await axios.get('http://localhost:4000/api/farmers');
    setFarmers(response.data.data);
  } catch (error) {
    toast.error(error.message)
    console.error('Error updating status:', error);
  }
};
 const handleRejectClick = async (farmerId) => {
  try {
    // Send a request to your Node.js backend to update the status
    await axios.put(`http://localhost:4000/api/update-farmer/${farmerId}`, {
      status: 'rejected',
      comment: comment,
    });
    toast.success("success reject")
    // Fetch updated farmers data
    const response = await axios.get('http://localhost:4000/api/farmers');
    setFarmers(response.data.data);
  } catch (error) {
    toast.error(error.message)
    console.error('Error updating status:', error);
  }
};
const handleReportClick = async () => {
  try {
    const filteredData =  farmers.filter((item) => item.actions !== 'rejected' && item.actions !== 'pending')
    const response = await axios.put('http://localhost:4000/district/report');
    toast.success("report successfully")
    const responses = await axios.get('http://localhost:4000/api/farmers');
    setFarmers(responses.data.data);
    console.log('Report sent successfully:', response.data);
  } catch (error) {
    // Handle errors (e.g., show an error message)
    console.error('Error reporting to lab:', error);
  }
};
useEffect(() => {
  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/issues'); 
      setIssues(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching issues: error');
    }
  };

  fetchIssues();
}, []);

const userData = JSON.parse(localStorage.getItem("user"));
const userDistrict = userData?.district;

const doneProjects = (status === 'all' ? farmers : farmers.filter((tdata) => tdata.actions === status))
  .filter(
    (tdata) =>
      tdata.addressDetails.district === userDistrict
  );


const downloadAllDataPDF = () => {
  let title = "";
  if(status == "all"){
    title += "list of all Farmers"
  }
  else if (status === 'approved') {
    title += " List Of Approved Farmers";
  } else if (status === 'rejected') {
    title += " List Of Rejected Farmers";
  } else if (status === 'reported') {
    title += " List Of Reported Farmers";
  } else if (status === 'issues') {
    title += " - Reported Issues";
  } else if (status === 'allowed') {
    title += " List Of Allowed Farmers";
  }
        
  const doc = new jsPDF({orientation: "landscape"})
  doc.addImage(logo, 'PNG', 10, 10, 10, 10);
  const dateText = `Date: ${new Date().toLocaleDateString()}`;

doc.setFontSize(12);
doc.text("Rwanda Agriculture board", 10, 30);
doc.text(dateText, 10, 35);
doc.text(`District: ${userDistrict}`, 10, 40);
doc.text(title, 100, 50);


const headers = [
  "Farmer Name",
  "Email",
  "Province",
  "District",
  "Sector",
  
  "Date",
  "time",
  "Status",
  
];

// Add a row for each data entry
const data = doneProjects.map(tdata => [
  tdata.personalInfo.fullName,
  tdata.personalInfo.emailAddress,
  tdata.addressDetails.province,
  tdata.addressDetails.district,
  tdata.addressDetails.sector,
  new Date(tdata.createdAt).toLocaleDateString(),
  new Date(tdata.createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }),
  tdata.actions === "pending" || tdata.actions === "approved" || tdata.actions === "underwayrab"
    ? "Pending"
    : tdata.actions === "rejected"
      ? "Rejected"
      : "Allowed"
]);

// Add the header and data to the PDF
doc.autoTable({

     
  margin: {top: 65},
  head: [headers],
  body: data,
  margin: { top: 65 }
});
  doc.save(`${userData.district} -FARMERS.pdf`);
};

const doneFarmers = farmers.filter(
  (tdata) =>
    tdata.addressDetails.district === userDistrict
);

  return (
    <Row>
      <Col>
      <div className="flex flex-row  pt-10 items-center">
        <span className={`${status=== 'all' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("all")}>New Famer</span>
        <span className={`${status=== 'shortlist' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("shortlist")}>Short List</span>
        <span className={`${status=== 'reported' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("reported")}>Reported to RAB</span>
        <span className={`${status=== 'allowed' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("allowed")}>Allowed</span>
        <span className={`${status=== 'rejected' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("rejected")}>Rejected</span>
        <span className={`${status=== 'issues' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("issues")}>Reported issues</span>
 
       
        
      </div>
      </Col>
      <Col lg="12">
      <Card>
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <CardTitle className="mb-2 text-muted" tag="h6">
          
          </CardTitle>
          <div>
          {status === 'shortlist' && (
          <button onClick={handleReportClick} className=" bg-blue-500 p-2 rounded-sm text-white hover">Report to Rab</button>
          )}

          </div>

          <Table className="no-wrap mt-3 align-middle" id="my-table" responsive borderless>
            <tr>

          <button onClick={downloadAllDataPDF} className=" p-2 rounded-md bg-blue-500 text-white">Export Data</button>
            </tr>

            {status === "issues" ? (
                <>
                {issues.map((issue)=>{
                return(
                  <div className="flex flex-row gap-4 items-center border-b border-black/30">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                      <h1 className=" bg-transparent">{issue.farmer.personalInfo.fullName[0].toUpperCase()}</h1>

                    </div>
                    <div className="flex flex-col border-r pr-2 border-black/20 h-full ">

                    <h1 className="font-medium bg-transparent">name: <span className="font-[300]">{issue.farmer.personalInfo.fullName}</span></h1>
                    <h1 className="font-medium bg-transparent">email: <span className="font-[300]">{issue.farmer.personalInfo.emailAddress}</span></h1>
                    </div>
                    <div className="flex flex-col  border-r pr-2 border-black/20">

                    <h1 className="font-medium">title: <span className="font-[300]"> {issue.title}</span></h1>
                    <h1 className="max-w-[450px] font-medium">description: <span className="font-[300]"> {issue.description}</span></h1>
                    </div>
                    <div className="bg-blue-500 rounded-md hover:bg-blue-600 transition-all">
                      <button onClick={()=> setIsModalOpen(true)} className=" p-3 bg-transparent rounded-md font-[100] text-white uppercase">Portfolio</button>
                    </div>
                    {isModalOpen && (  <PopupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} rowData={issue.farmer} />)}
                  </div>
                )
              })}
             
                </>
            ) : (

            <>

          
              <tr>
                <th>Farmer name</th>
                <th>Email</th>
                <th>Province</th>

                <th>district</th>
                <th>Sector</th>
                {status=== "all" && (

                <th colSpan={2}>operation</th>
                )}
             
               
              </tr>
        
           
              {status === 'all' && (
              

              
          
              doneFarmers.filter((item)=> item.actions === "pending").map((tdata, index) => (
                <>
              
                <tr key={index}className=" cursor-pointer border-top">
                      <td onClick={()=> handleRowClick(tdata)}>
                    <div className="flex align-items-center p-2">
                
                      <div className="ms-3 flex flex-row">
                      {/* <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                        <h1>{tdata.personalInfo.fullName.slice(0,1).toUpperCase()}</h1>
                      </div> */}
                        <h6 className="mb-0">{tdata.personalInfo.fullName}</h6>
                        
                       
                      </div>
                    </div>
                  </td>
                  <td>
                  <span className="text-muted">{tdata.personalInfo.emailAddress}</span>
                  </td>
                 
                  <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.province}</td>
                  <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.district}</td>
                  <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.sector}</td>
                  <td className="flex flex-row gap-3">
                    {tdata.actions == "approved" ? (
                      <button  className="p-2 bg-blue-500 text-white rounded-sm" style={{backgroundColor:'#4C9A2A'}}>Approved</button>
                      ) :
                     ( <button onClick={() => handleApproveClick(tdata.farmerId)} className="p-2 bg-green-500 text-white rounded-sm" style={{backgroundColor:'#4C9A2A'}}>Approve</button>)}
                   {tdata.actions == "approved" ? ("") : ( <button onClick={()=> setOpenComment(index)} className="py-2 px-3 bg-red-500 text-white rounded-sm" style={{backgroundColor:'#DE0A26'}}>Reject</button>)}
                   
                  </td>
                
                </tr>
                {openComment == index && (
                <tr>
              <td> 
          <div className="flex flex-row items-center gap-2">
        <label htmlFor={`commentInput${index}`} className="text-sm text-gray-600">
          Add Comment:
        </label>
        <textarea
          type="text"
          id={`commentInput${index}`}
          className="border rounded-sm p-1"
          placeholder="Add comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          
        />
        <button className="p-2 border-1 border-black/40 rounded-md hover:bg-black/10" onClick={()=> handleRejectClick(tdata.farmerId)}>Confirm</button>
        </div>
        </td>
                </tr>
                )}
                      </>
                
              ))
              )}

            {status == 'shortlist' && (
            
            doneFarmers.filter((item)=> item.actions === "approved" ).map((tdata, index) => (
              <>
                 
              <tr key={index}className=" cursor-pointer border-top">
                    <td onClick={()=> handleRowClick(tdata)}>
                  <div className="d-flex align-items-center p-2">
                 
                    {/* <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                        <h1>{tdata.personalInfo.fullName.slice(0,1).toUpperCase()}</h1>
                      </div> */}
                    <div className="ms-3">
                      <h6 className="mb-0">{tdata.personalInfo.fullName}</h6>
                      
                     
                    </div>
                  </div>
                </td>
                <td> <span className="text-muted">{tdata.personalInfo.emailAddress}</span></td>
               
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.province}</td>
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.district}</td>
                  <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.sector}</td>
                <td className="flex flex-row gap-3">
                  {tdata.actions == "approved" ? (
                    <button onClick={()=>handleRejectClick(tdata.farmerId)} className="p-2 bg-blue-500 text-white rounded-sm" style={{backgroundColor:'red'}}>Reject</button>
                  ) :
                   ( <button onClick={() => handleApproveClick(tdata.farmerId)} className="p-2 bg-green-500 text-white rounded-sm" style={{backgroundColor:'#4C9A2A'}}>Approve</button>)}
                 {tdata.actions == "approved" ? ("") : ( <button onClick={()=> handleRejectClick(tdata.farmerId)} className="py-2 px-3 bg-red-500 text-white rounded-sm" style={{backgroundColor:'#DE0A26'}}>Reject</button>)}
                 
                </td>
              
              </tr>
            </>
            ))
            )}

            {status === 'allowed' && (
            
            doneFarmers.filter((item)=> item.actions === "allowed").map((tdata, index) => (
              <>
            
              <tr key={index}className=" cursor-pointer border-top">
                    <td onClick={()=> handleRowClick(tdata)}>
                  <div className="d-flex align-items-center p-2">
                  {/* <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                        <h1>{tdata.personalInfo.fullName.slice(0,2).toUpperCase()}</h1>
                      </div> */}
                    <div className="ms-3">
                    
                      <h6 className="mb-0">{tdata.personalInfo.fullName}</h6>
                      
                     
                    </div>
                  </div>
                </td>
                <td> <span className="text-muted">{tdata.personalInfo.emailAddress}</span></td>
               
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.province}</td>
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.district}</td>
                  <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.sector}</td>
              
              
              </tr>
              </>
            ))
            )}
            {status === 'rejected' && (
            
            doneFarmers.filter((item)=> item.actions === "rejected").map((tdata, index) => (
              <>
            
              <tr key={index}className=" cursor-pointer border-top">
                    <td onClick={()=> handleRowClick(tdata)}>
                  <div className="d-flex align-items-center p-2">
                  {/* <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                        <h1>{tdata.personalInfo.fullName.slice(0,2).toUpperCase()}</h1>
                      </div> */}
                    <div className="ms-3">
                    
                      <h6 className="mb-0">{tdata.personalInfo.fullName}</h6>
                      
                     
                    </div>
                  </div>
                </td>
                <td>
                <span className="text-muted">{tdata.personalInfo.emailAddress}</span>
                </td>
               
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.province}</td>
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.district}</td>
                  <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.sector}</td>
              
              
              </tr>
              </>
            ))
            )}
            {status === 'reported' && (
            
            doneFarmers.filter((item)=> item.actions === "underwayrab").map((tdata, index) => (
              <tr key={index}className=" cursor-pointer border-top">
                    <td onClick={()=> handleRowClick(tdata)}>
                  <div className="d-flex align-items-center p-2">
                 
                    {/* <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                        <h1>{tdata.personalInfo.fullName.slice(0,1).toUpperCase()}</h1>
                      </div> */}
                    <div className="ms-3">
                      <h6 className="mb-0">{tdata.personalInfo.fullName}</h6>
                      
                   
                    </div>
                  </div>
                </td>
                <td>   <span className="text-muted">{tdata.personalInfo.emailAddress}</span></td>
               
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.province}</td>
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.district}</td>
                  <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.sector}</td>
             
               
              
              </tr>
            ))
            )}
          
            </>
            )}
          </Table>
        </CardBody>
      </Card>
      {isModalOpen && (  <PopupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} rowData={selectedRowData} />)}
    
      </Col>
  
   
 
 
    </Row>
  );
};

export default DistrictTable;
