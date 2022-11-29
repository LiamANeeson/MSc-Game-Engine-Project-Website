import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgot, reset } from "../../features/auth/authSlice";
import "./Login.css";

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
       setTimeout(function(){
            window.location.href = '/login';
      },1000);

    }
  }, [forgotMsg, isError, isSuccess,message,navigate]);

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
    <>
      <container className="login-container">
        <section className="head">
          <h1>
            Login <FaSignInAlt />
          </h1>
          <p>Log into your Horizon Game Engine account!</p>
        </section>
        <form onSubmit={onSubmit} className="submission-form">
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
        </form>
      </container>
    </>
  );
}

export default Forgot;
