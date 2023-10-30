import React, { useState } from 'react'
import BackButton from './asset/BackButton'
import NavBar from './asset/NavBar'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', mobile: '', password: '' })
  const { register, handleSubmit, formState: { errors } } = useForm()


  const registerUser = async () => {
    try {
      const data = await axios.post(`http://localhost:5000/api/person/register`, user)
      console.log(data)
    } catch (error) {

    }
  }

  return (
    <>
      <NavBar />
      <BackButton />
      <div className='flex flex-col justify-center items-center'>
        <form action="" className='bg-sky-400 w-[20em] flex flex-col justify-center items-center p-4 rounded-md' onSubmit={handleSubmit(registerUser)}>
          <div className='m-4'>
            <input placeholder='Enter name' className='bg-teal-300 rounded-xl text-sm px-4 py-2 '
              type="text" {...register('name', { required: true })} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            {errors.name && <p>Name is Required</p>}

          </div>
          <div className='m-4'>
            <input placeholder='Enter Email' className='bg-teal-300 rounded-xl text-sm px-4 py-2 '
              type="email" {...register('email', { required: true })} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            {errors.email && <p>Email is Required</p>}

          </div>
          <div className='m-4'>
            <input placeholder='Enter Mobile' className='bg-teal-300 rounded-xl text-sm px-4 py-2 '
              type="text" {...register('mobile', { required: true })} onChange={(e) => setUser({ ...user, mobile: e.target.value })} />
            {errors.mobile && <p>Mobile is Required</p>}

          </div>
          <div className='m-4'>
            <input placeholder='Enter Password' className='bg-teal-300 rounded-xl text-sm px-4 py-2 '
              type="password" {...register('password', { required: true })} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            {errors.password && <p>Password is Required</p>}

          </div>
          <button type="submit">Register</button>
        </form>
      </div>

    </>
  )
}

export default Register