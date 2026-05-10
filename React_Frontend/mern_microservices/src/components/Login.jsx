import React, { useState } from 'react'
import { baseUrl } from '../utils/backend_urls'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({loginAlert}) => {
    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const userLogin = async(e)=>{
        e.preventDefault()
        const userDetails = { email, password}
        try {
            const response = await axios.post(`${baseUrl}/auth/login`,userDetails)
            alert("login success")
            navigate("/")
            loginAlert()
            console.log(response.data)
            const authToken = response.data.token
            localStorage.setItem("token", authToken)
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("userId", response.data.userId)
        } catch (error) {
            alert("login failed")
            console.log(error)
        }
    }

  return (
   <section className='authsection'>
        <div className="authtitle"> Login</div>
<form  className='formsection' onSubmit={userLogin}>
    
        <div className="forminput">Enter Email</div>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <div className="forminput">Enter Password</div>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit'>Login</button>

</form>
   </section>
  )
}

export default Login