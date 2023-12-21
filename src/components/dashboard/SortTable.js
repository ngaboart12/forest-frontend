import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import axios from 'axios'
import PopupModal from "../../views/ui/PopupModal";
import jsPDF from "jspdf";
import "jspdf-autotable"
import logo from '../../assets/images/logos/rab.png'




const SortTable = (props) => {
  const [issues,setIssues] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/issues'); 
        setIssues(response.data)
      
      } catch (error) {
        console.error('Error fetching issues: error');
      }
    };

    fetchIssues();
  }, []);

    const status = props.status
    const farmers = props.farmers
    const downloadAllDataPDF = () => {
      let title = "";
      if (status === 'all') {
 
        title += " List Of All Farmers";
      }else if(status === 'allowed'){
        title += " List Of Allowed Farmers";

      }else if(status === 'rejected'){
        title += " List Of Rejected Farmers";

      }
        
      const doc = new jsPDF({orientation: "landscape"})
      doc.addImage(logo, 'PNG', 10, 10, 10, 10);
      const dateText = `Date: ${new Date().toLocaleDateString()}`;
 
    
  doc.text("Rwanda Agriculture board", 10, 30);
  doc.text(dateText, 10, 40);
  doc.text(title, 100, 50);


     
    
      doc.autoTable({
        html: "#my-table",
        margin: {top: 60}
      })
      doc.save('AllFarmersData.pdf');
    };


    
    const doneProjects = status === 'all' ? farmers : farmers.filter((tdata) => tdata.actions === status);
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
          
          </CardSubtitle>
      

         
            {status === 'issues' ? (
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
                    <h1 className="w-[350px] font-medium">description: <span className="font-[300]"> {issue.description}</span></h1>
                    </div>
                    <div className="p-2">

                    <div className="bg-blue-500 rounded-md hover:bg-blue-600 transition-all">
                      <button onClick={()=> setIsModalOpen(true)} className=" p-3 bg-transparent rounded-md font-[100] text-white">View Him data</button>
                    </div>
                    </div>
                    {isModalOpen && (  <PopupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} rowData={issue.farmer} />)}
                  </div>
                )
              })}
             
              </>

            ) : (
             <>
              <button className="py-2 px-8 hover:scale-110 transition-all bg-blue-500 rounded-md text-white" onClick={downloadAllDataPDF}>export</button>
              <Table className=" mt-3 align-middle" responsive borderless id="my-table">
            <thead>
              <tr>
                <th>Farmer Name</th>
                <th>Email</th>
                <th>province</th>

                <th>destrict</th>
                <th>sector</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {doneProjects.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      {/* <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                        <h1>{tdata.personalInfo.fullName.slice(0,1).toUpperCase()}</h1>
                      </div> */}
                
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.personalInfo.fullName}</h6>
                        
                      
                      </div>
                    </div>
                  </td>
                  <td>
                  <span className="text-muted">{tdata.personalInfo.emailAddress}</span>
                  </td>
                 
                  <td> {tdata.addressDetails.province}</td>
                  <td>{tdata.addressDetails.district}</td>
                  <td>{tdata.addressDetails.sector}</td>
                  <td>
                    {tdata.actions === "pending" || tdata.actions === "approved" || tdata.actions === "underwayrab"  ?  (
                      <div className="text-orange-500 w-[110px] border-1 px-4 py-2 rounded-md border-orange-500">pending</div>
                      ) : tdata.actions === "rejected" ? (
                        <div className="text-red-500 w-[110px] border-1 px-4 py-2 rounded-md border-red-400">Rejected</div>
                        ) : (
                          <div className="text-green-700 w-[110px] border-1 px-4 py-2 rounded-md border-green-400">Allowed</div>
                          )}
                  </td>
                 
                </tr>
              ))}
              
            </tbody>
            </Table>
              </>
           
              )}
       
        </CardBody>
      </Card>
   
    </div>
  );
};

export default SortTable;
