import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="sidebar-component d-flex flex-column h-100h">
      <ul className="list-group-sidebar">
        <li className="list-group-item">
          <Link to="/bills">Dashboard</Link>
        </li>
        <li className="list-group-item">
          <Link to="/foods">Foods</Link>
        </li>
        <li className="list-group-item">
          <Link to="/createUser">Register User</Link>
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

export default AdminSidebar;
