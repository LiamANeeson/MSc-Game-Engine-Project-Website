import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";


function LogOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(logout());
        dispatch(reset());
        navigate("/");
        window.location.reload(false);

    });

}
export default LogOut;
