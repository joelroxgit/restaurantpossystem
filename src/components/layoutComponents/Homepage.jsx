import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

function Homepage() {
  const navigate = useNavigate();
  const token1 = localStorage.getItem("token");
  if (!token1) {
    navigate("/login/user");
  }
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Map());
  const [searchTerm, setSearchTerm] = useState('');
  const [billItems, setBillItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const componentRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const token = localStorage.getItem("token")
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
      setFoodItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const itemAdd = (itemId) => {
    const foundItem = foodItems.find(item => item.id === itemId);
    setSelectedItems(prevMap => {
      const newMap = new Map(prevMap);
      if (prevMap.has(itemId)) {
        newMap.set(itemId, prevMap.get(itemId) + 1);
      } else {
        newMap.set(itemId, 1);
      }
      return newMap;
    });
  };

  const itemRemove = (itemId) => {
    setSelectedItems(prevMap => {
      const newMap = new Map(prevMap);
      if (prevMap.has(itemId)) {
        const quantity = prevMap.get(itemId);
        if (quantity > 1) {
          newMap.set(itemId, quantity - 1);
        } else {
          newMap.delete(itemId);
        }
      }
      return newMap;
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const searchItems = () => {
    let filteredItems = foodItems;
    if (selectedCategory) {
      filteredItems = filteredItems.filter(item => item.foodType.toLowerCase() === selectedCategory);
    }
    return filteredItems.filter(item => item.name.toLowerCase().includes(searchTerm));
  };

  const calculateTotalAmount = () => {
    return Array.from(selectedItems.entries()).reduce((total, [itemId, quantity]) => {
      const selectedItem = foodItems.find(item => item.id === itemId);
      const totalPrice = selectedItem.price * quantity;
      return total + totalPrice;
    }, 0);
  };

const gst = calculateTotalAmount()*5/100

  const handlePrintClick = async () => {
    setIsPrinting(true);

    const selectedItemsArray = Array.from(selectedItems.entries()).map(([itemId, quantity]) => {
      const selectedItem = foodItems.find(item => item.id === itemId);
      return { id: selectedItem.id, name: selectedItem.name, price: selectedItem.price, quantity };
    });

    try {
      const response = await fetch("http://localhost:5002/api/bills", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          selectedItems: selectedItemsArray,
          netAmount: calculateTotalAmount(),
          total: calculateTotalAmount()+gst,
          gst,
        })
      });

      if (response.ok) {
        console.log('Data sent to backend successfully!');
        if (componentRef.current) {
          componentRef.current.focus();
          componentRef.current.print();
        }
      } else {
        console.error('Error sending data to backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          name="search"
          className="m-4 p-0"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => setSelectedCategory('veg')} className="btn btn-primary m-2">Veg</button>
        <button onClick={() => setSelectedCategory('nonveg')} className="btn btn-primary m-2">Non-Veg</button>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="container d-flex flex-wrap justify-content-between">
          {searchItems().map(item => (
            <div key={item.id} className="item-container col-md-4">
              <div className="food-item-card card border border-primary rounded mb-3">
                <img
                  src="https://content.jdmagicbox.com/comp/panruti/f4/9999p4156.4156.180808155543.b6f4/catalogue/thirumana-briyani-panruti-biryani-caterers-z3rgelna1x.jpg?clr="
                  alt="Food"
                  className="card-img-top"
                  width="150"
                  height="150"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Type: {item.foodType}</p>
                  <p className="card-text">Price: {item.price}</p>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => itemAdd(item.id)} className="btn btn-primary">+</button>
                    <button onClick={() => itemRemove(item.id)} className="btn btn-primary">-</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-6 selected-items d-flex flex-column">
          <h2 className='text-align-center'>JOEL POS</h2>
          <div className="selected-items-list flex-grow-1 overflow-auto">
            {Array.from(selectedItems.entries()).map(([itemId, quantity], index) => {
              const selectedItem = foodItems.find(item => item.id === itemId);
              const totalPrice = selectedItem.price * quantity;
              return (
                <div key={index} className="selected-item d-flex justify-content-between">
                  <p>{index + 1}. {selectedItem.name}</p>
                  <p>Price: {totalPrice}</p>
                  </div>
                  );
                })}
                <h6 className="m-2">Net Amount: {calculateTotalAmount()}</h6>
                <h6 className="m-2">Gst: {gst}</h6>
                <h6 className="m-2">Total Amount: {calculateTotalAmount()+gst}</h6>
          </div>

          {isPrinting ? (
            <p>Sending data to backend...</p>
          ) : (
            <ReactToPrint
              trigger={() => <button>Print the Bill</button>}
              content={() => componentRef.current}
              onBeforePrint={() => handlePrintClick()}
            />
          )}

          <div style={{ display: 'none' }}>
            <div ref={componentRef} className="bill-container">
              <h2 className="mt-5 text-center">JoelPos</h2>
              <p className="m-3 text-center">palayamkottai, Tirunelveli</p>
              <p className="m-3 text-center">+91  9940914998 </p>
              <p className="m-3 text-center">Joelndev2003@gmail.com </p>
              <p className="text-center">{new Date(Date.now()).toLocaleString()}</p>
              <hr />
              <div className="m-5 p-0">
                {Array.from(selectedItems.entries()).map(([itemId, quantity], index) => {
                  const selectedItem = foodItems.find(item => item.id === itemId);
                  const totalPrice = selectedItem.price * quantity;
                  return (
                    <div className='d-flex' key={index}>
                      <h6 className="m-5">{index + 1}</h6>
                      <h4 className="m-5">{selectedItem.name}</h4>
                      <h4 className="m-5">Quantity: {quantity}</h4>
                      <h4 className="m-5">Price: {totalPrice}</h4>
                      </div>
                      );
                    })}
                    <hr/>
                    <h3 className="m-2">Net Amount: {calculateTotalAmount()}</h3>
                    <h3 className="m-2">Gst: {gst}</h3>
                    <h3 className="m-2">Total Amount: {calculateTotalAmount()+gst}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
