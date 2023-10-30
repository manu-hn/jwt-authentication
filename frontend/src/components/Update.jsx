import React, { useEffect, useState } from 'react'
import BackButton from './asset/BackButton'
import NavBar from './asset/NavBar'
import { useForm } from "react-hook-form"
import axios from 'axios'

const Update = () => {
  const [user, setUser] = useState({ name: '', email: "", mobile: "" })
  const [id, setId] = useState('')
  const [message, setMessage] = useState('')
  const { register, handleSubmit } = useForm()

  const updateUser = async () => {
    try {
      let response = await axios.put(`http://localhost:5000/api/person/update/${id}`, user, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
     setMessage(response.data.message)
      console.log(response)
      setTimeout(() => {
        setMessage('')
      }, 1000)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem('_id')) {
      setId(localStorage.getItem('_id'))
    }
  }, [])

  return (
    <div>
      <NavBar />
      <BackButton />
      <div className='flex flex-col justify-center items-center'>
      {message}

        <form className='bg-sky-400 w-[20em] flex flex-col justify-center items-center p-4 rounded-md' action="" onSubmit={handleSubmit(updateUser)}>
          <div className='m-2'>
            <input type="text" className='bg-teal-300 rounded-xl text-sm px-4 py-2 ' placeholder='Name' {...register('name')}
              value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />

          </div>
          <div className='m-2'>
            <input type="text" className='bg-teal-300 rounded-xl text-sm px-4 py-2 ' placeholder='Email' {...register('email')}
              onChange={e => setUser({ ...user, email: e.target.value })} />
          </div>
          <div className='m-2'>
            <input type="text" className='bg-teal-300 rounded-xl text-sm px-4 py-2 ' placeholder='Mobile' {...register('mobile')}
              onChange={e => setUser({ ...user, mobile: e.target.value })} />
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default Update