
import Header from './components/layoutComponents/Header';
import Sidebar from './components/layoutComponents/Sidebar';
import Footer from './components/layoutComponents/Footer';
import Homepage from "./components/layoutComponents/Homepage";
import LoginPage from './pages/LoginPage';
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
      <div className='body-container'>
            <Header />
            <Sidebar>
            <ul>
            <Link to="/login"><li>login</li></Link> 
            </ul>
            </Sidebar>
            <Homepage/>
            <Footer />
      </div>
  );
}

export default App;
