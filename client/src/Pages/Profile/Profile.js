import React, { useState } from "react";
import "./Profile.css"
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
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
import bootstrap from "bootstrap";
import * as Api from "../../features/APIs/api";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";


function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const email = JSON.parse(localStorage.getItem('email'))

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
        window.location.reload(false);
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
                    <Container className='py-5'>
                        <Row>
                            <Col lg="4">
                                <Card className='mb-4'>
                                    <Card.Body className='text-center'>
                                        <p className='text-muted mb-1'>{userName}</p>
                                        <div className='d-flex justify-content-center mb-2'>
                                            <Button outline className="ms-1" onClick={toUpdateProfile}>Edit Profile</Button>
                                            <Button outline className="ms-1" onClick={onLogout}>Log Out</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <Card className='mb-4 mb-lg-0'>
                                    <Card.Body>
                                        <ListGroup flush className="p-0">
                                            <Card.Text>Following</Card.Text>
                                            <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg="8">
                                <Card className="mb-4">
                                    <Card.Body>
                                        <Row>
                                            <Col sm="3">
                                                <Card.Text>Full Name</Card.Text>
                                            </Col>
                                            <Col sm="9">
                                                <Card.Text className='text-muted'>{currentProfile.firstName + currentProfile.lastName}</Card.Text>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col sm="3">
                                                <Card.Text>Email</Card.Text>
                                            </Col>
                                            <Col sm="9">
                                                <Card.Text className='text-muted'>{currentProfile.email}</Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Row>
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
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
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