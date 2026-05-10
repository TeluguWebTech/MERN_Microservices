import React from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'

const LandingPage = ({record}) => {
  return (
    <div>
        <Products record={record}/>
    </div>
  )
}

export default LandingPage