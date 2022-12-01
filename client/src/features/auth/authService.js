import axios from 'axios'

const API_URL = '/api/users/'

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('userName', JSON.stringify(response.data.name))
        localStorage.setItem('profile', JSON.stringify(response.data.profile))
        localStorage.setItem('authToken', response.data.token)
    }
    return response.data
}

const forgot = async (userData) => {

    const response = await axios.post(API_URL + 'forget-password', userData)
    if (response.data) {
        console.log(response.data);
        localStorage.removeItem('user')
        localStorage.removeItem('profile')
        // localStorage.setItem('userName', JSON.stringify(response.data.name))
        // localStorage.setItem('authToken', response.data.token)
        // localStorage.setItem('profile', JSON.stringify(response.data.profile))
    }
    else {
        console.log("Login Unsuccessful")
    }

    return response.data
}
const resetPassword = async (userData) => {

    const response = await axios.post(API_URL + 'reset-password', userData)
    if (response.data) {
        console.log(response.data);
        localStorage.removeItem('user')
        localStorage.removeItem('profile')
        // localStorage.setItem('userName', JSON.stringify(response.data.name))
        // localStorage.setItem('authToken', response.data.token)
        // localStorage.setItem('profile', JSON.stringify(response.data.profile))
    }
    else {
        console.log("Login Unsuccessful")
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if (response.data) {
        localStorage.setItem('userName', JSON.stringify(response.data.name))
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('profile', JSON.stringify(response.data.profile))
    }
    else {
        console.log("Login Unsuccessful")
    }

    return response.data
}

const updateProfile = async (profileData) => {

    const response = await axios.post(API_URL + 'profile', profileData)

    if (response.data.profile) {
        localStorage.setItem('profile', JSON.stringify(response.data.profile))
        localStorage.setItem('userName', JSON.stringify(response.data.user.name))
    }

    return response.data
}

const uploadFile = async (file) => {

    const response = await axios.post(API_URL + 'upload', file)

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('profile')
}

const authService = {
    register,
    login,
    logout,
    updateProfile,
    uploadFile
}

export default authService