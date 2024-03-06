import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./Admin.Header";
import AdminSidebar from "./Admin.Sidebar";
import { useEffect, useState } from "react";

function AdminLayout() {
  const navigate = useNavigate();
  const [dailySalesCount, setDailySalesCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate("/login/admin");
    }
    if (role !== "admin") {
      navigate("/login/admin");
    }

    // Fetch daily sales count here (replace with your actual API call)
    const fetchDailySalesCount = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/bills/count", {
          // ... necessary headers and options
        });
        const data = await response.json();
        setDailySalesCount(data.count);
      } catch (error) {
        console.error("Error fetching daily sales count:", error);
      }
    };

    fetchDailySalesCount();
  }, []);

  return (
    <div className="container-fluid d-flex flex-column h-100">
      <div className="row flex-grow-1 d-flex align-items-center">
        <div className="col-lg-12">
          <AdminHeader />
        </div>
      </div>

      <div className="row flex-grow-1 d-flex">
        <div className="col-lg-1 border-end d-flex flex-column h-100">
          <AdminSidebar />
        </div>
        <div className="col-lg-11">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
