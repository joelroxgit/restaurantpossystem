import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider
} from "react-router-dom";
import "./App.css";
import RootLayout from "./components/layoutComponents/RootLayout";
import Homepage from "./components/layoutComponents/Homepage";
import Bill from "./pages/BillItems";
import LoginPage from "./pages/LoginPage";
import FoodItems from "./pages/FoodItems";
import RegisterPage from "./pages/RegisterPage";
import AdminLayout from "./components/layoutComponents/adminComponents/AdminLayout";
import AdminDashboard from "./components/layoutComponents/adminComponents/Admin.Dashboard";

// Authentication and Authorization (modify according to your implementation)
const isAuthenticated = () => {
  // Replace with your authentication logic (e.g., checking user token)
  return true; // Replace with actual check
};

const isAdmin = () => {
 if(role == admin)
  return true; 
};

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
      <Route index element={<AdminDashboard />} />
      <Route path="createUser" element={<RegisterPage />} />
    </Route>
    </>
  )
);

function UnauthorizedAccess() {
  return (
    <div>
      <h1>Unauthorized Access</h1>
      <p>You are not authorized to access this page.</p>
    </div>
  );
}

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
