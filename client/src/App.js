import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import './App.css'

import Home from './Pages/Home/Home';
import Tutorial from './Pages/Tutorial/Tutorial';
import About from './Pages/About/About';
import Documentation from './Pages/Docs/Documentation';
import Community from './Pages/Community/Community';
import Download from './Pages/Download/Download';
// import Footer from './Components/Footer/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/about' element = {<About /> } />
        <Route path='/tutorial' element = {<Tutorial />} />
        <Route path='/community' element = {<Community />} />
        <Route path='/docs' element = {<Documentation />} />
        <Route path='/download' element = {<Download /> } />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;


