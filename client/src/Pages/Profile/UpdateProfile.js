﻿import React, { useState, useRef } from "react";
import "./UpdateProfile.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { updateProfile, uploadFile } from '../../features/auth/authSlice'

function UpdateProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentProfile = JSON.parse(localStorage.getItem('profile'))
    const [startDate, setStartDate] = useState(new Date(currentProfile.birthday))

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
        firstName: currentProfile.firstName,
        lastName: currentProfile.lastName,
        gender: currentProfile.gender,
        contactNumber: currentProfile.contactNumber,
        currentAddress: currentProfile.currentAddress,
        permanentAddress: currentProfile.permanentAddress,
        avatar: currentProfile.avatar
    })

    const {
        email,
        firstName,
        lastName,
        gender,
        contactNumber,
        currentAddress,
        permanentAddress,
        avatar } = formData

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const onSubmit = (e) => {
        e.preventDefault()

        const fileData = new FormData();
        fileData.append("file", file);
        let avatarPath;

        dispatch(uploadFile(fileData)).then((res) => {

            if (!res.payload.fileName) {
                avatarPath = avatar
            } else {
                avatarPath = "http://localhost:5000/uploads/" + res.payload.fileName;
            }

            const profileData = {
                email,
                firstName,
                lastName,
                gender,
                contactNumber,
                currentAddress,
                birthday: startDate,
                permanentAddress,
                avatar: avatarPath
            }



            dispatch(updateProfile(profileData)).then((res) => {

                if (res.payload.profile) {
                    alert('Update profile successfully')
                    navigate('/profile')
                } else {
                    alert('Failure to update profile')
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
                    <form onSubmit={onSubmit}>
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Profile Setting</h4>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-6"><label class="labels">Name</label><input type="text" id='firstName' name='firstName' class="form-control" value={firstName} onChange={onChange} placeholder="first name" /></div>
                                <div class="col-md-6"><label class="labels">Last name</label><input type="text" id='lastName' name='lastName' class="form-control" value={lastName} placeholder="last name" onChange={onChange} /></div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" id='contactNumber' name='contactNumber' class="form-control" placeholder="enter phone number" value={contactNumber} onChange={onChange} /></div>
                                <div class="col-md-12"><label class="labels">Gender</label>
                                    <input type="radio" name="gender" id="gender1"
                                        value='Male' onChange={onChange} checked={gender === 'Male'} /> Male
                                    <input type="radio" name="gender" id="gender2"
                                        value='Female' onChange={onChange} checked={gender === 'Female'} /> Female
                                </div>
                                <div class="col-md-12"><label class="labels">Current Address</label><input type="text" id='currentAddress' name='currentAddress' class="form-control" placeholder="enter current address" value={currentAddress} onChange={onChange} /></div>
                                <div class="col-md-12"><label class="labels">Permanant Address</label><input type="text" id='permanentAddress' name='permanentAddress' class="form-control" placeholder="enter permanant address" value={permanentAddress} onChange={onChange} /></div>
                                <div class="col-md-12"><label class="labels">Birthday</label>
                                    <DatePicker dateFormat="yyyy-MM-dd" selected={startDate} onChange={(date) => setStartDate(date)} filterDate={d => {
                                        return new Date() > d;
                                    }} />
                                </div>
                            </div>

                            <div class="mt-5 text-center"><button class="btn btn-primary btn-lg" type="submit">Save Profile</button></div>
                        </div>
                    </form>
                </div>

            </div>

        </div>


    )
}

export default UpdateProfile