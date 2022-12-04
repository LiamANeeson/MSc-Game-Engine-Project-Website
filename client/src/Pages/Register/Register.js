import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserAlt } from 'react-icons/fa'

import { register, reset } from '../../features/auth/authSlice'
import './Register.css'
import { Col, Container, Row } from 'react-bootstrap'


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: '',
    })

    const { name, email, password, password_confirm } = formData

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
            [e.target.name]: e.target.value
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

    return (
        <Container fluid>
            <Row className="register-container">
                <Col md='6' as='section' className='head'>
                    <h1>Register <FaUserAlt /></h1>
                    <p>Create an account for Horizon Game Engine!</p>
                </Col>
                <Col md={5} as='form' onSubmit={onSubmit} className="submission-form-register">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Please Enter your name'
                        onChange={onChange}
                    />
                    <label for="email">Email</label>
                    <input
                        type="email"
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Please Enter your email'
                        onChange={onChange}
                    />
                    <label for="password">Password</label>
                    <input
                        type="password"
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Please create password'
                        onChange={onChange}
                    />
                    <label for="password_confirm">Confirm Password</label>
                    <input
                        type="password"
                        className='form-control'
                        id='password_confirm'
                        name='password_confirm'
                        value={password_confirm}
                        placeholder='Confirm Password'
                        onChange={onChange}
                    />
                    <button type='submit' className='submit-btn'>
                        Submit
                    </button>
                </Col>
            </Row>
        </Container>
    )
}

export default Register