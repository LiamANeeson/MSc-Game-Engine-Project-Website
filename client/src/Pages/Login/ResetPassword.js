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


  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
  });

  const { oldpassword, newpassword } = formData;

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (data) => {
  
      let token = searchParams.get('token');
      data["token"] = token;
      dispatch(resetPasswordFromEmail(data));
  }
  return (
    <container className="login-container">
                <section className="head">
                    <h1>
                        Reset Password
                    </h1>
                    <p>Log into your Horizon Game Engine account!</p>
                </section>

                <Formik
                    initialValues={{
                        newPassword: '',
                        conFirmPassword: '',
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
                                        name="conFirmPassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.conFirmPassword}
                                    />
                                    {errors.conFirmPassword && touched.conFirmPassword ?
                                        <div className="error-message">
                                            {errors.conFirmPassword}
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
  );
}

export default ResetPassword;