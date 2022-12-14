import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearchParams } from 'react-router-dom';

import { resetPasswordFromEmail } from "../../features/auth/authSlice";
import "./Login.css";
import { Col, Container, Row } from "react-bootstrap";
import { userResetPasswordSchema } from '../../validation/userValidation'
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';

function ResetPassword() {

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, resetMsg, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {

    console.log(isSuccess);
    if (isError) {
      toast.error(resetMsg);
    }

    else if (isSuccess) {
      toast.success("Password reset successfully");
      setTimeout(function () {
        window.location.href = '/login';
      }, 1000);
    }
  }, [user, resetMsg, isError, isSuccess, message, navigate]);


  const onSubmit = (data) => {
  
      let token = searchParams.get('token');
      data["token"] = token;
      dispatch(resetPasswordFromEmail(data));
  }
  return (
    <Container className="login-container">
                <section className="head">
                    <h1>
                        Reset Password
                    </h1>
                    <p>Log into your Horizon Game Engine account!</p>
                </section>

                <Formik
                    initialValues={{
                        newPassword: '',
                        confirmPassword: '',
                    }}
                    validationSchema={userResetPasswordSchema}
                    onSubmit={onSubmit}
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
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Enter new password"
                                        name="newPassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.newPassword}
                                    />
                                    {errors.newPassword && touched.newPassword ?
                                        <div className="error-message">
                                            {errors.newPassword}
                                        </div> : null
                                    }
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Confirm your password"
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword ?
                                        <div className="error-message">
                                            {errors.confirmPassword}
                                        </div> : null
                                    }
                                </Form.Group>

                                <Button className='login-btn' type="submit">
                                    Submit
                                </Button>
                            </form>
                        )
                    }}
                </Formik>

            </Container>
  );
}

export default ResetPassword;