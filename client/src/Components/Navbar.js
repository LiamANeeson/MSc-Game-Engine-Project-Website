import React from 'react'
import "../App.css"

function Navbar() {
  return (
    <div className='Navbar'>
        <div className='leftSide'>
            <div className='links'>    
                <a href='/home'>Home</a>
                <a href='/about'>What is GE</a>
                <a href='/tutorial'>Tutorial</a>
                <a href='/documentation'>Documentation</a>
                <a href='/community'>Community</a>
                <a href='/download'>Download</a>
            </div>
        </div>
        <div className='rightSide'>
            <button>Download</button>
        </div>
    </div>
  )
}

export default Navbar