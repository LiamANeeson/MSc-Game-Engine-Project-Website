import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
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

import Overview from './Pages/Docs/Doc_Subsections/Overview'
import Interface from './Pages/Docs/Doc_Subsections/Interface'
import Objects from './Pages/Docs/Doc_Subsections/Objects'
import Object_behaviours from './Pages/Docs/Doc_Subsections/Object_behaviours'
import Scripting from './Pages/Docs/Doc_Subsections/Scripting'

import GettingStarted from './Pages/Tutorial/Tutorial_Subsections/GettingStarted';
import CreatingObjects from './Pages/Tutorial/Tutorial_Subsections/CreatingObjects';
import Animations from './Pages/Tutorial/Tutorial_Subsections/Animations';
import AddingLevels from './Pages/Tutorial/Tutorial_Subsections/AddingLevels';
import Physics from './Pages/Tutorial/Tutorial_Subsections/Physics';
import LifeCycle from './Pages/Tutorial/Tutorial_Subsections/LifeCycle';


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

                    {/* Routers for Tutorial Pages */}
                    <Route path='tutorial/getting-started' element={<GettingStarted />} />
                    <Route path='tutorial/creating-objects' element={<CreatingObjects />} />
                    <Route path='tutorial/add-animations' element={<Animations />} />
                    <Route path='tutorial/adding-levels' element={<AddingLevels />} />
                    <Route path='tutorial/physics' element={<Physics />} />
                    <Route path='tutorial/life-cycle' element={<LifeCycle />} />

                    {/* Routes for Docuemtation Pages*/}
                    <Route path='/docs/overview' element= {<Overview />} />
                    <Route path='/docs/interface' element= {<Interface />} />
                    <Route path='/docs/objects' element= {<Objects />} />
                    <Route path='/docs/object-behaviours' element= {<Object_behaviours />} />  
                    <Route path='/docs/scripting' element= {<Scripting />} />

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
