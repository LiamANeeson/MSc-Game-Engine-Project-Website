import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './Components/Navbar/Navbar';
import './App.css';

import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Tutorial from './Pages/Tutorial/Tutorial'
import Docs from './Pages/Docs/Documentation'
import Community from './Pages/Community/Community';
import QuestionDetail from './Pages/Community/QuestionDetail';
import Download from './Pages/Download/Download';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/tutorial' element={<Tutorial/>} />
          <Route path='/docs' element={<Docs />} />
          <Route path='/community' element={<Community />} />
          <Route path='/download' element={<Download />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route exact path='/question/:id' element = {<QuestionDetail /> } />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
