import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearchParams } from 'react-router-dom';

import { resetPassword1 } from "../../features/auth/authSlice";
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
      dispatch(resetPassword1(data));
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
                        newpassword: '',
                        oldpassword: '',
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
                                        placeholder="Enter password"
                                        name="oldpassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.oldpassword}
                                    />
                                    {errors.oldpassword && touched.oldpassword ?
                                        <div className="error-message">
                                            {errors.oldpassword}
                                        </div> : null
                                    }
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Enter password"
                                        name="newpassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.newpassword}
                                    />
                                    {errors.newpassword && touched.newpassword ?
                                        <div className="error-message">
                                            {errors.newpassword}
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