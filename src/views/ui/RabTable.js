import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import PopupModal from "./PopupModal";
import axios from 'axios'
import ProductionModal from "./ProductionModal";
import { ToastContainer, toast } from 'react-toastify'; 
import jsPDF from "jspdf";
import "jspdf-autotable"
import logo from '../../assets/images/logos/rab.png'



const RabTable = () => {
  const [farmers, setFarmers] = useState([]);
  const [openComment,setOpenComment] = useState(null)
  const [openApproveComment,setOpenApproveComment] = useState(null)
  const [comment, setComment] = useState('');
  const [issues,setIssues] = useState()
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handelViewClieck = (tdata)=>{
    setSelectedRowData(tdata)
    setIsModalProduct(true)

  }
  const handleApproveClick = async (tdata) => {
    try {
      // Send a request to your Node.js backend to update the status
      await axios.put(`http://localhost:4000/api/update-farmer/${tdata.farmerId}`, {
        status: 'allowed',
      });
     
      await axios.post(`http://localhost:4000/api/final`, {
        farmerId:tdata._id,
        follows:selectedItems
      });
      toast.success('approve successfully')
      // Fetch updated farmers data
      const response = await axios.get('http://localhost:4000/api/farmers');
      setFarmers(response.data.data);
    } catch (error) {
      toast.error(error.message)
      console.error('Error updating status:', error.message);
    }
  };
  const handleRejectClick = async (farmerId) => {
    try {
      // Send a request to your Node.js backend to update the status
      await axios.put(`http://localhost:4000/api/update-farmer/${farmerId}`, {
        status: 'rejected',
        comment: comment,
      });
  
      toast.success('reject successfully')
      const response = await axios.get('http://localhost:4000/api/farmers');
      setFarmers(response.data.data);
      window.location.reload()
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
   const handleAprrove = (index)=>{
     setOpenComment(null)
    setOpenApproveComment(index)
   }
   const handleReject = (index)=>{
     setOpenApproveComment(null)
     setOpenComment(index)
   }
  const [status,setStatus] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalProduct, setIsModalProduct] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
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





const handleCheckboxChange = (item) => {
  if (selectedItems.includes(item)) {
    setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
  } else {
    setSelectedItems([...selectedItems, item]);
  }
};
const doneProjects = farmers.filter((data)=>  data.actions === status)

const downloadAllDataPDF = () => {
  let title = "";
  if(status === "all"){
    title += "List of All Farmer"

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


doc.text("Rwanda Agriculture board", 10, 30);
doc.text(dateText, 10, 40);
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

  doc.save('RAB-FARMERS.pdf');
};

  return (
    <Row className="w-full">
      <Col>
      <div className="flex flex-row gap-6 pt-4 items-center py-3">
        <span className={`${status=== 'all' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("all")}>New Famer</span>
        <span className={`${status=== 'allowed' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("allowed")}>allowed</span>
        <span className={`${status=== 'rejected' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("rejected")}>Rejected</span>
        <span className={`${status=== 'issues' ? "text-white  bg-black  " :'text-black'} flex justify-center items-center rounded-md cursor-pointer hover:opacity-60 h-10 px-8`} onClick={()=> setStatus("issues")}>Reported Issues</span>

 
       
        
      </div>
      </Col>
      <Col lg="12" className="w-full">
      <Card>
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <CardTitle className="mb-2 text-muted" tag="h6">
           
          </CardTitle>

          <Table className=" mt-3 align-middle" id="my-table" responsive borderless>
           
              <td>  <button onClick={downloadAllDataPDF} className=" p-2 rounded-md bg-blue-500 text-white">Export Data</button></td>
            

          {status === "issues" ? (
                <>
                {issues.map((issue,index)=>{
                return(
                  <div key={index} className="flex flex-row gap-4 items-center border-b border-black/30">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                      <h1 className=" bg-transparent">{issue.farmer.personalInfo.fullName[0].toUpperCase()}</h1>

                    </div>
                    <div className="w-[200px] flex flex-col border-r pr-2 border-black/20 h-full ">

                    <h1 className="font-medium bg-transparent">name: <span className="font-[300]">{issue.farmer.personalInfo.fullName}</span></h1>
                    <h1 className="font-medium bg-transparent">email: <span className="font-[300]">{issue.farmer.personalInfo.emailAddress}</span></h1>
                    </div>
                    <div className="flex flex-col  border-r pr-2 border-black/20 w-[350px]">

                    <h1 className="font-medium">title: <span className="font-[300]"> {issue.title}</span></h1>
                    <h1 className="font-medium">description: <span className="font-[300]"> {issue.description}</span></h1>
                    </div>
                    <div className="bg-blue-500 rounded-md hover:bg-blue-600 transition-all">
                      <button onClick={()=> setIsModalOpen(true)} className=" p-2 bg-transparent rounded-md font-[100] text-white">View    data</button>
                    </div>
                    <div className="bg-green-500 rounded-md hover:bg-green-600 transition-all">
                      <button onClick={()=> handleApproveClick(issue.farmer)} className=" py-2 px-4 bg-transparent rounded-md font-[100] text-white">
                       {issue.farmer.actions === "rejected" ? "Allow" : "Done"} 
                      </button>
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
                
               
              </tr>
           
         
              {status === 'all' && (

                
            
  farmers.filter((item)=> item.actions === "underwayrab").map((tdata, index) => (
    <>
    <tr key={index} className=" cursor-pointer border-top">
          <td onClick={()=> handleRowClick(tdata)}>
        <div className="d-flex align-items-center p-2">
        <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                <h1>{tdata.personalInfo.fullName.slice(0,1).toUpperCase()}</h1>
          </div>
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
          <button  className="p-2 bg-blue-500 text-white rounded-sm" >Approved</button>
          ) :
        ( <button onClick={()=> handleAprrove(index)} className="p-2  text-white rounded-sm" style={{backgroundColor:'darkgreen', color:'white',borderRadius:'4px'}}>Approve</button>)}
      {tdata.actions == "approved" ? ("") : ( <button onClick={()=> handleReject(index)} style={{backgroundColor:'darkred', color:'white',borderRadius:'4px'}}>Reject</button>)}
      
      </td>
    
    </tr>
    {openComment == index && (
    <tr>
  <td> 
  <div className="flex flex-col  gap-2">
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
  <button onClick={()=> handleRejectClick(tdata.farmerId)} className="p-2 border-1 border-black/40 rounded-md hover:bg-black/10">Confirm</button>
  </div>
  </td>
    </tr>
    )}
      

  
    {openApproveComment == index && (
    <tr>
  <td> 
  <div className="flex flex-col  gap-2">
  <label htmlFor={`commentInput${index}`} className="text-sm text-gray-600">
  choose why you Aprrove
  </label>
  <div className="flex flex-row gap-2 items-center">
    <input type="checkbox" onChange={() => handleCheckboxChange('good location')}/>
    <span>good location</span>
  </div>
  <div className="flex flex-row gap-2 items-center">
    <input type="checkbox"   onChange={() => handleCheckboxChange('good crops')}/>
    <span>good crops</span>
  </div>
  <div className="flex flex-row gap-2 items-center">
    <input type="checkbox"   onChange={() => handleCheckboxChange('good forest')}/>
    <span>good forest</span>
  </div>

  <button onClick={()=> handleApproveClick(tdata)} className="p-2 border-1 border-black/40 rounded-md hover:bg-black/10">Confirm</button>
  </div>
  </td>
    </tr>
    )}
          </>
    
  ))
  
  )}

{status == 'allowed' && (
            
            farmers.filter((item)=> item.actions == "allowed" ).map((tdata, index) => (
              <>
               
              <tr key={index}className=" cursor-pointer border-top">
                    <td onClick={()=> handleRowClick(tdata)}>
                  <div className="d-flex align-items-center p-2">
                  <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                        <h1>{tdata.personalInfo.fullName.slice(0,1).toUpperCase()}</h1>
                      </div>
              
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
                  {tdata.actions == "allowed" ? (
                    <button onClick={()=> handelViewClieck(tdata)}  className="p-2 bg-blue-500 text-whites rounded-sm" style={{backgroundColor:'#0496C7', color:'white',borderRadius:'4px'}}>View production</button>
                  ) :
                   ( <button onClick={() => handleApproveClick(tdata.farmerId)} className="p-2 bg-green-500 text-white rounded-sm" >Approve</button>)}
                
                 
                </td>
              
              </tr>
            </>
            ))
            )}
{status == 'rejected' && (
            
            farmers.filter((item)=> item.actions == "rejected" ).map((tdata, index) => (
              <>
               
              <tr key={index}className=" cursor-pointer border-top">
                    <td onClick={()=> handleRowClick(tdata)}>
                  <div className="d-flex align-items-center p-2">
                  <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                        <h1>{tdata.personalInfo.fullName.slice(0,1).toUpperCase()}</h1>
                      </div>
              
                    <div className="ms-3">
                      <h6 className="mb-0">{tdata.personalInfo.fullName}</h6>
                      
                    
                    </div>
                  </div>
                </td>
                <td>  <span className="text-muted">{tdata.personalInfo.emailAddress}</span></td>
               
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.province}</td>
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.district}</td>
                <td onClick={()=> handleRowClick(tdata)}> {tdata.addressDetails.sector}</td>
                <td className="flex flex-row gap-3">
                  {tdata.actions == "allowed" ? (
                    <button onClick={()=> handelViewClieck(tdata)}  className="p-2 bg-blue-500 text-white rounded-sm" >View production</button>
                  ) :
                   ( <button onClick={() => handleApproveClick(tdata.farmerId)} className="p-2 bg-green-500 rounded-sm" style={{backgroundColor:'darkgreen', color:'white',borderRadius:'4px'}} >Approve</button>)}
                
                 
                </td>
              
              </tr>
            </>
            ))
            )}
            

           
            </>)}

          </Table>
        </CardBody>
      </Card>
      {isModalOpen && (  <PopupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} rowData={selectedRowData} />)}
      {isModalProduct && (  <ProductionModal isOpen={isModalProduct} onClose={() => setIsModalProduct(false)} rowData={selectedRowData} />)}
    
      </Col>
  
   
 
 
    </Row>
  );
};

export default RabTable;
