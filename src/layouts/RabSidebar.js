import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/rabportal",
    icon: "bi bi-speedometer2",
  },
{
  title: "Rules to Approve",
  href: "/rulesrab",
  icon: "bi bi-list",
},

];

const RabSidebar = () => {
  const user = {username:'Gahizi Ronaard',email:'Gahizi@gmail.com',type:'mayor'}
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3 ">
      <div className="d-flex align-items-center">
        <h1 className="text-center">AGROFORESTRY <br/> MANAGEMENT SYSTEM</h1>
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        
        </Nav>
      </div>
    </div>
  );
};

export default RabSidebar;
