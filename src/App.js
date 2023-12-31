import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import "./index.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const routing = useRoutes(Themeroutes);

  return(

    <>
    
  <div className="bg-gray-[#F9F9F9]">{routing}</div>;
     <ToastContainer />
  </>
    )
};

export default App;
