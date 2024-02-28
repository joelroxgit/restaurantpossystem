import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({

    userName: "",
    password: ""
  })
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Name: ${name}, Value: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
};
console.log(formData)
  

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5002/api/users/login",
        {
          
          userName: formData.userName,
          password: formData.password,
        
        }
      );
      console.log(response)
      console.log(localStorage.setItem('token',JSON.stringify(response.data.token)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={formHandler}>
      Username:{" "}
      <input
        type="text"
        name="userName"
        value={formData.userName}
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginPage;
