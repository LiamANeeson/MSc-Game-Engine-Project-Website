import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../../features/auth/authSlice'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  console.log(user)
  return (
    <div>
      <h1>Hi {user && user.name}!</h1>
      <button className='btn' onClick={onLogout}>Log out</button>
    </div>
  )
}

export default Profile