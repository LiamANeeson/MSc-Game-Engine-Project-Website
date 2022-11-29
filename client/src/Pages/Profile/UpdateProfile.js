import React, { useState } from "react";
import "./UpdateProfile.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

import { updateProfile, uploadFile } from '../../features/auth/authSlice'

function UpdateProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentProfile = JSON.parse(localStorage.getItem('profile'))
    const userName = JSON.parse(localStorage.getItem('userName'))

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
        avatar: currentProfile.avatar,
        nickName: userName
    })

    const {
        email,
        firstName,
        lastName,
        avatar,
        nickName, } = formData

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
                avatarPath = "uploads/" + res.payload.fileName;
            }

            const profileData = {
                email,
                firstName,
                lastName,
                avatar: avatarPath,
                nickName
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
                    <form onSubmit={onSubmit}>
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Profile Setting</h4>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-6"><label class="labels">Name</label><input type="text" id='firstName' name='firstName' class="form-control" value={firstName} onChange={onChange} placeholder="first name" /></div>
                                <div class="col-md-6"><label class="labels">Last name</label><input type="text" id='lastName' name='lastName' class="form-control" value={lastName} placeholder="last name" onChange={onChange} /></div>
                            </div>
                            <div class="col-md-12"><label class="labels">Nick Name</label><input type="text" id='nickName' name='nickName' class="form-control" placeholder="nickName" value={nickName} onChange={onChange} /></div>
                            <div class="mt-5 text-center"><button class="btn btn-primary btn-lg" type="submit">Save Profile</button></div>
                        </div>
                    </form>
                </div>

            </div>

        </div>


    )
}

export default UpdateProfile