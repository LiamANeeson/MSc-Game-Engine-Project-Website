import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import './App.css'

import Home from './Pages/Home/Home';
import Tutorial from './Pages/Tutorial/Tutorial';
import About from './Pages/About/About';
import Documentation from './Pages/Docs/Documentation';
import Community from './Pages/Community/Community';
import QuestionDetail from './Pages/Community/QuestionDetail';
import Download from './Pages/Download/Download';
// import Footer from './Components/Footer/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/question/:id' element = {<QuestionDetail /> } />
        <Route exact path='/about' element = {<About /> } />
        <Route exact path='/tutorial' element = {<Tutorial />} />
        <Route exact path='/community' element = {<Community />} />
        <Route exact path='/docs' element = {<Documentation />} />
        <Route exact path='/download' element = {<Download /> } />
        <Route exact path='/' element = {<Home />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;


