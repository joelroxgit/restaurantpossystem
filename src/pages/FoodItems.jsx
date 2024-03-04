import React, { useState, useEffect } from 'react';

function FoodItems() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        imageUrl: '',
        foodType: ''
    });
    const [foodItems, setFoodItems] = useState([]); // State to store fetched food items
    const token = localStorage.getItem('token');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const clickHandle = async () => {
        try {
            const response = await fetch('http://localhost:5002/api/foodItems/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
            console.log('Data submitted successfully');
            // Optionally, you can clear the form after submission
            setFormData({
                name: '',
                price: '',
                imageUrl: '',
                foodType: ''
            });
            // After submitting data, fetch items again to update the list
            getItems();
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const getItems = async () => {
        try {
            console.log(token)
            const response = await fetch('http://localhost:5002/api/foodItems/', {
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
            setFoodItems(data); // Update foodItems state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div className="container-home">
            <form>
                <input type='text' onChange={handleInputChange} name="name" value={formData.name} placeholder="Name" />
                <input type='text' onChange={handleInputChange} name="price" value={formData.price} placeholder="Price" />
                <input type='text' onChange={handleInputChange} name="imageUrl" value={formData.imageUrl} placeholder="Image URL" />
                <input type='text' onChange={handleInputChange} name="foodType" value={formData.foodType} placeholder="Food Type" />
            </form>
            <button onClick={clickHandle}>Submit</button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>FoodType</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fnohat.cc%2Ff%2Finstagram-logos-in-vector-format-free-download-instagram-logo-small-size%2Fm2i8m2d3i8i8A0m2-201907231300.html&psig=AOvVaw2sXytuUaBmbxN1CDk0Rkuu&ust=1709615281266000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCODemq7r2YQDFQAAAAAdAAAAABAE' className='h-25 d-inline-block mw-100' /></td>
                            <td>{item.foodType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FoodItems;
