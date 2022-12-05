import React, { useState } from "react";
import "./UpdateProfile.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

import { updateProfile, uploadFile } from '../../features/auth/authSlice'

import { profileSchema } from '../../validation/profileValidation'
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';

function UpdateProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentProfile = JSON.parse(localStorage.getItem('profile'))

    const [file, setFile] = useState()
    const [displayImg, setDisplayImg] = useState(currentProfile.avatar)
    const fileUpload = React.createRef()

    const chooseFile = (e) => {
        fileUpload.current.click()
    }

    const handleChange = (e) => {
        setDisplayImg(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const [formData, setFormData] = useState({
        email: currentProfile.email,
        avatar: currentProfile.avatar,
    })

    const {
        email,
        avatar,
    } = formData


    const updateUserProfile = (e) => {

        const fileData = new FormData();
        fileData.append("file", file);
        fileData.append("upload_preset", "Game-Engine-Project-Website");
        let avatarPath;

        dispatch(uploadFile(fileData)).then((res) => {

            if (!res.payload.secure_url) {
                avatarPath = avatar
            } else {
                avatarPath = res.payload.secure_url;
            }

            const profileData = {
                email,
                firstName: e.firstName,
                lastName: e.lastName,
                avatar: avatarPath,
                userName: e.userName
            }



            dispatch(updateProfile(profileData)).then((res) => {

                if (res.payload.profile) {
                    toast.success("Update profile successfully");
                    navigate('/profile')
                } else {
                    toast.error('Failure to update profile')
                }

            })
        })




    }

    return (

        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img class="rounded-circle mt-5" width="150px" src={displayImg} />
                        <button class="btn btn-info btn-sm mt-2" onClick={chooseFile}>Change  profile photo</button>
                        <input class="text-center" type="file" onChange={handleChange} ref={fileUpload} hidden />
                    </div>
                </div>

                <div class="col-md-5 border-right">
                    <Formik
                        initialValues={{
                            email: currentProfile.email,
                            firstName: currentProfile.firstName,
                            lastName: currentProfile.lastName,
                            userName: JSON.parse(localStorage.getItem('userName'))
                        }}
                        validationSchema={profileSchema}
                        onSubmit={updateUserProfile}
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
                                <form onSubmit={handleSubmit} >
                                    <div class="p-3 py-5">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h4 class="text-right">Profile Setting</h4>
                                        </div>
                                        <div class="row mt-2">
                                            <Form.Group class="col-md-6">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder="Enter first name"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.firstName}
                                                />
                                                {errors.firstName && touched.firstName ?
                                                    <div className="error-message">
                                                        {errors.firstName}
                                                    </div> : null
                                                }
                                            </Form.Group>

                                            <Form.Group class="col-md-6">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder="Enter last name"
                                                    name="lastName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lastName}
                                                />
                                                {errors.lastName && touched.lastName ?
                                                    <div className="error-message">
                                                        {errors.lastName}
                                                    </div> : null
                                                }
                                            </Form.Group>
                                        </div>

                                        <Form.Group class="col-md-12">
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control type="text"
                                                placeholder="Enter user name"
                                                name="userName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.userName}
                                            />
                                            {errors.userName && touched.userName ?
                                                <div className="error-message">
                                                    {errors.userName}
                                                </div> : null
                                            }
                                        </Form.Group>
                                        <div class="mt-5 text-center">
                                            <Button className='btn btn-primary btn-lg' type="submit">
                                                Save Profile
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            )
                        }}
                    </Formik>
                </div>

            </div>

        </div>


    )
}

export default UpdateProfile