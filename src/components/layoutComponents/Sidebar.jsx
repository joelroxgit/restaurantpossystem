import React from "react";
import { Outlet, Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-component d-flex flex-column h-100h">
      <ul className="list-group-sidebar">
        <li className="list-group-item">
          <Link to="/">Home</Link>
        </li>
        <li className="list-group-item">
          <Link to="/foods">Food Items</Link>
        </li>
        <li className="list-group-item">
          <Link to="/bills">Bills</Link>
        </li>
        <li className="list-group-item">
          <Link to="/login" onClick={() => localStorage.removeItem("token")}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
