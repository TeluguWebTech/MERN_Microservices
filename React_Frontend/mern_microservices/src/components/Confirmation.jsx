import axios from 'axios'
import React from 'react'
import { baseUrl } from '../utils/backend_urls'

const Confirmation = ({ activeCart, showCart, totalPrice }) => {

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    const email = localStorage.getItem("email")
    const orderHandler = async () => {

        try {

            // Loop through all cart items
            for (const item of showCart) {

                const orderRecord = {

                    userId,
                    email,
                    productId: item.productId,
                    productName: item.productName,
                    productPrice: item.productPrice,
                    quantity: item.quantity,
                    totalAmount: totalPrice
                }

                await axios.post(
                    `${baseUrl}/order/place-order`,
                    orderRecord,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

            }

            alert("Order placed successfully")

            activeCart()

        } catch (error) {

            console.log(error)

            alert("Order failed")

        }

    }


    return (

        <div className='mt-8'>

            <div className="text-2xl mb-4">
                Only Cash on Delivery available
            </div>

            <div className="text-3xl font-bold mb-4">
                Total Amount : ₹{totalPrice}
            </div>

            <button
                onClick={orderHandler}
                className='border border-green-600 bg-green-600 text-white p-3 rounded-lg'
            >
                Proceed to Place Order
            </button>

        </div>

    )

}

export default Confirmation