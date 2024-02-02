import React from "react";
import {Outlet, Link } from "react-router-dom";
function Sidebar() {

    return (
  <div className="sidebar-component">
       <ul className="sidebar-Menu">
           <li style={{margin:"0px"}}> <Link to="/"> Home</Link></li> 
           <li><Link to="/foodItems">  Food Items</Link></li> 
           <li><Link to="/billItems">  Bills</Link></li> 
           <li><Link to="/customer">  Customers</Link></li> 
           <li>  <button>Logout</button></li> 
       </ul>
  </div>    
   )
    }
export default Sidebar;