import {useState,useEffect} from 'react';

function Homepage() {
    const [foodItems,setFoodItems] = useState([]);
    const token = localStorage.getItem('token');

    console.log(foodItems)
    console.log(token)
    const getItems = async () => {
        try {
            const response = await fetch('http://localhost:5002/api/foodItems',{
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
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(()=>{getItems()},[])
    
    return(
    <div className='home-items'>
         {foodItems.map(item => (
            <>
            <img src='home/elliot/Documents/project/restaurantpossystem/src/images/21ucs515_a.jpg' alt='ajayyy'></img>
                <ol key={item.id}>
                
                <li>{item.name}</li>
                <li>{item.foodtype}</li>
                <li>{item.price}</li>
                <button>Add</button>
                </ol>
            </>
         ))
        }
    </div>

)
};

export default Homepage;