import React from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {login, reset} from '../../features/auth/authSlice'
import './Login.css'


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
        toast.error(message)
    }

    if (isSuccess || user) {
        navigate('/profile')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email, 
            password
        }
        dispatch(login(userData))
    }

    return(
        <>
        <container className="login-container">
            <section className='head'>
                <h1>Login <FaSignInAlt /></h1>
                <p>Log into your Horizon Game Engine account!</p>
            </section>
                <form onSubmit={onSubmit} className='submission-form'>
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
                        placeholder = 'Please enter password'
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

export default Login