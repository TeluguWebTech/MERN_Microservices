import React, { useState } from 'react'
import {Link} from "react-router-dom"

const Navbar = ({userName}) => {

  return (
   <header class="text-white body-font bg-black">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
     <Link to="/">
      <span class="ml-3 text-xl text-white">MERN E=comm</span>
     </Link>
    </a>
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <div className="text-1xl mr-30">Welcome {userName}</div>
      <Link to="/">
      <div class="mr-5 hover:text-amber-300">Home</div>
      </Link>
      <Link to="/cart">
      <div class="mr-5 hover:text-amber-300">Cart</div>
      </Link>
      <Link to="/register">
      <div class="mr-5 hover:text-amber-300">Register</div>
      </Link>
      <Link to="/login">
      <div class="mr-5 hover:text-amber-300">Login</div>
      </Link>
    
    </nav>
 
  </div>
</header>
  )
}

export default Navbar