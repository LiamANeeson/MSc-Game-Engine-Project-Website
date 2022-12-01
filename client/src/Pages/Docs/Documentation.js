import React from 'react'
import DocSidebar from '../../Components/DocSidebar/DocSidebar'
import { Button } from 'react-bootstrap';
import './Documentation.css'


function Documentation() {
  return (
    <div >
      <div className='doc-main-container'>
        <h2>HorizonGE Documentation</h2>
        <p>Welcome to our documentations page, please click the link below to see our subwebsite containing a detailed documentation of the the Horizon game engine</p>
        <Button /*href=""*/ variant="primary" className='docs-cta-btn'>Documentation website</Button>
      </div>
    </div>
  )
}

export default Documentation