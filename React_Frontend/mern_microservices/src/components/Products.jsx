import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/backend_urls'
import axios from "axios"

const Products = () => {
    const [showPro, setShowPro] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/products/show-products`)
            console.log(response.data)
            setShowPro(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const cartRecord = async(productId,productName, productPrice)=>{
        const cartItem = {userId,productId,productName, productPrice }
        console.log("cart added items:", cartItem)
        try {
            const response = await axios.post(`${baseUrl}/cart/add-to-cart`, cartItem,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            alert("product added to cart successfully")
        } catch (error) {
                console.log(error)
                alert("failed to add cart")
        }
    }

    return (
        <div>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-10 mx-auto">
                    <div class="flex flex-wrap -m-4 gap-2">
                        {showPro.map((item) => {
                            return (
                                <div class="lg:w-1/4 md:w-1/2 p-4 w-full border border-amber-400 rounded-2xl">
                                    <a class="block relative h-48 rounded overflow-hidden">
                                        <img alt="ecommerce" class="object-contain object-center w-full h-full block" src={`${baseUrl}/products/uploads/${item.image}` }/>
                                    </a>
                                    <div class="mt-4">
                                        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">Rs.{item.price}</h3>
                                        <div className="flex flex-wrap gap-36">
                                        <h2 class="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
                                        {/* <p class="mt-1">{item.desc}</p> */}
                                        <button className='border border-amber-600 '
                                        onClick={()=>cartRecord(item._id, item.name, item.price)}
                                        >Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Products