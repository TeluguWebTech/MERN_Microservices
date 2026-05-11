import React, { useState } from 'react'
import axios from "axios"
import { baseUrl } from '../utils/backend_urls'

const AddProduct = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [desc, setDesc] = useState("")

    const productHandler = async () => {

        try {

            const formData = new FormData()

            formData.append("name", name)
            formData.append("price", price)
            formData.append("desc", desc)
            formData.append("image", image)

            const response = await axios.post(
                `${baseUrl}/products/add-product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )

            console.log(response.data)

            alert("Product Added Successfully")

            // Clear Form
            setName("")
            setPrice("")
            setImage(null)
            setDesc("")

        } catch (error) {

            console.log(error)

            alert("Failed To Add Product")
        }
    }

    return (

        <div className="formSection">

            <div className="formContainer">

                <h2>Add Product</h2>

                <div className="inpField">

                    <div className="inpTitle">
                        Product Name
                    </div>

                    <input
                        type="text"
                        placeholder="Enter Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>

                <div className="inpField">

                    <div className="inpTitle">
                        Product Price
                    </div>

                    <input
                        type="number"
                        placeholder="Enter Product Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                </div>

                <div className="inpField">

                    <div className="inpTitle">
                        Upload Product Image
                    </div>

                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                </div>

                <div className="inpField">

                    <div className="inpTitle">
                        Product Description
                    </div>

                    <textarea
                        placeholder="Enter Product Description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />

                </div>

                <button
                    className="addBtn"
                    onClick={productHandler}
                >
                    Add Product
                </button>

            </div>

        </div>
    )
}

export default AddProduct