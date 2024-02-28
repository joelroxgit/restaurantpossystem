import {useState,useEffect} from 'react';

function Homepage() {
    const [foodItems,setFoodItems] = useState([]);
    const token = localStorage.getItem('token');
    const getItems = async () => {
        try {
            const response = await fetch('http://localhost:5002/api/foodItems', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setFoodItems(data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(()=>{getItems()},[])
    return(
    <div className='home-items'>
         {foodItems.map(item => (
        <div >
        <div class="card" style="width: 18rem;">
             <img src="https://st3.depositphotos.com/3051589/16452/i/1600/depositphotos_164525632-stock-photo-online-learning-connectivity-technology-coaching.jpg" class="card-img-top" alt="..."/>
             <div class="card-body">
               <h5 class="card-title"> <li>{item.name} + {item.category}</li></h5>
               <p class="card-text">{item.price}</p>
               <a href="#" class="btn btn-primary">Go somewhere</a>
             </div>
           </div>
        </div>
         
           ))}
    </div>

)
};

export default Homepage;