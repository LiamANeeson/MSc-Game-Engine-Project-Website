import React, { useState, useEffect } from "react";
import { getCreatedQuestions, getFollowedQuestions } from "../../features/APIs/api";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset, resetPassword1 } from "../../features/auth/authSlice";
import { userResetPasswordSchema } from '../../validation/userValidation'
import { Formik } from 'formik';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    ListGroup,
    ListGroupItem,
    Modal,
    Form,
} from "react-bootstrap";
import * as Api from "../../features/APIs/api";
import { toast } from "react-toastify";
import Search from "../Community/Search/Search";
import Pagination from "../Community/Pagination/Pagination";


function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentProfile = JSON.parse(localStorage.getItem("profile"));
    const userName = JSON.parse(localStorage.getItem("userName"));
    const [createdPostSearch, setCreatedPostSearch] = useState("");
    const [createdPostpage, setCreatedPostPage] = useState(1);
    const [followedPostLimit, setFollowedLimit] = useState(0);
    const [createdPostLimit, setCreatedLimit] = useState(0);
    const [createdPostTotal, setCreatedPostTotal] = useState();
    const [followedPostSearch, setFollowedPostSearch] = useState("");
    const [followedPostpage, setFollowedPostPage] = useState(1);
    const [followedPostTotal, setFollowedPostTotal] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const [matchPassword, setMatchPassword] = useState(true);

    const [followedPosts, setFollowedPosts] = useState([]);
    const [showFollowedPosts, setShowFollowedPosts] = useState([]);
    const [followedPostsLength, setFollowedPostsLength] = useState();
    const [yourPosts, setYourPosts] = useState([]);
    const [showYourPosts, setShowYourPosts] = useState([]);
    const [yourPostsLength, setYourPostsLength] = useState();

    useEffect(() => {
        setShowLoading(true)
        getFollowedQuestions(followedPostLimit, followedPostpage, followedPostSearch)
            .then(normalisedResponse => {
                const followedQuestionsResponse = (
                    (normalisedResponse[1] !== null && normalisedResponse[1].data.followedQuestions !== 'undefined')
                        ? normalisedResponse[1].data.followedQuestions
                        : []
                )
                setFollowedPostsLength(normalisedResponse[1].data.allFollowedQuestions.length)
                setShowFollowedPosts(normalisedResponse[1].data.allFollowedQuestions.slice(0, 5))
                setFollowedPosts(followedQuestionsResponse.slice(0, 5))
                setFollowedPostPage(normalisedResponse[1].data.page)
                setFollowedPostTotal(normalisedResponse[1].data.total)
                setFollowedLimit(normalisedResponse[1].data.limit)
                setShowLoading(false)
            })
            .catch(err => {
                console.log(err)
                setShowLoading(false)
            })
    }, [followedPostpage, followedPostSearch, followedPostTotal, followedPostLimit])

    useEffect(() => {
        setShowLoading(true)
        getCreatedQuestions(createdPostLimit, createdPostpage, createdPostSearch)
            .then(normalisedResponse => {
                const userQuestionsResponse = (
                    (normalisedResponse[1] !== null && normalisedResponse[1].data.createdQuestions !== 'undefined')
                        ? normalisedResponse[1].data.createdQuestions
                        : []
                )

                setYourPostsLength(normalisedResponse[1].data.allCreatedQuestions.length)
                setShowYourPosts(normalisedResponse[1].data.allCreatedQuestions.slice(0, 5))
                setYourPosts(userQuestionsResponse.slice(0, 5))
                setCreatedPostPage(normalisedResponse[1].data.page)
                setCreatedPostTotal(normalisedResponse[1].data.total)
                setCreatedLimit(normalisedResponse[1].data.limit)
                setShowLoading(false)
            })
            .catch(err => {
                console.log(err)
                setShowLoading(false)
            })
    }, [createdPostpage, createdPostSearch, createdPostTotal, createdPostLimit])


    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); setMatchPassword(true) }
    const handleShow = () => setShow(true);

    const [showAllYourPosts, setShowAllYourPosts] = useState(false);
    const closeShowAllYourPosts = () => { setShowAllYourPosts(false); setCreatedPostSearch("") };

    const [showAllFollowedPosts, setShowAllFollowedPosts] = useState(false);
    const closeShowAllFollowedPosts = () => { setShowAllFollowedPosts(false); setFollowedPostSearch("") };

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

    const resetPassword = (data) => {
        const token = localStorage.getItem("authToken");
        const userData = {
            token,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        };

        if (data.oldPassword && data.newPassword) {
            dispatch(resetPassword1(userData)).then((res) => {

                if (res.payload.user) {
                    toast.success("Password changed successfully");
                    setMatchPassword(true);
                    handleClose();
                } else {
                    setMatchPassword(false);
                }

            });
        }
    };

    const unfollowQuestion = async (id) => {
        const [unfollowErr, unfollowRes] = await Api.unfollowQuestion(id);
        if (unfollowErr) {
            toast.error("Something went wrong!");
        }
        if (unfollowRes) {
            toast.success("unfollowed!");
            window.location.reload(false);
            
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
                                    <Button className="profile-btn" onClick={toUpdateProfile}>
                                        Edit Profile
                                    </Button>
                                    <Button className="profile-btn" onClick={onLogout}>
                                        Log Out
                                    </Button>
                                    <Button className="profile-btn" onClick={modelOpen}>
                                        Reset Password
                                    </Button>
                                </div>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Reset Password</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <Formik
                                            initialValues={{
                                                oldPassword: '',
                                                newPassword: '',
                                            }}
                                            validationSchema={userResetPasswordSchema}
                                            onSubmit={resetPassword}
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
                                                            <Form.Label>Old Password</Form.Label>
                                                            <Form.Control type="password"
                                                                placeholder="Enter old password"
                                                                name="oldPassword"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.oldPassword}
                                                            />
                                                            {errors.oldPassword && touched.oldPassword ?
                                                                <div className="error-message">
                                                                    {errors.oldPassword}
                                                                </div> : null
                                                            }
                                                        </Form.Group>

                                                        <Form.Group>
                                                            <Form.Label>New Password</Form.Label>
                                                            <Form.Control type="password"
                                                                placeholder="Enter new password"
                                                                name="newPassword"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.newPassword}
                                                            />
                                                            {errors.newPassword && touched.newPassword ?
                                                                <div className="error-message">
                                                                    {errors.newPassword}
                                                                </div> : null
                                                            }
                                                            {values.oldPassword == values.newPassword && values.newPassword ?
                                                                <div className="error-message">
                                                                    Old password and new password cannot be the same
                                                                </div> : null
                                                            }
                                                            {!matchPassword ?
                                                                <div className="error-message">
                                                                    Old password does not match
                                                                </div> : null
                                                            }
                                                        </Form.Group>

                                                        <Button className="mt-2" variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <Button
                                                            className="reset_pwd"
                                                            variant="primary"
                                                            disabled={!values.oldPassword || !values.newPassword}
                                                            type="submit"
                                                        >
                                                            Save Changes
                                                        </Button>
                                                        
                                                    </form>
                                                )
                                            }}
                                        </Formik>
                                    </Modal.Body>
                                </Modal>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="8">
                        <Card className="mb-4">
                            <Card.Body>
                                <Row>
                                    <Col sm="3">
                                        <Card.Text style={{ fontWeight: "600" }}>Full Name</Card.Text>
                                    </Col>
                                    <Col sm="9">
                                        <Card.Text className="text-muted">
                                            {currentProfile.firstName + " " + currentProfile.lastName}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="3">
                                        <Card.Text style={{ fontWeight: "600" }}>Email</Card.Text>
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
                                            showFollowedPosts && (followedPosts.length > 0) ? showFollowedPosts.map(question => (
                                                <Card.Text key={question.name} className="post-link">
                                                    <button className="post-button float-end" onClick={
                                                        () => {
                                                            unfollowQuestion(question._id)
                                                        }}>Unfollow</button>
                                                    <Link to={`/question/${question._id}`}>{question.name}</Link>
                                                </Card.Text>

                                            )) : <Card.Text className="text-muted">None to display, yet!</Card.Text>
                                        }
                                        {followedPostsLength > 5 ? <div className="text-center"><button className="viewAll-button"
                                            onClick={() => {
                                             
                                                setShowAllFollowedPosts(true)
                                               
                                            }}
                                        >View all</button></div> : []}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="6">
                                <Card className="mb-4 mb-md-0">
                                    <Card.Body>
                                        <Card.Text className="profile-title">Your Posts</Card.Text>
                                        {
                                            showYourPosts && (showYourPosts.length > 0) ? showYourPosts.map(question => (
                                                <Card.Text key={question.name} className="post-link">
                                                    <Link to={`/question/${question._id}`}>{question.name}</Link>
                                                </Card.Text>
                                            )) : <Card.Text className="text-muted">None to display, yet!</Card.Text>
                                        }
                                        {yourPostsLength > 5 ? <div className="text-center"><button className="viewAll-button"
                                            onClick={() => {
                                                
                                                setShowAllYourPosts(true)
                                            }}
                                        >View all</button></div> : []}

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Modal show={showAllYourPosts} onHide={closeShowAllYourPosts}>
                    {showLoading ? <div className="loadingDiv"></div> : ""}
                    <Modal.Header closeButton>
                        <Modal.Title>Your Posts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Search setSearch={(createdPostSearch) => setCreatedPostSearch(createdPostSearch)} />
                        <Card className="mb-4 mb-md-0">
                            <Card.Body>
                                {
                                    yourPosts && (yourPosts.length > 0) ? yourPosts.map(question => (
                                        <Card.Text key={question.name} className="post-link">
                                            <Link to={`/question/${question._id}`}>{question.name}</Link>
                                        </Card.Text>
                                    )) : <Card.Text className="text-muted">No posts found</Card.Text>
                                }
                            </Card.Body>
                        </Card>
                        <Pagination
                            page={createdPostpage}
                            limit={createdPostLimit ? createdPostLimit : 5}
                            total={createdPostTotal ? createdPostTotal : 0}
                            setPage={(createdPostpage) => setCreatedPostPage(createdPostpage)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeShowAllYourPosts}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showAllFollowedPosts} onHide={closeShowAllFollowedPosts}>
                    {showLoading ? <div className="loadingDiv"></div> : ""}
                    <Modal.Header closeButton>
                        <Modal.Title>Followed Posts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Search setSearch={(followedPostSearch) => setFollowedPostSearch(followedPostSearch)} />
                        <Card className="mb-4 mb-md-0">
                            <Card.Body>
                                {
                                    followedPosts && (followedPosts.length > 0) ? followedPosts.map(question => (
                                        <Card.Text key={question.name} className="post-link">
                                            <button className="post-button float-end" onClick={
                                                () => {
                                                    unfollowQuestion(question._id)
                                                }}>Unfollow</button>
                                            <Link to={`/question/${question._id}`}>{question.name}</Link>
                                        </Card.Text>
                                    )) : <Card.Text className="text-muted">No posts found</Card.Text>
                                }
                            </Card.Body>
                            
                        </Card>
                        <Pagination
                            page={followedPostpage}
                            limit={followedPostLimit ? followedPostLimit : 5}
                            total={followedPostTotal ? followedPostTotal : 0}
                            setPage={(followedPostpage) => setFollowedPostPage(followedPostpage)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeShowAllFollowedPosts}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default Profile;
