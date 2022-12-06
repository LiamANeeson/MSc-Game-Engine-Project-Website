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
          <p className='par-text'>Welcome to our Tutorials page, here you can learn the "ins and outs" 
            of the Horizon game engine. To navigate through our tutorials use the side bar provided. This will show you how to do things like 
            opening the game engine, setting up a new project, opening a scene, adding a new object and creating you own game!</p>
          <p>Use this video for reference throughout the tutorial series to help you follow the steps that will be described</p>
          <iframe width="420" height="315"
            src="https://www.youtube.com/watch?v=1Gsn6ALwpyM&ab_channel=TejasDusane">
          </iframe>
          <p>To get started click on the 'Getting started' tab on the sidebar on the left-hand side!</p>
        </div>
      </div>
    </div>
  )
}

export default Tutorial