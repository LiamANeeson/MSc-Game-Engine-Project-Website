import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Button } from 'react-bootstrap';
import './Tutorial.css';

function Tutorial() {
  return (
    <div >
      <div className='tut-main-container'>
        <Sidebar />
        <div className='tut-content'>
          <h2>HorizonGE Tutorials</h2>
          <p className='par-text'>Welcome to our Tutorials page,here you can learn the "ins and outs" 
            of the Horizon game engine. To navigate through our tutorials use the side bar provided. This will show you how to do things like 
            opening the game engine, setting up a new project, opening a scene and creating you own game!</p>
        
        </div>
      </div>
    </div>
  )
}

export default Tutorial