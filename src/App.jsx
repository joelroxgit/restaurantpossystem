import React from "react";
import { createBrowserRouter,createRoutesFromElements, Route ,RouterProvider} from "react-router-dom";
import "./App.css";
import RootLayout from "./components/layoutComponents/RootLayout";
import Homepage from "./components/layoutComponents/Homepage";
import Bill from "./pages/BillItems";
import LoginPage from "./pages/LoginPage";
import FoodItems from "./pages/FoodItems";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter(
  createRoutesFromElements( 
    <>
        <Route  path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/foods" element={<FoodItems/>}/>
          <Route path="/bills" element={<Bill />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />}/>
    </>
    )
  )

  function App(){
    return(
      <RouterProvider router ={router}/>
    )
  }

  export default App;

