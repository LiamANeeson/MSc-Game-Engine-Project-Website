import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import './tut_subsections.css'

import File_menu from '../../../Assets/Images/newScene/File_menu.png'
import File_menu_open from '../../../Assets/Images/newScene/file_menu_new_scene.png'
import new_scene_dialog from '../../../Assets/Images/newScene/new_scene_dialog.png'
import new_scene_loaded from '../../../Assets/Images/newScene/new_scene_loaded.png'
import new_scene_toggle from '../../../Assets/Images/newScene/new_scene_toggle.png'

import Treemap from '../../../Components/TreeMap/TreeMap'

function CreateScene() {

  const links = [{ id: '#step1', text: 'Figure 1: File menu' },
  { id: '#step2', text: 'Figure 2: File menu open' },
  { id: '#step3', text: 'Figure 3: Scene Dialog' },
  { id: '#step4', text: 'Figure 4: Dashboard scene created' },
  { id: '#step5', text: 'Figure 5: Second scene created' },
  { id: '#step6', text: 'Figure 6: Accessing scenes created' },]

  return (
    <div className='tut-main-container'>
        <Sidebar />
          <div className='adv-tut-content'>
          <h2>Opening a scene</h2>
          <Treemap links={links} />
          <br></br>
          <p>In this tutorial we look at how we can set up a new scene, check out the video for visual reference!</p>
          <iframe className='youtube-iframe' src="https://www.youtube.com/embed/R0BXTMvrg6w" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <p  className='center_txt'>Figure 1: Video - Horizon game engine – New Scene</p>

          <strong id='step1'>Step 1:</strong>
          <p>Now that a new project has been opened, you will need to create a scene. To start, click on the ‘File’ menu at the top of the screen. See figure below:</p>
          <img src={File_menu} alt="HorizonGE empty dashboard" className='pic-max-width center_img_no_width'></img>
          <p  className='center_txt'>Figure 2: Horizon game engine – File menu </p>

          <strong id='step2'>Step 2:</strong>
          <p>Next, we need to select ‘New Scene’ as seen in the figure below. </p>
          <img src={File_menu_open} alt="HorizonGE empty dashboard" className='center_img_no_width'></img>
          <p  className='center_txt'>Figure 2: Horizon game engine – File menu open with new scene option </p>

          <strong id='step3'>Step 3:</strong>
          <p>Once, you click on 'File' -&gt; 'New Scene' a dialog box will open. You will be prompted to name your new scene and then hit ‘create’. 
             We can see this process in the visual below.</p>
          <img src={new_scene_dialog} alt="HorizonGE empty dashboard" className='pic-max-width center_img_no_width'></img>
          <p  className='center_txt'>Figure 3: Horizon game engine – Scene dialog box</p>

          <strong id='step4'>Step 4:</strong>
          <p>Now that you have created a new scene, you will be brought back to the
             main dashboard with your new scene pre-loaded. As in the image below. </p>
          <img src={new_scene_loaded} alt="HorizonGE empty dashboard" className='pic-width center_img' ></img>
          <p  className='center_txt'>Figure 4: Horizon game engine – New Scene setup</p>

          <strong id='step5'>Step 5:</strong>
          <p>To create a second scene, simply repeat the process. Once this is completed,
             you will be returned to the main dashboard as seen above.</p>

          <strong id='step6'>Step 6:</strong>
          <p>To access your scenes, and to toggle between them simply double click on your scenes folder in the content browser which will reveal your scene files as below.
            To toggle between your scenes, click and drag your desired scene from the
            content browser into the viewport.</p>
          <img src={new_scene_toggle} alt="HorizonGE empty dashboard" className='pic-width center_img'></img>
          <p  className='center_txt'>Figure 5: Horizon game engine – Second Scene toggle files setup</p>
        </div> 
    </div>
  )
}

export default CreateScene