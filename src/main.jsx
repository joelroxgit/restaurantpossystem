import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import FoodItems from './pages/FoodItems.jsx'
import Bill from './pages/BillItems.jsx'
import Customer from './pages/Customer.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/foods' element={<FoodItems />} />
          <Route path='/bills' element={<Bill />} />
          <Route path='/customers' element={<Customer />} />
      <Route path="/" element={<App />} />
    </Routes>

     </BrowserRouter>

)
