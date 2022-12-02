import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import './CreateScene.css'

import File_menu from '../../../Assets/Images/newScene/File_menu.png'
import File_menu_open from '../../../Assets/Images/newScene/File_menu_open.png'
import new_scene_dialog from '../../../Assets/Images/newScene/new_scene_dialog.png'
import new_scene_loaded from '../../../Assets/Images/newScene/new_scene_loaded.png'
import new_scene_toggle from '../../../Assets/Images/newScene/new_scene_toggle.png'



function CreateScene() {
  return (
    <div className='cs-main-container'>
        <Sidebar />
          <div className='cs-content'>
          <h2>Opening a scene</h2>
          <p>Now that you have opened a new project, you will need to create a scene. To start click on the ‘File’ menu at the top of the screen. See figure below:</p>
          <img src={File_menu} alt="HorizonGE empty dashboard" ></img>
          <p>Figure 1: Horizon game engine – File menu </p>
          <p>Next, we need to select ‘New Scene’ as seen in the figure below. </p>
          <img src={File_menu_open} alt="HorizonGE empty dashboard" ></img>
          <p>Figure 2: Horizon game engine – File menu open </p>
          <p>Once, you click on 'File' -&gt; 'New Scene' a dialog box will open. You will be prompted to name your new scene and then hit ‘create’. 
             We can see this process in the visual below.</p>
          <img src={new_scene_dialog} alt="HorizonGE empty dashboard" ></img>
          <p>Figure 3: Horizon game engine – Scene dialog</p>
          <p>Now that you have created a new scene, you will be brought back to the
             main dashboard with your new scene pre-loaded. As in the image below. </p>
          <img src={new_scene_loaded} alt="HorizonGE empty dashboard" className='pic-width' ></img>
          <p>Figure 4: Horizon game engine – New Scene setup</p>
          <p>To create a second scene, simply repeat the process. Once this is completed,
             you will be returned to the main dashboard as seen above.</p>
          <p>To access your scenes, and to toggle between them simply double click on your scenes folder which will reveal your scene files as below.
            To toggle between your scenes, click and drag your desired scene from the
            content browser into the viewport.</p>
          <img src={new_scene_toggle} alt="HorizonGE empty dashboard" className='pic-width'></img>
        </div> 
    </div>
  )
}

export default CreateScene