import React from 'react'
import "./Profile.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import bootstrap from 'bootstrap'




function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentProfile = JSON.parse(localStorage.getItem('profile'))
    const userName = JSON.parse(localStorage.getItem('userName'))


    const birthday = currentProfile.birthday.slice(0, 10)

    const toUpdateProfile = () => {
        navigate('/updateProfile')
    }

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src={currentProfile.avatar} /><span> </span></div>
                </div>
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Profile</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6"><label class="labels">First Name</label><input type="text" class="form-control" value={currentProfile.firstName} disabled="true" /></div>
                            <div class="col-md-6"><label class="labels">Last Name</label><input type="text" class="form-control" value={currentProfile.lastName} disabled="true" /></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">Nick Name</label><input type="text" class="form-control" value={userName} disabled="true" /></div>
                            <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" value={currentProfile.contactNumber} disabled="true" /></div>
                            <div class="col-md-12"><label class="labels">Gender</label><input type="text" class="form-control" value={currentProfile.gender} disabled="true" /></div>
                            <div class="col-md-12"><label class="labels">Current Address</label><input type="text" class="form-control" value={currentProfile.currentAddress} disabled="true" /></div>
                            <div class="col-md-12"><label class="labels">Permanent Address</label><input type="text" class="form-control" value={currentProfile.permanentAddress} disabled="true" /></div>
                            <div class="col-md-12"><label class="labels">Birthday</label><input type="text" class="form-control" value={birthday} disabled="true" /></div>
                            <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" value={currentProfile.email} disabled="true" /></div>
                        </div>
                        <div class="row mt-3">
                                <button class="btn btn-primary btn-lg btn-block" type="button" onClick={toUpdateProfile}>Edit Profile</button>
                                <button class=" btn btn-primary btn-lg btn-block mt-2" type="button" onClick={onLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile