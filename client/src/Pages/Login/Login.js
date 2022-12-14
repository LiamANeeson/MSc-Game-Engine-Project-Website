import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login, reset } from "../../features/auth/authSlice";
import "./Login.css";

import { userSignInSchema } from "../../validation/userValidation";
import { Formik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

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
      localStorage.setItem("userId", user._id);
      navigate("/profile");
      window.location.reload(false);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const loginUser = (data) => {
    dispatch(login(data));
  };

  return (
    <>
      <Container className="login-container">
        <Row>
          <Col className="page-desc">
            <h1>
              <FaSignInAlt /> Login
            </h1>
          </Col>
        </Row>
        <Formik
          initialValues={{
            email: "",
            password: "",
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
            touched,
          }) => {
            return (
              <Form onSubmit={handleSubmit} className="submission-form">
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email ? (
                        <div className="error-message">{errors.email}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {errors.password && touched.password ? (
                        <div className="error-message">{errors.password}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button className="login-btn" type="submit">
                      Submit
                    </Button>
                    <a href="/forgot">
                      <p style={{ color: "blueviolet", cursor: "pointer" }}>
                        Forget password?
                      </p>
                    </a>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
}

export default Login;
