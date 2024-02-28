import { Outlet ,useNavigate} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import "../../App.css"
function RootLayout (){
  
    return(
        <div className="container-fluid">
    <div className="row"> 
        <div class="col-lg-12">
            <Header/>
        </div> 
    </div>
    <div className="side-out">
    <div className="row"> 
        <div class="col-lg-1">
            <Sidebar/>
    </div>
    </div>
    <div className="row"> 
        <div class="col-lg-12">
            <Outlet/>
    </div>
    </div>
            </div>

            <div className="row"> 
            <div class="col-lg-12">
            <Footer/>
            </div></div>
        </div>
    )
}
export default RootLayout;