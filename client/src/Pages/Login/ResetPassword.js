import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearchParams } from 'react-router-dom';

import { resetPassword1 } from "../../features/auth/authSlice";
import "./Login.css";

function ResetPassword() {

  const [searchParams] = useSearchParams();


  const [formData, setFormData] = useState({
    oldpassword : "",
    newpassword : "",
  });

  const { oldpassword,newpassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user,resetMsg, isError, isSuccess,message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {


    if (isError) {
    toast.error(resetMsg);
    }
    
    else if (isSuccess) {
    toast.success("Password reset successfully");
    setTimeout(function(){
    window.location.href = '/login';
    },1000);
    }
    }, [user,resetMsg, isError, isSuccess,message,navigate]);
    
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let token = searchParams.get('token');
    const userData = {
      oldpassword ,
      newpassword,
      token
    };
  //  console.log(userData);
    dispatch(resetPassword1(userData));
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
        {
          isError? <p style={{ color:"red" }}>{resetMsg}</p> : ""
        }
          
          <label for="email">New Password</label>
          <input
            type="password"
            className="form-control"
            id="oldpassword"
            name="oldpassword"
            value={oldpassword}
            placeholder="Please Enter your new password"
            onChange={onChange}
          />
          <label for="email">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="newpassword"
            name="newpassword"
            value={newpassword}
            placeholder="Please confirm your new password"
            onChange={onChange}
          />
          <button type="submit" className="submit-btn">
            Reset Password
          </button>
        </form>
      </container>
    </>
  );
}

export default ResetPassword;
