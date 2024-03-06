import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminFooditems() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        imageUrl: '',
        foodType: ''
    });
    const [foodItems, setFoodItems] = useState([]); 
    const [updatedFoodItemData, setUpdatedFoodItemData] = useState({
        name: '',
        price: '',
        imageUrl: '',
        foodType: ''
    });
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
            setFormData({
                name: '',
                price: '',
                imageUrl: '',
                foodType: ''
            });
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
            setFoodItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const token1 = localStorage.getItem("token");
        if (!token1) {
            navigate("/login/user")
        }
        getItems();
    }, []);

    const handleFoodItemInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFoodItemData({
            ...updatedFoodItemData,
            [name]: value
        });
    };

   
    const handleDelete= async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5002/api/foodItems/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`    
                }
            });
            if (!response.ok) {
                throw new Error("Failed to delete bill");
            }
            
            window.location.reload();
        } catch (error) {
            console.error("Error deleting bill:", error);
        }
    };


    return (
        <div className="container mt-5">
            <form className="mb-3">
                <div className="form-row d-flex">
                    <div className="col-md-3">
                        <input type='text' onChange={handleInputChange} name="name" value={formData.name} className="form-control" placeholder="Name" />
                    </div>
                    <div className="col-md-2">
                        <input type='text' onChange={handleInputChange} name="price" value={formData.price} className="form-control" placeholder="Price" />
                    </div>
                    <div className="col-md-3">
                        <input type='text' onChange={handleInputChange} name="imageUrl" value={formData.imageUrl} className="form-control" placeholder="Image URL" />
                    </div>
                    <div className="col-md-2">
                        <input type='text' onChange={handleInputChange} name="foodType" value={formData.foodType} className="form-control" placeholder="Food Type" />
                    </div>
                    <div className="col-md-2">
                        <button type="button" onClick={clickHandle} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Food Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><img src={item.imageUrl} alt={item.name} className='h-25 d-inline-block mw-100' /></td>
                            <td>{item.foodType}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

           
        </div>
    );
}

export default AdminFooditems;
