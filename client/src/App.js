import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import './App.css'

import Home from './Pages/Home';
import Tutorial from './Pages/Tutorial';
import About from './Pages/About';
import Community from './Pages/Community';
import Download from './Pages/Download';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/about' element = {<About /> } />
        <Route path='/tutorial' element = {<Tutorial />} />
        <Route path='/community' element = {<Community />} />
        <Route path='/download' element = {<Download /> } />
      </Routes>
    </Router>
  );
}

export default App;
