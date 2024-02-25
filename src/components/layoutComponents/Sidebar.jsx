import React from "react";
import {Outlet, Link } from "react-router-dom";

function Sidebar() {

    return (
  <div className="sidebar-component">
       <ul className="sidebar-Menu">
           <li style={{margin:"0px"}}> <Link to="/"> Home</Link></li> 
           <li><Link to="/foods">  Food Items</Link></li> 
           <li><Link to="/bills">  Bills</Link></li> 
           <li><Link to="/login">  Logout</Link></li> 
       </ul>
  </div>    
   )
    }
export default Sidebar;