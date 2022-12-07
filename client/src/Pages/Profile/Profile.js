import React, { useState, useEffect } from "react";
import { getUserSavedQuestions, getCreatedQuestions, getFollowedQuestions } from "../../features/APIs/api";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset, resetPassword1 } from "../../features/auth/authSlice";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    ListGroup,
    ListGroupItem,
    Modal,
} from "react-bootstrap";
import * as Api from "../../features/APIs/api";
import { toast } from "react-toastify";


function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentProfile = JSON.parse(localStorage.getItem("profile"));
    const userName = JSON.parse(localStorage.getItem("userName"));
    const email = JSON.parse(localStorage.getItem("email"));

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [followedPosts, setFollowedPosts] = useState([]);
    const [yourPosts, setYourPosts] = useState([]);

    useEffect(() => {
        getFollowedQuestions()
            .then(normalisedResponse => {
                const followedQuestionsResponse = (
                    (normalisedResponse[1] !== null && normalisedResponse[1].data.followedQuestions !== 'undefined')
                        ? normalisedResponse[1].data.followedQuestions
                        : []
                )
                setFollowedPosts(followedQuestionsResponse)
            })
            .catch(err => {
                console.log(err)
            })
    }, [setFollowedPosts])

    useEffect(() => {
        getCreatedQuestions()
            .then(normalisedResponse => {
                const userQuestionsResponse = (
                    (normalisedResponse[1] !== null && normalisedResponse[1].data.createdQuestions !== 'undefined')
                        ? normalisedResponse[1].data.createdQuestions
                        : []
                )
                setYourPosts(userQuestionsResponse)
            })
            .catch(err => {
                console.log(err)
            })
    }, [setYourPosts])

    const onChangeOldPassword = (e) => {
        setOldPassword(e.target.value);
    };

    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        const token = localStorage.getItem("authToken");
        const userData = {
            token,
            oldPassword,
            newPassword
        };

        if (oldPassword && newPassword) {
            dispatch(resetPassword1(userData)).then((res) => {

                if (res.payload.user) {
                    toast.success("Password changed successfully");
                } else {
                    toast.error('Old Password does not match')
                }

                handleClose();

            });
        }
    };

    return (
        <>
            <Container className="py-5">
                <Row>
                    <Col lg="4">
                        <Card className="mb-4">
                            <Card.Body className="text-center">
                                <img
                                    class="rounded-circle mt-5"
                                    width="150px"
                                    src={currentProfile.avatar}
                                />
                                <p className="text-muted mb-1">{userName}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <Button className = "profile-btn" onClick={toUpdateProfile}>
                                        Edit Profile
                                    </Button>
                                    <Button className = "profile-btn" onClick={onLogout}>
                                        Log Out
                                    </Button>
                                    <Button className = "profile-btn" onClick={modelOpen}>
                                        Reset Password
                                    </Button>
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
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="8">
                        <Card className="mb-4">
                            <Card.Body>
                                <Row>
                                    <Col sm="3">
                                        <Card.Text style = {{fontWeight: "600"}}>Full Name</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {currentProfile.firstName + currentProfile.lastName}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text style = {{fontWeight: "600"}}>Email</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {currentProfile.email}
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Row>
                            <Col md="6">
                                <Card className="mb-4 mb-md-0">
                                    <Card.Body>
                                        <Card.Text className="profile-title">Followed Posts</Card.Text>
                                        {
                                            followedPosts && (followedPosts.length > 0) ? followedPosts.map(question => (
                                                <Card.Text key={question.name}>
                                                    <Link to={`/question/${question._id}`}>{question.name}</Link>
                                                </Card.Text>
                                            )) : <Card.Text className="text-muted">None to display, yet!</Card.Text>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="6">
                                <Card className="mb-4 mb-md-0">
                                    <Card.Body>
                                        <Card.Text className="profile-title">Your Posts</Card.Text>
                                        {
                                            yourPosts && (yourPosts.length > 0) ? yourPosts.map(question => (
                                                <Card.Text key={question.name}>
                                                    <Link to={`/question/${question._id}`}>{question.name}</Link>
                                                </Card.Text>
                                            )) : <Card.Text className="text-muted">None to display, yet!</Card.Text>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Profile;
