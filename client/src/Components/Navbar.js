import React, { useState } from 'react'
import "../App.css"
import ReorderIcon from "@material-ui/icons/Reorder"

function Navbar() {

  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className='Navbar'>
        <div className='leftSide'>
            <div className='links' id={showLinks ? "hidden" : ""}>    
                <a href='/home'>Home</a>
                <a href='/about'>About</a>
                <a href='/tutorial'>Tutorial</a>
                <a href='/documentation'>Documentation</a>
                <a href='/community'>Community</a>
                <a href='/download'>Download</a>
            </div>
            <button onClick={() => setShowLinks(!showLinks)}><ReorderIcon /></button>
        </div>
        <div className='rightSide'>
            <button>Download</button>
        </div>
    </div>
  )
}

export default Navbar