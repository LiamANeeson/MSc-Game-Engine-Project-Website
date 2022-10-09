import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {login, reset} from '../../features/auth/authSlice'


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
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
            <section className='head'>
                <h1>Login</h1>
                <p>Log into your Horizon Game Engine account!</p>
            </section>

            <section className = 'form'>
                <form onSubmit={onSubmit}>
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
                    <button type='submit' className='submit-btn'>
                        Submit
                    </button>  
                </form>
            </section>
        </>
    )
}

export default Login