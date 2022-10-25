import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Navigationbar from './Components/Navbar/Navigationbar';
import { AuthRoute } from './Components/RouterGuard/routerGuard'
import Footer from './Components/Footer/Footer'
import './App.css';

import Profile from './Pages/Profile/Profile';
import UpdateProfile from './Pages/Profile/UpdateProfile'
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Tutorial from './Pages/Tutorial/Tutorial'
import Docs from './Pages/Docs/Documentation'
import Community from './Pages/Community/Community';
import QuestionDetail from './Pages/Community/QuestionDetail';
import Download from './Pages/Download/Download';
import AskQuestion from './Pages/Community/AskQuestion'


function App() {
    return (
        <>
            <Router>
                <Navigationbar />
                <Routes>
                    {/* Page Routes */}
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/tutorial' element={<Tutorial />} />
                    <Route path='/docs' element={<Docs />} />
                    <Route path='/download' element={<Download />} />

                    {/* Community and Question Routes  */}
                    <Route path='/community' element={<Community />} />
                    <Route path='/ask-question' element={<AskQuestion />} />
                    <Route exact path='/question/:id' element={<QuestionDetail />} />

                    {/* Profile Routes */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/profile' element={<AuthRoute>
                        <Profile />
                    </AuthRoute>} />
                    <Route path='/updateProfile' element={<AuthRoute>
                        <UpdateProfile />
                    </AuthRoute>} />
                </Routes>
            </Router>
            <ToastContainer />
            <Footer />
        </>
    );
}

export default App;
