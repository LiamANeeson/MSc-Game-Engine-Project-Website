import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import { Button } from 'react-bootstrap';
import './tut_subsections.css'

import delete_object from '../../../Assets/Images/newObject/delete_object.png'
import e_func from '../../../Assets/Images/newObject/e_func.png'
import new_game_object from '../../../Assets/Images/newObject/new_game_object.png'
import new_object_color from '../../../Assets/Images/newObject/new_object_color.png'
import new_object_create_empty from '../../../Assets/Images/newObject/new_object_create_empty.png'
import new_object_rendered from '../../../Assets/Images/newObject/new_object_rendered.png'
import q_func from '../../../Assets/Images/newObject/q_func.png'
import r_func from '../../../Assets/Images/newObject/r_func.png'
import w_func from '../../../Assets/Images/newObject/w_func.png'
import new_scene_toggle from '../../../Assets/Images/newScene/new_scene_toggle.png'

function AddObjects() {
  return (
    <div>
      <div className='tut-main-container'>
        <Sidebar />
          <div className='tut-content'>
          <h2>Adding a new object</h2>

          <p>In this tutorial we look at how we can add new objects to our scene, check out the video for visual reference!</p>
          <iframe className='youtube-iframe' src="https://www.youtube.com/embed/V3w7HABhSOg" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe><br/>
          <p  className='center_txt'>Figure 1: Video - Horizon Game Engine – Add object to scene</p>
          
          <p>Now we can look at how to create a new object within our new scene!
             We will continue with our scene (S1) as shown below. </p>
          <img src={new_scene_toggle} className='pic-width center_img' ></img>
          <p  className='center_txt'>Figure 2: Horizon game engine – Scene setup </p>

          <strong>Step 1:</strong>
          <p>First, you will need to right-click anywhere in the ‘Object Hierarchy’, 
            then, click ‘create empty’. We can see this in the figure below.</p>
          <img src={new_object_create_empty} className='pic-max-width_add_obj center_img_no_width'></img>
          <p  className='center_txt'>Figure 3: Horizon game engine – Creating new object </p>

          <strong>Step 2:</strong>
          <p>Once you have clicked 'Create Empty’ your new object will be created.
             That’s all there is to it! You can see below that HorizonGE has
              generated your new object ‘Game Object’. However,
               you will notice that there is still only one white square rendered on screen,
               this is because we will need to render the second object.
             Move onto to the next step to see how we can render this object.</p>
          <img src={new_game_object} className='pic-max-width_add_obj center_img_no_width'></img>
          <p  className='center_txt'>Figure 4: Horizon game engine – New object created </p>

          <strong>Step 3:</strong>
          <p>To render your new object on screen, first click on ‘Game object’ in the ‘Object hierarchy’.
             This will give you control over the game object as you will notice that options become available
              to you in the components screen. To render the square click on ‘Add component’ then ‘RenderComponent’.
               You may need to separate the two squares to see both of your objects on screen. Take a look below,
                the object you just created should have a XY plane highlighting the object and it should look something like this. </p>
          <img src={new_object_rendered}  className='pic-width center_img'></img>
          <p  className='center_txt'>Figure 5: Horizon game engine – Selecting & rendering new object </p>

          <strong>Step 4:</strong>
          <p>This looks quite confusing at the moment, as we have two white squares showing on screen.
             You can rename the new object with the ‘tag’ option at the top of the components panel.
              Change it to ‘Red Box'. To this end, we can also change its colour in the ‘Render’ section.
              You can input the RGB colour or click on the little colour box to manually select it. Take a look below. </p>
          <img src={new_object_color}  className='pic-width center_img'></img>
          <p  className='center_txt'>Figure 6: Horizon game engine – Change name and colour </p>

          <strong>Step 5:</strong>
          <p>Next, we can exercise some functionality over our new object.
             Use the ‘Q’ ’W’ ’E’ ’R’ keys to select different functionalities on the object.
              ‘Q‘ is the base with no functionality, ‘W’ provides manoeuvrability in terms of the position on the plane,
               ‘E’ provides functionality for rotation and ‘R’ will provide functionality for scale.
                We can see how in the images below these functions are implemented. </p>

          <img src={q_func} className='pic-max-width center_img'></img>
          <p  className='center_txt'>Figure 7: Horizon game engine – Q selected </p>
          <img src={w_func} className='pic-max-width center_img'></img>
          <p  className='center_txt'>Figure 8: Horizon game engine – W selected </p>
          <img src={e_func} className='pic-max-width center_img'></img>          
          <p  className='center_txt'>Figure 9: Horizon game engine – E selected </p>
          <img src={r_func} className='pic-max-width center_img'></img>
          <p  className='center_txt'>Figure 10: Horizon game engine – R selected </p>

          <strong>Step 6:</strong>
          <p>Finally, we can look at how to delete our new object.
             Simply click back on the ‘Red Box’ in the ‘Object Hierarchy’ and then right-click.
              Click on ‘Delete’ to delete the object, the same goes for the
               other options ‘Copy’, ‘Paste’ & ‘Duplicate’. </p>
          <img src={delete_object} className='pic-width center_img'></img>
          <p  className='center_txt'>Figure 11: Horizon game engine – Delete object </p>

        </div>
      </div> 
    </div>
  )
}

export default AddObjects