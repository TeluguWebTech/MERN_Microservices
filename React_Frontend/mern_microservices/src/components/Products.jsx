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
    <div className="productsSection">

        <div className="productsContainer">

            {showPro.map((item) => {

                return (

                    <div className="productCard">

                        <div className="productImageBox">

                            <img
                                className="productImage"
                                src={`${baseUrl}/products/uploads/${item.image}`}
                                alt=""
                            />

                        </div>

                        <div className="productDetails">

                            <div className="productPrice">
                                Rs. {item.price}
                            </div>

                            <div className="productName">
                                {item.name}
                            </div>

                            <div className="productDesc">
                                {item.desc}
                            </div>

                            <button
                                className="cartBtn"
                                onClick={() =>
                                    cartRecord(
                                        item._id,
                                        item.name,
                                        item.price
                                    )
                                }
                            >
                                Add To Cart
                            </button>

                        </div>

                    </div>
                )
            })}

        </div>

    </div>
)
}

export default Products