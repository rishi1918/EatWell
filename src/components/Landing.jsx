import React from 'react'
import banner from '../assets/banner1.jpg'
function Landing() {
  return (
    <div className='banner'>
     <div className='row '>
        <div className='col-7 text-light mt-5 ps-5'>
          <h1  style={{fontSize:"5rem"}}>Delicious Meals, Delivered Fast!</h1>
          <div ><p className='text-light fw-bold'>Craving something delicious? Browse our menu, order your favorites, and enjoy fresh, hot meals delivered to your door!</p>
          <button className='menu-btn'>View Menu </button>
          </div>

    
        </div>
        
     </div>
    </div>
  )
}

export default Landing