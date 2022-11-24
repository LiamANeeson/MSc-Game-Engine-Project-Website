import React from 'react'
import { FaGithub, FaWindows } from 'react-icons/fa'

import './Download.css'

function Download() {
  return (
    <div className='download-container'>
      <section className='download-info'>
        <h2>Download</h2>
        <em>Download the Horizon Game Engine Here!</em>
      <section className='windows-cta'>      
        <h2><FaWindows/> Download for Windows</h2>
      </section>
      </section>
      <section className='download-section'>
        <button className='download-btn'>Download Horizon Game Engine</button>
        <button className='gm-btn'>Download Dark Trails Game</button>        
      </section>
      <section className='git-cta'>
        <h2>Horizon GitHub</h2>
          <em>View Source Code for Horizon GE on Github</em>
          <p>The Horizon Game Engine has been made open source meaning that users can view the code which can be viewed via GitHub!</p>
      </section>
    </div>

  )
}

export default Download