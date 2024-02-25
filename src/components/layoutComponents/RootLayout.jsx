import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
function RootLayout (){
    return(
        <div>
            <Header/>
            <Sidebar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default RootLayout;