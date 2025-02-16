import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Delivery from './pages/Delivery'

function App() {
  

  return (
   
    
<>
<Routes>
  <Route path={'/'} element={<Home/>} ></Route>
  <Route path={'/cart'} element={<Cart/>}></Route>
  <Route path={'/payment'} element={<Payment/>}></Route>
  <Route path={'/delivery'} element={<Delivery/>}></Route>

</Routes>
</>

  )
}

export default App
