import React, {useState} from 'react'
import "./Profile.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Modal
} from 'react-bootstrap'
import * as Api from "../../features/APIs/api";
import { toast } from "react-toastify";


function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentProfile = JSON.parse(localStorage.getItem('profile'))
  const userName = JSON.parse(localStorage.getItem('userName'))
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
    const UserId = localStorage.getItem("userId");
    if (oldPassword && newPassword){
      const [err, res] = await Api.resetPass(
        oldPassword,
        newPassword,
        UserId
      )
      if (err) {
        console.log(err);
        if (err?.data === "Request failed with status code 400") {
          toast.error("Old Passwrod does not match");
        }
        else
        {
          toast.error("Something went wrong ")
        }
      }
      handleClose();
      toast.info(res?.data?.message)
    }
  }

  return (
    <>
            <Container className='py-5'>
                <Row>
                    <Col lg ="4">
                        <Card className='mb-4'>
                            <Card.Body className='text-center'>
                                <p className = 'text-muted mb-1'>{userName}</p>
                                <div className = 'd-flex justify-content-center mb-2'>
                                    <Button outline className="ms-1" onClick={toUpdateProfile}>Edit Profile</Button>
                                    <Button outline className="ms-1" onClick={onLogout}>Log Out</Button>
                                    <Button outline className="ms-1" onClick={modelOpen}>Reset Passwrod</Button>
                                </div>
                                <Modal show = {show} onHide = {handleClose}>
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
                        <Card className='mb-4 mb-lg-0'>
                            <Card.Body>
                                <ListGroup flush className = "p-0">
                                    <Card.Text>Following</Card.Text>
                                    <ListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg = "8">
                        <Card className = "mb-4">
                            <Card.Body>
                                <Row>
                                    <Col sm = "3">
                                        <Card.Text>Full Name</Card.Text>
                                    </Col>
                                    <Col sm = "9">
                                        <Card.Text className='text-muted'>{currentProfile.firstName +currentProfile.lastName}</Card.Text>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm = "3">
                                        <Card.Text>Email</Card.Text>
                                    </Col>
                                    <Col sm = "9">
                                        <Card.Text className='text-muted'>{currentProfile.email}</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Row>
                            <Col md = "6">
                                <Card className="mb-4 mb-md-0">
                                    <Card.Body>
                                        <Card.Text>Saved Posts</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md = "6">
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
    </>
  )
}

export default Profile