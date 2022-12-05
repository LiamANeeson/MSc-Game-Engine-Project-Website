import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login, reset } from "../../features/auth/authSlice";
import "./Login.css";

import { userSignInSchema } from '../../validation/userValidation'
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            console.log(user, "user______________profile");
            localStorage.setItem("userId", user._id)
            navigate("/profile");
            window.location.reload(false);
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const loginUser = (data) => {
        dispatch(login(data))
    };


    return (
        <>
            <container className="login-container">
                <section className="head">
                    <h1>
                        Login <FaSignInAlt />
                    </h1>
                    <p>Log into your Horizon Game Engine account!</p>
                </section>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={userSignInSchema}
                    onSubmit={loginUser}
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
                            <form onSubmit={handleSubmit} className="submission-form">
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

                                <Button className='submit-btn' type="submit">
                                    Submit
                                </Button>
                            </form>
                        )
                    }}
                </Formik>

            </container>
        </>
    );
}

export default Login;
