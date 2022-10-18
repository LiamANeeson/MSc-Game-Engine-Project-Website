import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../../features/auth/authSlice'
import {useState, useEffect} from 'react'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: '',
    })

    const {name, email, password, password_confirm} = formData
    
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
              name,
              email,
              password,
            }
      
            dispatch(register(userData))
        }
    }

    return(
        <>
            <section className='head'>
                <h1>Register</h1>
                <p>Create an account for Horizon Game Engine!</p>
            </section>

            <section className = 'form'>
                <form onSubmit={onSubmit}>
                    <input 
                        type = "text" 
                        className = 'form-control' 
                        id = 'name'
                        name = 'name'
                        value = {name}
                        placeholder = 'Please Enter your name'
                        onChange={onChange}
                    />
                    <input 
                        type = "email" 
                        className = 'form-control' 
                        id = 'email'
                        name = 'email'
                        value = {email}
                        placeholder = 'Please Enter your email'
                        onChange={onChange}
                    />
                    <input 
                        type = "password" 
                        className = 'form-control' 
                        id = 'password'
                        name = 'password'
                        value = {password}
                        placeholder = 'Please create password'
                        onChange={onChange}
                    />

                    <input 
                        type = "password_confirm" 
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
            </section>
        </>
    )
}

export default Register