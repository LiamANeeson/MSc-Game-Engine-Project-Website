import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import './tut_subsections.css'

import Download_GE from '../../../Assets/Images/dwnldHGE/Download_GE.png'
import empty_engine from '../../../Assets/Images/newProject/empty_engine.jpg';



function GettingStarted() {
  return (
    <div className='tut-main-container'>
        <Sidebar />
        <div className='tut-content'>
          <h2>Getting started with HorizonGE</h2>
          <p></p>
          <p>Get started with building scenes in HorizonGE, to start select 'Download HorizonGE' from the home page!</p>
          <img src={Download_GE} width='750px'></img>
          <p> Figure 1: Horizon game engine – empty engine dashboard </p>
          <p>Once you download the Horizon Game Engine, place the executable in the directory of your choosing and launch it!</p>
          <p>You will be brought to the empty dashboard screen, as seen below.</p>
          <img src={empty_engine} alt="HorizonGE empty dashboard" width='750px'></img>
          <p> Figure 2: Horizon game engine – empty engine dashboard </p>
        </div>
    </div>
  )
}

export default GettingStarted