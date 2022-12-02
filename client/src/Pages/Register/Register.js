import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserAlt } from 'react-icons/fa'

import { register, reset } from '../../features/auth/authSlice'
import './Register.css'


function Register() {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirm: '',
    })

    const { userName, firstName, lastName, email, password, password_confirm } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/profile')
            window.location.reload(false);
        }

        dispatch(reset())
    },[user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password_confirm) {
            toast.error('Passwords do not match')
          } else {
            const userData = {
                userName,
                firstName,
                lastName,
              email,
              password,
            }
      
            dispatch(register(userData))
        }
    }

    return(
        <>
            <container className="register-container">
                <section className='head'>
                    <h1>Register <FaUserAlt /></h1>
                    <p>Create an account for Horizon Game Engine!</p>
                </section>
                    <form onSubmit={onSubmit} className="submission-form-register">
                    <label for = "userName">User Name</label>
                        <input 
                            type = "text" 
                            className = 'form-control' 
                            id = 'userName'
                            name = 'userName'
                            value = {userName}
                            placeholder = 'Please Enter your user name'
                            onChange={onChange}
                    />
                    <label for="firstName">First Name</label>
                    <input
                        type="text"
                        className='form-control'
                        id='firstName'
                        name='firstName'
                        value={firstName}
                        placeholder='Please Enter your first name'
                        onChange={onChange}
                    />
                    <label for="lastName">Last Name</label>
                    <input
                        type="text"
                        className='form-control'
                        id='lastName'
                        name='lastName'
                        value={lastName}
                        placeholder='Please Enter your last name'
                        onChange={onChange}
                    />
                        <label for = "email">Email</label>
                        <input 
                            type = "email" 
                            className = 'form-control' 
                            id = 'email'
                            name = 'email'
                            value = {email}
                            placeholder = 'Please Enter your email'
                            onChange={onChange}
                        />
                        <label for = "password">Password</label>
                        <input
                            type = "password" 
                            className = 'form-control' 
                            id = 'password'
                            name = 'password'
                            value = {password}
                            placeholder = 'Please create password'
                            onChange={onChange}
                        />
                        <label for = "password_confirm">Confirm Password</label>
                        <input 
                            type = "password" 
                            className = 'form-control' 
                            id = 'password_confirm'
                            name = 'password_confirm'
                            value = {password_confirm}
                            placeholder = 'Confirm Password'
                            onChange={onChange}
                        />
                        <button type='submit' className='submit-btn'>
                            Submit
                        </button>  
                    </form>
            </container>
        </>
    )
}

export default Register