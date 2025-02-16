import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import banner from '../assets/banner.jpg'
function Delivery() {
    const cartData = useSelector(state => state.cartReducer)
    console.log(cartData);
    const navigate=useNavigate()
    const location = useLocation();
    const { deliveryDetails } = location.state || {}; // Destructure state

    // State to track selected payment method
    const [selectedPayment, setSelectedPayment] = useState('');
console.log(selectedPayment);

    const [cardDetails,setCadDetials]=useState({cardNumber:"" ,holderName:"",expiryDate:"",CVV:""})

    const [orderPlaced, setOrderPlaced] = useState(false);



    const handlePaymentChange = (method) => {
        setSelectedPayment(method);
    };
    const handlePlaceOrder = () => {
        if (selectedPayment) {
            if(selectedPayment=="Card"){
                if(cardDetails.CVV && cardDetails.cardNumber && cardDetails.holderName && cardDetails.expiryDate){
                    setOrderPlaced(true);
                    
            setTimeout(() => {setOrderPlaced(false) 
                navigate('/')}
                 , 3000); // Hide message after 3 seconds
                }
                else{
                    alert("Please enter card details")
                }
            }
            else{
                setOrderPlaced(true);
                setTimeout(() => {setOrderPlaced(false) 
                    navigate('/')}, 3000); // Hide message after 3 seconds
            }
            
        } else {
            alert('Please select a payment method.');
        }
    };
    return (
        <div>
            <Header />
            <div className="px-5 pb-5  container mt-5">

                <div className="row">
                    <div className="col-md-6 pe-5 pt-3">
                        <h3 className='text-dark py-2'>Order Details </h3>

                       {cartData?.length>0?
                       cartData.map(pro=>(
                        <div className='d-flex mb-3 gap-3 align-items-start  ' style={{ maxHeight: "150px" }}>
                            
                        <img src={pro.image} className='w-25' alt="" style={{ width: "100px" , height: "100px" }} />

                        <div className='d-flex w-100 justify-content-between'>
                            <div className=''><h5 className='p-0 m-0'>{pro.name}  |  {pro.restaurant} </h5>   <br />
                                <p className='p-0 m-0'>Qty: {pro.quantity}</p>
                            </div>

                            <div ><h5 >${pro.price}</h5></div>

                        </div>
                     
                       
                    </div>
                  

                       ))
                       
                        :
                        <p>Your cart is empty.</p>
                        }



                    <h5>Sub total ({parseFloat(cartData.reduce((total,item)=>item.quantity+total,0)).toFixed(0) } items) : $ {(
                  cartData.reduce((total, item) => total + Number(item.totalPrice), 0) + 6
                ).toFixed(2)}</h5>
                    </div>
                    <div className=" shadow  col-md-6  text-secondary " style={{  boxShadow:" -1px 0px 0px 0px #aaa"}}>
                        <h3 className=' ps-4 pt-4 text-dark'>Delivery Address </h3>
                     <div className='p-4'>
                            <i className="fa-solid fa-location-dot text-secondary"></i>
                            <span className='ms-2'>
                                {deliveryDetails?.firstName} {deliveryDetails?.lastName}
                                {deliveryDetails?.street}
                            </span> < span className='ms-2'>
                                {deliveryDetails?.city} {deliveryDetails?.state}{' '}
                                {deliveryDetails?.zip} {deliveryDetails?.country}
                            </span>
                          
                            <span className="ps-3">
                                {deliveryDetails?.email} {deliveryDetails?.phone}
                            </span>
                            <h3 className="my-2 text-dark">Payment Method</h3>
    
                            {/* Payment Options */}
                            <label
                                htmlFor="upi"
                                className={`d-block p-2 ${selectedPayment === 'UPI' ? 'back-orange text-white' : ''
                                    }`}
                            >
                                <input
                                    className="me-2"
                                    type="radio"
                                    id="upi"
                                    name="paymentMethod"
                                    onChange={() => handlePaymentChange('UPI')}
                                    checked={selectedPayment === 'UPI'}
                                />
                                UPI
                            </label>
    
                            <label
                                htmlFor="cod"
                                className={`d-block p-2 ${selectedPayment === 'COD' ? 'back-orange text-white' : ''
                                    }`}
                            >
                                <input
                                    className="me-2"
                                    type="radio"
                                    id="cod"
                                    name="paymentMethod"
                                    onChange={() => handlePaymentChange('COD')}
                                    checked={selectedPayment === 'COD'}
                                />
                                Cash on Delivery
                            </label>
    
                            <label
                                htmlFor="card"
                                className={`d-block p-2 ${selectedPayment === 'Card' ? 'back-orange text-white' : ''
                                    }`}
                            >
                                <input
                                    className="me-2"
                                    type="radio"
                                    id="card"
                                    name="paymentMethod"
                                    onChange={() => handlePaymentChange('Card')}
                                    checked={selectedPayment === 'Card'}
                                />
                                Pay using Card
                            </label>
    
                            {/* Conditional Content */}
                            {selectedPayment === 'UPI' && (
                                <div className="mt-3">
                                    <h5>Scan QR Code</h5>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuWCe8rmTu46DaxoIDiX0gHmaP5wVh8NHRDA&s"
                                        alt="QR Code"
                                        className="img-fluid"
                                    />
                                </div>
                            )}
    
                            {selectedPayment === 'Card' && (
                                <div className="mt-3">
                                    <h5>Enter Card Details</h5>
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        className="form-control mb-2"
                                        onChange={(e)=>setCadDetials({...cardDetails,cardNumber:e.target.value})}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Card Holder Name"
                                        className="form-control mb-2"
                                        onChange={(e)=>setCadDetials({...cardDetails,holderName:e.target.value})}

                                    />
                                    <input
                                        type="text"
                                        placeholder="Expiry Date (MM/YY)"
                                        className="form-control mb-2"
                                        onChange={(e)=>setCadDetials({...cardDetails,expiryDate:e.target.value})}

                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        className="form-control"
                                        onChange={(e)=>setCadDetials({...cardDetails,CVV:e.target.value})}

                                    />
                                </div>
                            )}
                     </div>
                <div className='d-flex justify-content-center'><button className='btn login-btn my-3 w-25'style={{height:"40px"}} onClick={handlePlaceOrder}>Place order</button></div>
                    
                    </div>

                </div>

            </div>
            {orderPlaced && (
                <div
                    className="position-fixed top-50 start-50 translate-middle bg-light text-dark border rounded p-5 shadow-lg"
                    style={{ zIndex: 1050 }}
                >
                    <h3> <i className='fa-solid fa-check text-success tick'></i> Order Placed Successfully! </h3>
                </div>
            )}
        </div>
    );
}

export default Delivery;
