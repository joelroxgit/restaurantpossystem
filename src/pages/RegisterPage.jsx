import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5002/api/users/register",
        {
          name: formData.name,
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          email: formData.email,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={formHandler}>
      Name:{" "}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <br />

      Username:{" "}
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <br />

      Password:{" "}
      <input
        type="text"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <br />

      Phone:{" "}
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
      />
      <br />

      Email:{" "}
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterPage;
