import React from 'react'
import playstore from '../assets/playstore.png'
import appstore from '../assets/appstore.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='text-light '>
        <h2 className='text-center text-dark pt-4'>Download our app for a better experience!</h2>
        <div className='py-4 m-auto d-flex justify-content-center gap-3 flex-wrap align-items-center'>
          <img src={playstore} style={{width:"200px",height:"70px"}} alt="" />
          <img src={appstore}  style={{width:"200px",height:"110px"}} alt="" />

        </div>

        <div className='mt-5 row px-4 bg-dark'>
          <div className="col-md-6 ps-5 py-3">
          <Link style={{ textDecoration: "none" }} to={'/'}>
              <h3 className='text-light'>
                <span className='text-light'>Eat</span>
                <span className='text-danger'>z</span>
                <span className='orange'>z</span>y
              </h3>

              
            </Link>
            <h4 className='py-3'>About Us</h4>
            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, exercitationem, dignissimos, expedita voluptatem fuga sequi natus soluta beatae nemo labore incidunt saepe recusandae possimus iusto nesciunt neque? Ipsam, maiores assumenda.</p>
           <div className='d-flex gap-3'>
              <i className='fa-brands fa-instagram'></i>
  
              <i className='fa-brands fa-facebook'></i>
              <i className='fa-brands fa-twitter'></i>
              <i className='fa-brands fa-linkedin'></i>

           </div>


          </div>
          <div className="col-md-3 py-5">
            <h4>COMPANY</h4>
            <div className='d-flex flex-column '>
              <a href="" style={{color:"white",textDecoration:"none"}}>Home</a>
              <a href="" style={{color:"white",textDecoration:"none"}}>About Us</a>
              <a href="" style={{color:"white",textDecoration:"none"}}>Delivery</a>
              <a href="" style={{color:"white",textDecoration:"none"}}>Privacy policy</a>
            </div>
          </div>
          <div className="col-md-3 py-5">
            <h4>GET IN TOUCH</h4>
            <div className='d-flex flex-column '>
              <a href="" style={{color:"white",textDecoration:"none"}}>
              support@eatzzy.com  
              </a>
              <a href="" style={{color:"white",textDecoration:"none"}}>+123 456 7890  </a>
              <a href="" style={{color:"white",textDecoration:"none"}}>  123 Eatzzy Street, Food City, FC 45678  </a>
           
            </div>
          </div>
      
          <hr />
          <p className='py-5 text-center'> Copyright © 2025 Eatzzy. All rights reserved.</p>
        </div>
    
    </div>
  )
}

export default Footer