import React from 'react';
import GameSidebar from '../../../Components/GameTutSidebar/GameSidebar';
import './GameTutSubSec.css';

import Download_GE from '../../../Assets/Images/dwnldHGE/Download_GE.png'
import empty_engine from '../../../Assets/Images/newProject/empty_engine.jpg';

function GameGettingStarted() {
  return (
    <div className='gmTutMainContainer'>
       
          <GameSidebar />
          <div className='gmTutContent'>
            <h2>Getting started with HorizonGE</h2>
            <p></p>
            <p>Get started with building scenes in HorizonGE, to start select 'Download HorizonGE' from the home page!</p>
            
            <img src={Download_GE} className='dwnld_ge pic-max-width_dwnld center_img_no_width'></img>
            <p className = 'center_txt'> Figure 1: Horizon game engine – empty engine dashboard </p>
            
            <p>Once you download the Horizon Game Engine, place the executable in the directory of your choosing.
              You will need to navigate to where the .exe file is and launch it!</p>
            <p>The HznEditor.exe can be found in directory path
               "../HorizonEngine2D\bin\build\x64-debug\HorizonEditor\Debug"
            </p>  
            <p>You will be brought to the empty dashboard screen, as seen below.</p>
            <img src={empty_engine} className='pic-width center_img' alt="HorizonGE empty dashboard"></img>
            <p className='center_txt'> Figure 2: Horizon game engine – empty engine dashboard </p> 
          </div>
        
    </div>
  )
}

export default GameGettingStarted





