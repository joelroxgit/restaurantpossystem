import React, { useState, useEffect } from 'react';

function Homepage() {
    const [foodItems, setFoodItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]); // State to store the selected items
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
            console.log(data)
            setFoodItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const itemAdd = (itemId) => {
        // Find the selected item based on the itemId
        const selectedItem = foodItems.find(item => item.id === itemId);
        setSelectedItems(prevItems => [...prevItems, selectedItem]); // Append the selected item to the selectedItems array
    }

    useEffect(() => { getItems() }, [])

    return (
        <>
        <input type='text' name='search' className='m-0 p-0'/>
        <button>search</button>
        <div className='row'>
        <div className='col-lg-4 d-flex'>
        {foodItems.map(item => (
          <div key={item.id}>
            <div>
              <img src='https://content.jdmagicbox.com/comp/panruti/f4/9999p4156.4156.180808155543.b6f4/catalogue/thirumana-briyani-panruti-biryani-caterers-z3rgelna1x.jpg?clr=' alt='Food' width='150' height='150' />
              <div>
                <h5>{item.name}</h5>
                <p>Type: {item.foodType}</p>
                <p>Price: {item.price}</p>
                <button onClick={() => itemAdd(item.id)}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='col-lg-5'>
        <h1>JOELPOS</h1>
        <div>
          {/* Display selected items' names and prices */}
          {selectedItems.map((selectedItem, index) => (
            <div key={index}>
              <p>{index + 1}</p>
              <p>Name: {selectedItem.name}</p>
              <p>Price: {selectedItem.price}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
            </>
    );
}

export default Homepage;
