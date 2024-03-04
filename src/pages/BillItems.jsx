import React, { useState } from "react";

function Bill() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        imageUrl: "",
        foodType: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5002/api/bills", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to submit data");
            }
            console.log("Data submitted successfully");
            // Optionally, you can clear the form after submission
            setFormData({
                name: "",
                price: "",
                imageUrl: "",
                foodType: ""
            });
            // After submitting data, you might want to update the list of bill items
            // For now, let's assume the backend responds with the created bill
            const data = await response.json();
            console.log("Created Bill:", data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <>
        <div className="container">
            <h1>Bill Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleInputChange}
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                />
                <input
                    type="text"
                    onChange={handleInputChange}
                    name="price"
                    value={formData.price}
                    placeholder="Price"
                />
                <input
                    type="text"
                    onChange={handleInputChange}
                    name="imageUrl"
                    value={formData.imageUrl}
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    onChange={handleInputChange}
                    name="foodType"
                    value={formData.foodType}
                    placeholder="Food Type"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        </>
        );
}

export default Bill;
