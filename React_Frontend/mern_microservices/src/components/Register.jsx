import React, { useState } from 'react'
import { baseUrl } from '../utils/backend_urls'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const [username, setName] = useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const userReg = async(e)=>{
        e.preventDefault()
        const userDetails = {username, email, password}
        console.log(userDetails)
        try {
            const response = await axios.post(`${baseUrl}/auth/register`,userDetails)
            alert("user registration success")
            navigate("/login")
        } catch (error) {
            alert("reg failed")
            console.log(error)
        }
    }

  return (
   <section className='authsection'>
        <div className="authtitle">User Register</div>
<form  className='formsection' onSubmit={userReg}>
       
        <div className="forminput">User Name</div>
        <input type="text" value={username} onChange={(e)=>setName(e.target.value)} />
        <div className="forminput">Enter Email</div>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <div className="forminput">Enter Password</div>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit'>Register</button>

</form>
   </section>
  )
}

export default Register