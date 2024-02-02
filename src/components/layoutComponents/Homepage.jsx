import {useState,useEffect} from 'react'

function Homepage(){

    const foods = [
         "biriyani",
       200]
    

const [items , setItems] = useState([]);
useEffect( setItems(foods,[items]))

    return(
        <div className="container-home">
            {   items.map((f,index)=><li key={index}>{f}</li>)}
        </div>
)}

export default Homepage;