import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import bootstrap from "bootstrap";
import * as Api from "../../features/APIs/api";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentProfile = JSON.parse(localStorage.getItem("profile"));
  const userName = JSON.parse(localStorage.getItem("userName"));

  const toUpdateProfile = () => {
    navigate("/updateProfile");
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const modelOpen = async () => {
    handleShow();
  };

  const resetPassword = async () => {
    const USerId = localStorage.getItem("userId");
    if (oldPassword && newPassword) {
      const [err, res] = await Api.resetPass(
        oldPassword,
        newPassword,
        // "637763d57d0a8e868cff774a"
        USerId
      );
      if (err) {
        console.log(err);
        if (err?.data === "Request failed with status code 400") {
          toast.error("Old password does not match");
        }else{
            toast.error("Something went wrong");
        }
      }
      handleClose();
      toast.info(res?.data?.message);
    }
  };

  return (
    <>
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src={currentProfile.avatar}
              />
              <span> </span>
            </div>
          </div>
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={currentProfile.firstName}
                    disabled="true"
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={currentProfile.lastName}
                    disabled="true"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="labels">Nick Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={userName}
                    disabled="true"
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    value={currentProfile.email}
                    disabled="true"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <button
                  class="btn btn-primary btn-lg btn-block"
                  type="button"
                  onClick={toUpdateProfile}
                >
                  Edit Profile
                </button>
                <button
                  class=" btn btn-primary btn-lg btn-block mt-2"
                  type="button"
                  onClick={onLogout}
                >
                  Log Out
                </button>
                <button
                  class=" btn btn-primary btn-lg btn-block mt-2"
                  type="button"
                  onClick={modelOpen}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              padding: "15px",
              height: "fix-layout",
              width: "fix-layout",
            }}
          >
            <input
              type="password"
              class="form-control"
              placeholder="Old Password"
              onChange={onChangeOldPassword}
            />
            <input
              type="password"
              class="form-control"
              placeholder="New Password"
              style={{ marginTop: "10px" }}
              onChange={onChangeNewPassword}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!oldPassword || !newPassword}
            onClick={resetPassword}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
