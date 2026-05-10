import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/backend_urls'
import axios from 'axios'

const Cart = () => {
  const [showCart, setShowCart] = useState([])
  const token = localStorage.getItem("token")

  const fetchCartItems = async()=>{
    try {
      const response = await axios.get(`${baseUrl}/cart/show-cart-items`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
     setShowCart(response.data.cartItems)
    } catch (error) {
      alert("failed to fetch cartItems")
    }
  }
  useEffect(()=>{
    fetchCartItems()
  }, [])
  return (
    <div className='cartsection p-4 m-6'>
      {showCart.map((item)=>{
        return(
          <div className="border border-amber-400 w-1/2 cartitems  p-8">
           
            <div className="text-3xl">Product Name : {item.productName}</div>
            <div className="flex flex-wrap gap-24">

            <div className="text-2xl flex-1">Price: {item.productPrice}</div>
            <div className="text-[20px]">Quantity: {item.quantity}</div>
            <button className="border border-green-500 p-2">Place order</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cart