import React from 'react'
import Header from '../components/Header'
import exampleimg from '../assets/banner.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { decremetQuantity, incrementQuantity, removeFromCart } from '../Redux/Slice/cartSlice'
import { Link } from 'react-router-dom'

function Cart() {

    const cartDetails=useSelector(state=>state.cartReducer)
    console.log(cartDetails);
    
       const dispatch=useDispatch()

      const handleIncrement=(selectedProduct)=>{
        dispatch(incrementQuantity(selectedProduct))
    
      }
      const handleDecrement=(selectedProduct)=>{
        if(cartDetails.find(pro=>pro.id==selectedProduct.id).quantity==1){
          dispatch(removeFromCart(selectedProduct))
        }
        else{
          dispatch(decremetQuantity(selectedProduct))
        }
       
      }
  return (
    
    <div>
        <Header/>
       { cartDetails?.length>0?
         <div className='container'>
         <table className='table'>
             <thead  >
                 <tr >
                     <th >Item</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Quantity</th>
                     <th>Total</th>
                     <th>Remove</th>

                 </tr>
             </thead>
             <tbody>
                 {
                     cartDetails?.length>0? 
                     cartDetails.map(pro=>(
                         <tr>
                         <td>
                             <img style={{width:'60px',height:"60px"}} src={pro?.image} alt="" />
                         </td>
                         <td>{pro?.name}</td>
                         <td>{pro?.price}</td>
                         <td><button className='decrement-btn ' onClick={()=>handleDecrement(pro)}> -</button>
          <input type="number" style={{width:"40px" ,height:"30px",outline:"none",border:"none"}} value={pro?.quantity} className=' ps-2 text-center' readOnly />
          <button className='increment-btn' onClick={()=>handleIncrement(pro)} > +</button>
     </td>
                         <td>{pro?.totalPrice}</td>
                         <td className='ps-4'><i onClick={()=>dispatch(removeFromCart(pro))} className='fa-solid fa-trash text-danger'></i></td>
 
                     </tr>
                     ))
      
                     :
                     <p>nothing</p>
                 }
            
          
             </tbody>
         </table>

         <div className="row shadow  my-5 py-3">
             <div className="col-md-6">
                 <h5>Bill details</h5>
                 <div className='my-1  d-flex justify-content-between'>
                     <span>Item Total</span>
                     <span>{(cartDetails.reduce((total,item)=>total+Number(item.totalPrice),0)).toFixed(2)}</span>

                 </div>
                 <div className='my-1 d-flex justify-content-between'>
                     <span>Delivery Fee</span>
                     <span>$2</span>

                 </div>
                 <hr />
                 <div className='d-flex justify-content-between my-1'>
                     <span>Platform Fee</span>
                     <span>$1</span>

                 </div>
                 <div className='d-flex justify-content-between my-1'>
                     <span>GST and Restaurant Charges Fee</span>
                     <span>$3</span>

                 </div>
                 <hr className='fw-bold' />
                 <div className='fw-bolder d-flex justify-content-between my-1'>
                     <span>TO PAY</span>
                     <span>${[((cartDetails.reduce((total,item)=>total+Number(item.totalPrice),0))+6).toFixed(2)]}</span>

                 </div>
                 <div className='d-flex justify-content-center mt-4'><Link to={'/payment'}><button className='checkout-btn '>PROCEED TO CHECKOUT</button></Link>
                 </div>
             </div>
             <div className=" ps-md-5 col-md-6">
                 <span>If you have promocode enter it here</span>
                 <br />
                 <input className='promocode-inp' type="text" placeholder='promocode' />
                 <button className='promocode-btn'>Submit</button>

                 
             </div>
         </div>
  </div>
       :
      
 
         <div className='d-flex flex-column justify-content-center align-items-center'>
                <img src="https://www.teampactsolutions.com/img/empty-cart.png" alt="" className='m-auto' />
                <Link to={'/'} ><button className='btn menu-btn'>Go to Menu</button></Link>
             
         </div>
         
       }
   
    </div>
  )
}

export default Cart