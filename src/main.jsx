import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/layoutComponents/RootLayout";
import Homepage from "./components/layoutComponents/Homepage";
import Bill from "./pages/BillItems";
import Customer from "./pages/Customer";
import LoginPage from "./pages/LoginPage";

const App = () => (
  <Router>
    <Route path="/" element={<RootLayout />}>
      <Route path="/home" element={<Homepage />} />
      <Route path="/bills" element={<Bill />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/logout" element={<LoginPage />} />
    </Route>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
