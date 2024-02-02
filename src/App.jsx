import { useState } from 'react'
import './App.css'
import { BrowserRouter , Route, Routes} from "react-router-dom";
import Header from './components/layoutComponents/Header'
import Homepage from './components/layoutComponents/Homepage'
import Sidebar from './components/layoutComponents/Sidebar'
import Footer from './components/layoutComponents/Footer'
import Bill from './pages/billItems';
import Food from './pages/foodItems';
import Customer from './pages/Customer';
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='body-container'>
       <BrowserRouter>
     <Header/>
     <Sidebar/>
    
          <Routes>
              <Route path='/' xelement={Home}/>
              <Route path='/food-items' Component={Food}/>
              <Route path='/bills' Component={Bill}/>
              <Route path='/customers' Component={Customer}/>
          </Routes>
    
     <Homepage/>
     <Footer/>
     </BrowserRouter>
     
    </div>
  )
}

export default App
