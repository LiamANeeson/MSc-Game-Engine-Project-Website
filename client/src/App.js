import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Tutorial from './Pages/Tutorial';
import About from './Pages/About';
import Download from './Pages/Download';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/tutorial' element = {<Tutorial />} />
        <Route path='/about' element = {<About /> } />
        <Route path='/download' element = {<Download /> } />
      </Routes>
    </Router>
  );
}

export default App;
