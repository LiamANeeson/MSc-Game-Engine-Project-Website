import React from 'react'
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
    ListGroupItem
} from 'react-bootstrap'

function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentProfile = JSON.parse(localStorage.getItem('profile'))
    const userName = JSON.parse(localStorage.getItem('userName'))
    const email = JSON.parse(localStorage.getItem('email'))


    const toUpdateProfile = () => {
        navigate('/updateProfile')
    }

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <section>
            <Container className='py-5'>
                <Row>
                    <Col lg ="4">
                        <Card className='mb-4'>
                            <Card.Body className='text-center'>
                                <p className = 'text-muted mb-1'>{userName}</p>
                                <div className = 'd-flex justify-content-center mb-2'>
                                    <Button outline className="ms-1" onClick={toUpdateProfile}>Edit Profile</Button>
                                    <Button outline className="ms-1" onClick={onLogout}>Log Out</Button>
                                </div>
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
        </section>        
    )
}

export default Profile