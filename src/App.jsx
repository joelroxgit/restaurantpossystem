  import React from "react";
  import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
    useNavigate
  } from "react-router-dom";
  import "./App.css";
  import RootLayout from "./components/layoutComponents/RootLayout";
  import Homepage from "./components/layoutComponents/Homepage";
  import Bill from "./pages/BillItems";
  import LoginPage from "./pages/LoginPage";
  import FoodItems from "./pages/FoodItems";
  import RegisterPage from "./components/layoutComponents/adminComponents/RegisterPage";
  import AdminLayout from "./components/layoutComponents/adminComponents/AdminLayout";
  import AdminDashboard from "./components/layoutComponents/adminComponents/Admin.Dashboard";
  import AdminFooditems from "./components/layoutComponents/adminComponents/Admin.Fooditems";
  import Adminbills from "./components/layoutComponents/adminComponents/Admin.bills";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/foods" element={<FoodItems />} />
          <Route path="/bills" element={<Bill />} />  
        </Route>

        // Login Routes
      <Route path="/login/user" element={<LoginPage role={'user'}/>} />
      <Route path="/login/admin" element={<LoginPage role={'admin'}/>} />

        <Route path="/admin" element={<AdminLayout />}> 
        <Route  index  element={<AdminDashboard />} />
        <Route path="/admin/foods" element={<AdminFooditems />} />
        <Route path="/admin/bills/" element={<Adminbills />} />
        <Route path="/admin/createUser" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<UnauthorizedAccess/>}/>
      </>
    )
  );

  function UnauthorizedAccess() {
    return (
      <div>
        <h1>Url Not Found</h1>
        <p>Kindly check the Url ..</p>
      </div>
    );
  }

  function App() {
    return (
      <RouterProvider router={router} />
    );
  }

  export default App;
