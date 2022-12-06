import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgot, reset } from "../../features/auth/authSlice";
import "./Login.css";
import { Col, Container, Row } from "react-bootstrap";

function Forgot() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { forgotMsg, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || forgotMsg) {
      toast.success(forgotMsg.message);
      setTimeout(function () {
        window.location.href = '/login';
      }, 1000);

    }
  }, [forgotMsg, isError, isSuccess, message, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email
    };
    dispatch(forgot(userData));
  };
  return (
    <Container>
      <Row className="login-container">
        <Col md='6' as='section' className="head">
          <h1>
            Password Recovery
          </h1>
          <p>reciver your  Horizon Game Engine account password!</p>
        </Col>
        <Col md={6} as='form' onSubmit={onSubmit} className="submission-form">
          <label for="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Please Enter your email"
            onChange={onChange}
          />
          <button type="submit" className="submit-btn">
            Submit Email
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Forgot;
