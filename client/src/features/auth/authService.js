import axios from 'axios'

const API_URL = '/api/users/'

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
<<<<<<< HEAD
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('authToken', response.data.token )
        localStorage.setItem('profile', JSON.stringify(response.data.profile))
=======
      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.setItem('authToken',response.data.token )
>>>>>>> d69bf7850171170b481f99e77d89913c0cd8d592
    }

    return response.data
}

const updateProfile = async (profileData) => {

    const response = await axios.post(API_URL + 'profile', profileData)

    if (response.data.profile) {
        localStorage.setItem('profile', JSON.stringify(response.data.profile))
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