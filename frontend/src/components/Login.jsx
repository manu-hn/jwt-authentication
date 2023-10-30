import React, { useState , } from 'react'
import { useForm } from 'react-hook-form'
import BackButton from './asset/BackButton'
import NavBar from './asset/NavBar'
import axios from 'axios'
import { useAuth } from './asset/personAuth'


const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('')

  const{login, isLoggedIn}=useAuth()
 

  const { register, handleSubmit, formState: { errors } } = useForm()


  const loginUser = async () => {
    try {
      const data = await axios.post(`http://localhost:5000/api/person/login`, user,)
      setMessage(data.data.message)
      const _id = data.data.userData._id
      localStorage.setItem('_id', _id)
      const token = data.data.token
      login(token)
     
      setTimeout(() => {
        setMessage('')
      }, 1000)
      console.log(data)
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage('')
      }, 1000)
    }
  }


  return (
    <div >
      <NavBar />
      <BackButton />
      <div className='flex flex-col justify-center items-center' >
        {message}
        <form className='bg-sky-400 w-[20em] flex flex-col justify-center items-center p-4 rounded-md' action="" onSubmit={handleSubmit(loginUser)}>
          {isLoggedIn ? " ":<h2 className='text-2xl text-white'>Login</h2> }

          <div className='m-2'>
            <input className='bg-teal-300 rounded-xl text-sm px-4 py-2 ' placeholder='Enter Email'
              type="email" {...register('email', { required: true })} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            {errors.email && <p>Email is Required</p>}
          </div>
          <div className='m-2' >
            <input className='bg-teal-300 rounded-xl text-sm px-4 py-2 ' placeholder='Enter Password'
              type="password" {...register('password1', { required: true })} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            {errors.password && <p>Password is Required</p>}
          </div>

          <button type='submit' className='bg-blue-600 rounded-xl text-black px-4 py-2'>Submit</button>

        </form>
      </div>
    </div>
  )
}

export default Login