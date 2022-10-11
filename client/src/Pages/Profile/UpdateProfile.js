import React, { useState } from "react";
import "./UpdateProfile.css"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function UpdateProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>
                <span class="tracking-wide">Update Profile</span>
            </div>
            <div class="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">First Name</div>
                        <input type="text" class="px-4 py-2" placeholder="Enter the First Name" />

                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Last Name</div>
                        <input type="text" class="px-4 py-2" placeholder="Enter the Last Name" />
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Gender</div>

                        <select class="px-4 py-2 text-center">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Contact No.</div>
                        <input type="text" class="px-4 py-2" placeholder="Enter the Contact No." />
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Current Address</div>
                        <input type="text" class="px-4 py-2" placeholder="Enter the Current Address" />
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Permanant Address</div>
                        <input type="text" class="px-4 py-2" placeholder="Enter the Permanant Address" />
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Birthday</div>
                        <div class="text-center">
                            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                        </div>

                    </div>
                </div>
            </div>
            <button
                class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Commit</button>
        </div>


    )
}

export default UpdateProfile