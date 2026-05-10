import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/backend_urls'
import axios from 'axios'
import Confirmation from './Confirmation'

const Cart = () => {
  const [showCart, setShowCart] = useState([])
  const [confirm, setConfirm] = useState(false)
  const [showPrice, setShowPrice] = useState(0)

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
   const activeCart=()=>{
    setConfirm(true)
    console.log("active function called")
  }

  const incHandler=(id)=>{
    const updateCart = showCart.map((item)=>{
      if(item._id === id){
        return {...item, quantity: item.quantity +1}
      }
      return item;
    })
    setShowCart(updateCart)
  }

  const decHandler=(id)=>{
    const updateCart = showCart.map((item)=>{
        if(item._id === id && item.quantity >1){
          return {...item, quantity: item.quantity -1}
        }
        return item
    })
    setShowCart(updateCart)
  }
   const totalPrice = showCart.reduce((total, item)=>{
  return total + (item.productPrice * item.quantity)
 },0)
  return (
    <div className='cartsection p-4 m-4'>
      {showCart.map((item)=>{
        return(
          <div className="border border-amber-400 w-1/2 cartitems  p-8">
           
            <div className="text-3xl">Product Name : {item.productName}</div>
            <div className="flex flex-wrap gap-24">

            <div className="text-2xl flex-1">Price: {item.productPrice*item.quantity}</div>
            <div className="text-[20px]">
              Qty: 
              <button className='m-2'
              onClick={()=>incHandler(item._id)}
              >+</button>
              {item.quantity}
              <button className='m-2'
              onClick={()=>decHandler(item._id)}
              >-</button>
              </div>
            </div>
          </div>
        )
      })}
      <div className="text-3xl">Total Amount: {totalPrice}</div>
     <Confirmation
    activeCart={activeCart}
    showCart={showCart}
    totalPrice={totalPrice}
/>
    </div>
  )
}

export default Cart