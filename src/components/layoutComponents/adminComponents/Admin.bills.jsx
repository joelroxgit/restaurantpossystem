import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

function AdminBills() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updatedBillData, setUpdatedBillData] = useState({
        gst: "",
        netAmount: "",
        total: ""
    });

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5002/api/bills", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch bills");
                }
                const data = await response.json();
                console.log(data)
                setBills(data.bills);
            } catch (error) {
                console.error("Error fetching bills:", error);
            }
        };
        fetchBills();
    }, []);
    
    const handleEdit = (bill) => {
        setSelectedBill(bill);
        setUpdatedBillData({
            gst: bill.gst,
            netAmount: bill.netAmount,
            total: bill.total
        });
        setModalIsOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBillData({
            ...updatedBillData,
            [name]: value
        });
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5002/api/bills/${id}`, {
                
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`    
                }
            });
            if (!response.ok) {
                throw new Error("Failed to delete bill");
            }
            setBills(bills.filter(bill => bill.id !== id));
        } catch (error) {
            console.error("Error deleting bill:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5002/api/bills/${selectedBill.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`    
                },
                body: JSON.stringify(updatedBillData)
            });
            if (!response.ok) {
                throw new Error("Failed to update bill");
            }
            setModalIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Error updating bill:", error);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedBill(null);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Bill Items</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Created At</th>
                        <th>Net Amount</th>
                        <th>GST</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill, index) => (
                        <tr key={index}>
                            <td>{bill.id}</td>
                            <td>{bill.createdAt}</td>
                            <td>₹{bill.netAmount}</td>
                            <td>₹{bill.gst}</td>
                            <td>₹{bill.total}</td>
                            <td>
                                <button className="btn btn-primary ml-5" onClick={() => handleEdit(bill)}>Edit</button>
                                <button className="btn btn-danger ml-5" onClick={() => handleDelete(bill.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Bill Modal"
            >
                {selectedBill && (
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Bill</h5>
                                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="gst">GST:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="gst"
                                        name="gst"
                                        value={updatedBillData.gst}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="netAmount">Net Amount:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="netAmount"
                                        name="netAmount"
                                        value={updatedBillData.netAmount}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="total">Total:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="total"
                                        name="total"
                                        value={updatedBillData.total}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleUpdate} className="btn btn-primary">Update</button>
                                <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default AdminBills;
