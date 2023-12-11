import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
     
        {/********Content Area**********/}

        <div className="contentArea">
       
          {/********Middle Content**********/}
          <Container className="flex flex-row overflow-hidden wrapper " fluid>
          
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
