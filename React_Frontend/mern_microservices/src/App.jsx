import React, { use, useState } from 'react'

import Register from './components/Register'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './components/Login'
import Cart from './components/Cart'
import Products from './components/Products'

const App = () => {
  const [userName, setUserName] = useState("")
  const [proId, setProId] = useState("")
  const [proName, setProName] = useState("")
  const [proPrice, setProPrice] = useState("")
 
  const loginAlert = () => {
    const user = localStorage.getItem("username")
    setUserName(user)
  }
console.log("home", name)
    const productRecord = (id,name, price )=>{
        setProId(id)
        setProName(name)
        setProPrice(price)
        console.log("record", id, name, price)
    }

  return (
    <div>
      <Navbar userName={userName}/>
      <Routes>
        <Route path='/' element={<Products record = {productRecord} productId={proId} productName={proName} productPrice={proPrice}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login loginAlert={loginAlert}/>} />
        <Route path='/cart' element={<Cart />} />
      </Routes>

    </div>
  )
}

export default App