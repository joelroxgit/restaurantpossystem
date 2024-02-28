import React from "react";
import {Outlet, Link } from "react-router-dom";

function Sidebar() {
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/");
    }

//     <div className="sidebar">
//     <li>  <Link to="/"> Home</Link> </li>
//     <li>  <Link to="/">News </Link></li>
//     <li>  <Link to="/">Contact</Link></li>
//     <li>  <Link to="/">About</Link></li>
//   </div>

    return (
  <div className="sidebar-component">
       <ul className="sidebar">
           <li> <Link to="/"> Home</Link></li> 
           <li><Link to="/foods">  Food Items</Link></li> 
           <li><Link to="/bills">  Bills</Link></li> 
           <li><Link to="/login" onClick={handleLogout}>  Logout</Link></li> 
       </ul>
  </div>    
   )
    }
export default Sidebar;