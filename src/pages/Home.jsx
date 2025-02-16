import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect,useState } from 'react';
import Card from 'react-bootstrap/Card';
import { fetchProducts } from '../Redux/Slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Landing from '../components/Landing';
import Header from '../components/Header';
import { addtoCart ,incrementQuantity,decremetQuantity,removeFromCart} from '../Redux/Slice/cartSlice';
import 'placeholder-loading/dist/css/placeholder-loading.min.css';
import Footer from '../components/Footer';

function Home() {
  
  const {allProducts,error,loading,searching}=useSelector(state=>state.productReducer)
  const cartDetails=useSelector(state=>state.cartReducer)

  const dispatch=useDispatch()

  useEffect(() => {
 dispatch(fetchProducts())
  }, [])
  console.log(allProducts,error,loading);

  const [show, setShow] = useState(false);
  const [selectedProduct,setSelectedProduct]=useState(null)

 
  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setShow(true)
    setSelectedProduct(product)
  };

  const handleAddtoCart=(selectedProduct)=>{
    dispatch(addtoCart(selectedProduct))
  }
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
   
    
 < >
  
<div>
<Header/>
     <div className='container '>
          <div className='row  d-flex  '>
          {!searching && <Landing/>}
            

            <h3 className='mt-5 ps-5'>Our top picks for you</h3>
            {loading?
            <div className='row '>
              <div className="col-md-4">
              <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
              <div className="ph-col-12">
                <div className="ph-row ">
                  <div className="ph-col-6"></div>
                  <div className="ph-col-4 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
              </div>
              </div>
              <div className="col-md-4">
              <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
              <div className="ph-col-12">
                <div className="ph-row ">
                  <div className="ph-col-6"></div>
                  <div className="ph-col-4 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
              </div>
              </div>
              <div className="col-md-4">
              <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
              <div className="ph-col-12">
                <div className="ph-row ">
                  <div className="ph-col-6"></div>
                  <div className="ph-col-4 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
              </div>
              </div>
              <div className="col-md-4">
              <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
              <div className="ph-col-12">
                <div className="ph-row ">
                  <div className="ph-col-6"></div>
                  <div className="ph-col-4 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
              </div>
              </div>
              <div className="col-md-4">
              <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
              <div className="ph-col-12">
                <div className="ph-row ">
                  <div className="ph-col-6"></div>
                  <div className="ph-col-4 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
              </div>
              </div>
              <div className="col-md-4">
              <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
              <div className="ph-col-12">
                <div className="ph-row ">
                  <div className="ph-col-6"></div>
                  <div className="ph-col-4 empty"></div>
                  <div className="ph-col-12"></div>
                </div>
              </div>
              </div>
              </div>
            </div>
           
              :
              allProducts?.map(pro=>(
         
                    <div className='col-12  col-sm-6 col-md-4 mb-4 d-flex justify-content-center '>
                    <Card onClick={()=>handleShow(pro)} style={{ width: '18rem'}} className='cardbody' >
                      <Card.Img variant="top" src={pro.image} style={{height:"270px",borderRadius:"3rem"}} />
                      <Card.Body className='px-0'>
                        <Card.Title>
                            <div className='d-flex justify-content-between ' style={{fontSize:"17px"}}>
                                <p>{pro.name}</p>
                                <button className=' rating-btn'  >{pro?.rating} <i className='fa-solid fa-star' style={{fontSize:"10px"}}></i></button> 
                            </div>
                        </Card.Title>
                        <Card.Text >
                      <div className='d-flex justify-content-between ' style={{color:"gray"}}>
                        <h6 style={{fontWeight:"200"}}>{pro.restaurant}</h6>
                        <h6 style={{fontWeight:"400"}}>$ {pro.price}</h6>
                      </div>
                      <div className='d-flex justify-content-end'>
                        <h6 style={{fontWeight:"200"}} > {pro.preparationTime} </h6>
        
                        </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    </div>
        
         
              ))
            }
<div className='d-flex m-auto justify-content-center align-items-center'>
      <Modal

    show={show}
    onHide={handleClose}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="custom-modal" // Custom class here
   
  >
  
    <Modal.Body className='p-0 m-0' style={{borderRadius:"2.5rem"}} >
      <i className='fa-solid fa-x close-btn' onClick={handleClose} ></i>
      <img className="img-fluid p-4 m-0" style={{ width: "100%", maxHeight: "300px" ,borderRadius:"2.5rem"}} src={selectedProduct?.image} alt="" />
   <div className='d-flex justify-content-between align-items-center mx-1'>
       <div className='px-4'>
          <h4 className='mt-2 fw-bold hash' style={{fontSize:"19px"}}>{selectedProduct?.name}</h4>
         <h4 style={{fontSize:"17px",fontWeight:"600"}}>$ {selectedProduct?.price}</h4>
       </div>
      
       <div className=' add-btn me-3 d-flex justify-content-evenly align-items-center'>
        {
          cartDetails?.find(pro=>pro.id==selectedProduct?.id) ?
         <div>
           <button className='decrement-btn ' onClick={()=>handleDecrement(selectedProduct)}> -</button>
          <input type="number" style={{width:"40px" ,height:"30px",outline:"none",border:"none"}} value={cartDetails.find(pro=>pro.id==selectedProduct.id).quantity} className=' ps-2 text-center' readOnly />
           <button className='increment-btn' onClick={()=>handleIncrement(selectedProduct)} > +</button> 
         </div>
          :
            <button className='btn text-success fw-bolder' onClick={()=>handleAddtoCart(selectedProduct)}>Add</button> 
        }
       
        
    
       </div>
      
   </div>
   <div  className='mx-1'>
        <i className='fa-solid ps-4 fa-star text-success'></i> <span className='fw-bold text-success'>{selectedProduct?.rating}</span>

        <p className='px-4'>{selectedProduct?.description}</p>
       </div>
       
    </Modal.Body>
  
  </Modal>
</div>

        
        
          </div>
        
     </div>
     <Footer/>
</div>
 
 
 </>

  )
}

export default Home

