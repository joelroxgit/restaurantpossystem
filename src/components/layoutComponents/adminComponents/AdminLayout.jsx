import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./Admin.Header";
import AdminFooter from "./Admin.Footer";
import AdminSidebar from "./Admin.Sidebar";

function AdminLayout(){
  return(
    <div className="container-fluid d-flex flex-column h-100">
      <div className="row flex-grow-1 d-flex align-items-center">
        <div className="col-lg-12">
          <AdminHeader />
        </div>
      </div>

      <div className="row flex-grow-1 d-flex"> {/* Added d-flex */}
        <div className="col-lg-1 border-end d-flex flex-column h-100"> {/* Added d-flex */}
          <AdminSidebar />
        </div>
        <div className="col-lg-11">
          <Outlet />
        </div>
      </div>

      <div className="row justify-content-end fixed-bottom">
        <div className="col-lg-12">
          <AdminFooter />
        </div>
      </div>
    </div>
  );
  }

export default AdminLayout;
