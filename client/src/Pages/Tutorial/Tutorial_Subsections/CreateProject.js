import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import './CreateProject.css'

//pics
import empty_engine from '../../../Assets/Images/newProject/empty_engine.jpg';
import File_menu from '../../../Assets/Images/newProject/File_menu.png';
import File_menu_open from '../../../Assets/Images/newProject/File_menu_open.png';
import new_project_dialog from '../../../Assets/Images/newProject/new_project_dialog.png';
import new_project_setup from '../../../Assets/Images/newProject/new_project_setup.png';

function CreateProject() {
  return (
    <div className='cp-main-container'>
      <Sidebar />
        <div className='cp-content'>
          <h2>Opening a new project</h2>
          <p>Once the Horizon Game Engine has been opened, you will see the Horizon game engine home screen below: </p>
          <img src={empty_engine} alt="HorizonGE empty dashboard" width='750px'></img>
          <p> Figure 1: Horizon game engine – empty engine dashboard </p>
          <p> Next, we need to select the file menu to open the option to select a ‘New Project’.</p> 
          <img src={File_menu} alt="HorizonGE File menu"></img>
          <p> Figure 2: Horizon game engine – File menu </p>
          <p>Next, we need to select ‘New Project’ as seen in the figure below.</p>
          <img src={File_menu_open} alt="HorizonGE File menu open"></img>
          <p> Figure 3: Horizon game engine – File menu open </p>
          <p>Clicking ‘New project’ will open up a ‘New project’ dialog box where you can select the name of the project you’re creating. To select the directory of where you wish to store your project, click on the 3 dots (...) action box, to open up a folder dialog box where you can select the folder of your choosing. Once you have selected your desired directory, hit the ‘create’ button to generate your new project. </p> 
          <img src={new_project_dialog} alt="HorizonGE File menu"></img>
          <p> Figure 4: Horizon game engine – File dialog box </p>
          <p> Once you have made your project you will be redirected to the main Horizon game engine desktop where your new project will be loaded and ready for you to build your very own scene! See the figure below for reference. </p> 
          <img src={new_project_setup} alt="HorizonGE project dashboard" width='750px'></img>
          <p> Figure 5: Horizon game engine – New project dashboard</p>
        </div>
    </div>
  )
}

export default CreateProject;