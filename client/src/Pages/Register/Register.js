import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserAlt } from 'react-icons/fa'
import { userSignUpSchema } from '../../validation/userValidation'
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';

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
            window.location.reload(false);
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

    const registerUser = (data) => {
        dispatch(register(data))

    }

    return (
        <Container fluid>
            <Row className="register-container">
                <Col md='6' as='section' className='head'>
                    <h1>Register <FaUserAlt /></h1>
                    <p>Create an account for Horizon Game Engine!</p>

                </section>


                <Formik
                    initialValues={{
                        userName: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        password_confirm: ''
                    }}
                    validationSchema={userSignUpSchema}
                    onSubmit={registerUser}
                >
                    {({
                        values,
                        errors,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        touched
                    }) => {
                        return (
                            <form onSubmit={handleSubmit} className="submission-form-register">
                                <Form.Group>
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter user name"
                                        name="userName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.userName}
                                    />
                                    {errors.userName && touched.userName ?
                                        <div className="error-message">
                                            {errors.userName}
                                        </div> : null
                                    }
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                    />
                                    {errors.firstName && touched.firstName ?
                                        <div className="error-message">
                                            {errors.firstName}
                                        </div> : null
                                    }
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                    />
                                    {errors.lastName && touched.lastName ?
                                        <div className="error-message">
                                            {errors.lastName}
                                        </div> : null
                                    }
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email ?
                                        <div className="error-message">
                                            {errors.email}
                                        </div> : null
                                    }
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    {errors.password && touched.password ?
                                        <div className="error-message">
                                            {errors.password}
                                        </div> : null
                                    }
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Re-enter password"
                                        name="password_confirm"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password_confirm}
                                    />
                                    {errors.password_confirm && touched.password_confirm ?
                                        <div className="error-message">
                                            {errors.password_confirm}
                                        </div> : null
                                    }
                                </Form.Group>
                                <Button className='submit-btn' type="submit">
                                    Submit
                                </Button>
                            </form>
                        )
                    }}
                </Formik>
            </container>
        </>
    )
}

export default Register