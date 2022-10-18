import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user data from local 
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: null,
    isError: false,
    isSuccess: false, 
    isLoading: false,
    message: ''
}

// Register
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user) 
    } catch (error) {
        const message = (error.response && error.response.data) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

//update profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async (profile, thunkAPI) => {
    try {
        return await authService.updateProfile(profile)
    } catch (error) {
        const message = (error.response && error.response.data) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//upload file
export const uploadFile = createAsyncThunk('auth/uploadFile', async (file, thunkAPI) => {
    try {
        return await authService.uploadFile(file)
    } catch (error) {
        const message = (error.response && error.response.data) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

  export const logout = createAsyncThunk('auth/logout', 
  async () => {
    await authService.logout()
  })
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.profile = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                state.profile = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.profile = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                state.profile = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.profile = null
            })
    },
})

export const {reset} = authSlice.actions
export default authSlice.reducer