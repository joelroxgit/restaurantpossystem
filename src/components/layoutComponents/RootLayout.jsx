import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function RootLayout() {
  const navigate = useNavigate();

  return (
    <div>
  <Header />
  <div >
    <div className="row">
      <div className="col-lg-1">
        <Sidebar />
      </div>
      <div className="col-lg-11">
        <Outlet />
      </div>
    </div>
  </div>
</div>
    // <div className="container-fluid d-flex flex-column h-100">
    //   <div className="row flex-grow-1 d-flex align-items-center">
    //     <div className="col-lg-12">
    //       <Header />
    //     </div>
    //   </div>

    //   <div className="row flex-grow-1 d-flex"> {/* Added d-flex */}
    //     <div className="col-lg-1 border-end d-flex flex-column h-100"> {/* Added d-flex */}
    //       <Sidebar />
    //     </div>
    //     <div className="col-lg-11">
    //       <Outlet />
    //     </div>
    //   </div>

    //   <div className="row justify-content-end fixed-bottom">
    //     <div className="col-lg-12">
    //       <Footer />
    //     </div>
    //   </div>
    // </div>
  );
}

export default RootLayout;
