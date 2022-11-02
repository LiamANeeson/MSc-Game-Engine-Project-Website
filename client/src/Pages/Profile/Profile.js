import React from 'react'
import "./Profile.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import {
    Container,
    Row,
    Card,
    Button
} from 'react-bootstrap'

function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentProfile = JSON.parse(localStorage.getItem('profile'))
    const userName = JSON.parse(localStorage.getItem('userName'))


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
                    <Card className='mb-4'>
                        <Card.Body className='text-center'>
                            <Card.Img
                                src = " "
                                alt = "avatar"
                                className = "rounded-circle"
                                style={{ width: '150px' }}
                                fluid
                            />
                            <p className = 'text-muted mb-1'>Full Stack Developer</p>
                            <p className = 'text-muted mb-4'>Dublin, Ireland</p>
                            <div className = 'd-flex justify-content-center mb-2'>
                                <Button>Follow</Button>
                                <Button outline className="ms-1">Message</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </section>        
    )
}

export default Profile