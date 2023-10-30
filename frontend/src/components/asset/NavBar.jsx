import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './personAuth'

const NavBar = () => {
  const {isLoggedIn, logout}=useAuth()
  return (
    <div>
         <nav className='w-full bg-cyan-300 p-[1em] mb-4'>
        <ul className='flex w-full justify-evenly'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            {!isLoggedIn ? <li><Link to="/login"><button>Login</button></Link></li> : <li><Link to="/login"><button
            onClick={()=>logout()}>Logout</button></Link></li>}
            {isLoggedIn ? <li><Link to="/update">Update</Link></li> : null }
        </ul>
       </nav>
    </div>
  )
}

export default NavBar