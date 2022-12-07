import React from 'react'
//import DocSidebar from '../../Components/DocSidebar/DocSidebar'
import { Button } from 'react-bootstrap';
import './Documentation.css'


function Documentation() {
  return (
    <div >
      <div className='doc-main-container'>
        <div className='doc-content'>
          <h2>HorizonGE Documentation</h2>
          <p>Welcome to our documentations page, please click the link below to see our subwebsite containing a detailed documentation of the the Horizon game engine.</p>
          <p>Once you enter the documentation website check out the Classes & Files tabs to view a modular breakdown of how the Horizon game engine API works!</p>
          <p>For example, click 'Files', 'File list', 'Renderer', 'Buffer.h' to see the class breakdown</p>
          <p>To return to the Horizon website at any stage, simply click on the 'Return to Horizon 2D' tab at the top of the page.</p>
          <Button href="https://horizondocs.herokuapp.com/" variant="primary" className='docs-cta-btn'>Documentation website</Button>
        </div>
      </div>
    </div>
  )
}

export default Documentation