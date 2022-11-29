import React, { useState } from "react";
import "./Profile.css"
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap'
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
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

    const modelOpen = async () => {
        handleShow();
    };

    const resetPassword = async () => {
        const USerId = localStorage.getItem("userId");
        if (oldPassword && newPassword) {
            const [err, res] = await Api.resetPass(
                oldPassword,
                newPassword,
                USerId
            );
            if (err) {
                console.log(err);
                if (err?.data === "Request failed with status code 400") {
                    toast.error("Old password does not match");
                } else {
                    toast.error("Something went wrong");
                }
            }
            handleClose();
            toast.info(res?.data?.message);
        }
    }
    return (
        <>
            <section>
                <Container className='py-5  h-100' >
                    <div class="row d-flex justify-content-center align-items-center h-100">

                        <div className="ms-4  d-flex flex-column  col-md-3  " >
                            <div className='d-flex justify-content-center mt-2'>
                                <img
                                    class="rounded-circle d-flex justify-content-cente"
                                    width="150px"
                                    src={currentProfile.avatar}
                                />
                            </div>
                            <div className='d-flex justify-content-center mt-2'>
                                <Button outline className="d-flex justify-content-center mb-2" onClick={toUpdateProfile}>Edit Profile</Button>
                            </div>
                        </div>
                        <div class="text-muted mt-4 justify-content-cente col-md-3">
                            
                                <div className="text-center py-1">
                                    <Card.Text>{currentProfile.firstName + currentProfile.lastName}</Card.Text>
                                    <Card.Text>{currentProfile.email}</Card.Text>
                                </div>
                            <div className="p-4 text-black ">
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <p className="mb-1 h5">253</p>
                                        <p className="small text-muted mb-0">Posts</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="mb-1 h5">1026</p>
                                        <p className="small text-muted mb-0">Followers</p>
                                    </div>
                                    <div>
                                        <p className="mb-1 h5">478</p>
                                        <p className="small text-muted mb-0">Following</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <Col md="6">
                            <Card className="mb-4 mb-md-0">
                                <Card.Body>
                                    <Card.Text>Saved Posts</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card className="mb-4 mb-md-0">
                                <Card.Body>
                                    <Card.Text>Your Posts</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                    <div class="row d-flex justify-content-center align-items-center h-100">

                      
                    </div>
                    <div class="row d-flex justify-content-center align-items-center h-100">


                    </div>
                </Container>
            </section>

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