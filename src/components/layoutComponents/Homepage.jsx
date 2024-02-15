import {useState,useEffect} from 'react';

function Homepage() {
    const [foodItems,setFoodItems] = useState([]);
    const token = localStorage.getItem('token');
    const getItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/foodItems', {
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
            <ol key={item.id}>
               <li>{item.name}</li>
               <li>{item.price}</li>
               <li><img src={item.imageUrl} alt={item.name} /></li>
               <li>{item.category}</li>
               <li>{item.foodType}</li>
               <button>Add</button>
           </ol>
        </div>
    //        <div className='restro-cards'>  
    //        <img className='res-card-logo'
    //        src={CLOUDINARY+cloudinaryImageId}/>
    //        <h3>{name}</h3>
    //        <h4>{locality}</h4>
    //        <h4>{avgRating}</h4>
    //        <h4>{cuisines}</h4>
    //    </div>
           ))}
    </div>

)
};

export default Homepage;