import React, { useState } from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const cartDetails = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();

  // State to store delivery details
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });

  // Handler to update state when input fields change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  // Function to validate delivery details
  const validateDeliveryDetails = () => {
    for (const key in deliveryDetails) {
      if (!deliveryDetails[key]) {
        alert(`Please fill in the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  // Handler for the Place Order button
  const handlePlaceOrder = () => {
    if (validateDeliveryDetails()) {
      navigate('/delivery', { state: { deliveryDetails } });
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col-md-6">
            <h3 className="my-3">Delivery Information</h3>
            <div className="row">
              <div className="col-md-6 mt-2">
                <input
                  style={{ height: '35px', outline: 'none' }}
                  className="w-100 info-inp"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={deliveryDetails.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mt-2 ms-0 ps-md-0">
                <input
                  style={{ height: '35px', outline: 'none' }}
                  className="w-100 info-inp"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={deliveryDetails.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <input
                  style={{ height: '35px', outline: 'none' }}
                  className="w-100 info-inp"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={deliveryDetails.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <input
                  style={{ height: '35px', outline: 'none' }}
                  className="w-100 info-inp"
                  type="text"
                  placeholder="Street Name"
                  name="street"
                  value={deliveryDetails.street}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-2">
                <input
                  style={{ height: '35px', outline: 'none' }}
                  className="w-100 info-inp"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={deliveryDetails.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mt-2 ms-0 ps-md-0">
                <input
                  style={{ height: '35px', outline: 'none' }}
                  className="w-100 info-inp"
                  type="text"
                  placeholder="State"
                  name="state"
                  value={deliveryDetails.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-2">
                <input
                  style={{ height: '35px', outline: 'none' }}
                  className="w-100 info-inp"
                  type="number"
                  placeholder="Zip"
                  name="zip"
                  value={deliveryDetails.zip}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mt-2 ms-0 ps-md-0">
                <input
                  style={{ height: '35px', outline: 'none' }}
                  className="w-100 info-inp"
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={deliveryDetails.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <input
                  style={{ height: '35px', outline: 'none' }}
                  className="w-100 info-inp"
                  type="number"
                  placeholder="Phone"
                  name="phone"
                  value={deliveryDetails.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h3 className="my-3">Cart Total</h3>
            <div className="my-1 d-flex justify-content-between">
              <span>Item Total</span>
              <span>
                {cartDetails.reduce((total, item) => total + Number(item.totalPrice), 0).toFixed(2)}
              </span>
            </div>
            <div className="my-1 d-flex justify-content-between">
              <span>Delivery Fee</span>
              <span>$2</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between my-1">
              <span>Platform Fee</span>
              <span>$1</span>
            </div>
            <div className="d-flex justify-content-between my-1">
              <span>GST and Restaurant Charges Fee</span>
              <span>$3</span>
            </div>
            <hr className="fw-bold" />
            <div className="fw-bolder d-flex justify-content-between my-1">
              <span>TO PAY</span>
              <span>
                $
                {(
                  cartDetails.reduce((total, item) => total + Number(item.totalPrice), 0) + 6
                ).toFixed(2)}
              </span>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button className="checkout-btn" onClick={handlePlaceOrder}>
               PROCEED TO PAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
