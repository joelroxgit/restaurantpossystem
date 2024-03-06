import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [dailySales, setDailySales] = useState(0);
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State variable to hold the total amount
  const currentDate = new Date();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const [usersResponse, billsResponse] = await Promise.all([
          fetch("http://localhost:5002/api/users/admin/getUsers", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch("http://localhost:5002/api/bills", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        if (!usersResponse.ok || !billsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData = await usersResponse.json();
        const billsData = await billsResponse.json();

        // Calculate total amount
        let totalAmount = billsData.bills.reduce((total, bill) => {
          return total + bill.total;
        }, 0);

        // Calculate daily sales
        const dailySalesCount = billsData.bills.reduce((total, bill) => {
          const billDate = new Date(bill.billDate);
          if (
            billDate.getDate() === currentDate.getDate() &&
            billDate.getMonth() === currentDate.getMonth()
          ) {
            return total + 1;
          } else {
            return total;
          }
        }, 0);

        setUsers(usersData);
        setDailySales(dailySalesCount);
        setTotalAmount(totalAmount); // Set the total amount state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="container-fluid d-flex flex-column h-100 pt-3 pb-3">
      {/* Header */}
      <div className="row flex-grow-0 align-items-center">
        <div className="col d-flex justify-content-between m-3">
          <h2 className="display-3 m-2">Admin Dashboard</h2>
          <h2>
            Date: {currentDate.toLocaleDateString()}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="row flex-grow-1">
        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
          <h3 className="display-4 mb-4">Today Sales: {dailySales}</h3>
          <h3 className="display-4 mb-4">Total Profit: ₹{parseInt(totalAmount)}</h3> {/* Display total amount */}
        </div>

        <div className="col-lg-6">
          <h2 className="mb-3">Users:</h2>
          <ul className="list-group list-group-flush">
            {users.map((user, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span >{index + 1}. {user.username}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
