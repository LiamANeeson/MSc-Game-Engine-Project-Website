import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'

import Add_rigidBody2DComponent from '../../../Assets/Images/physics/Add_rigidBody2DComponent.png'
import box_collider from '../../../Assets/Images/physics/box_collider.png'
import play from '../../../Assets/Images/physics/play.png'
import rigidBody2DComponent_options from '../../../Assets/Images/physics/rigidBody2DComponent_options.png'
import Scene_in_play from '../../../Assets/Images/physics/Scene_in_play.png'
import scene_layout from '../../../Assets/Images/physics/scene_layout.png'
import scene_play from '../../../Assets/Images/physics/scene_play.png'
import stop from '../../../Assets/Images/physics/stop.png'
import two_objects from '../../../Assets/Images/physics/two_objects.png'

import Treemap from '../../../Components/TreeMap/TreeMap'

import './tut_subsections.css'

function Physics() {
  const links = [{ id: '#step1', text: 'Figure 1: Add Rigid Body' },
  { id: '#step2', text: 'Figure 2: Select Rigid Body Type' },
  { id: '#step3', text: 'Figure 3: Play & Stop scene' },
  { id: '#step4', text: 'Figure 4: Build out scene' },
  { id: '#step5', text: 'Figure 5: Add Box Collider Component' },
  { id: '#step6', text: 'Figure 6: Play scene' },
  { id: '#references', text: 'Reference' },]


  
  return (
    <div className='advTutMainContainer'>
        <Sidebar />
        <div className='advTutContent'>
          <h2>Adding physics</h2>
          <Treemap links={links} />
          <br></br>
          <p>In this tutorial we look at how we can add physics to scene objects, check out the video for visual reference!</p>
          <iframe className='youtube-iframe' src="https://www.youtube.com/embed/49QSz4Lv5WE" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <p className='center_txt'>Figure 1: Video - Horizon game engine – Adding physics to objects</p>

          <p>Let’s see if we can add some physics to the objects we created in our scene. 
            We will use the scene we created last time in the ‘Adding objects’ article.
          </p>
          <img src={two_objects} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 2: Horizon game engine – Scene setup with two objects rendered</p>

          <strong id='step1'>Step 1: Adding a Rigid Body to Red Box</strong>
          <p>
            Click on the Red Box if you haven’t already, once the red box is highlighted, click ‘Add Component’ 
            on the right-hand side of the screen. Click ‘RigidBody2DComponent’ to place the object under the 
            influence of the of the physics engine.
          </p>
          <img src={Add_rigidBody2DComponent} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 3: Horizon game engine – Add Rigid Body to Red Box</p>
          
          <strong id='step2'>Step 2: Rigid Body options</strong>
          <p>
          You will notice that the extra Rigid Body physics component has been added to your red box object. 
          Let’s take a closer look at this Rigid Body component to see how it works and what you can do with it. 
          If you click on the drop arrow of the rigid body component bar, you will see that there are three 
          options: - Static, Kinematic and Dynamic:
          </p>
          <p>
            We can refer to the Box2D: Dynamics Module &#40;2022&#41;	 documentation dynamics module - 
            <a href="https://box2d.org/documentation/md__d_1__git_hub_box2d_docs_dynamics.html" target="_blank"> here</a> to explain what each 
            of these three options are:
          </p>
          <p>
            Static - “A static body does not move under simulation and behaves as if it has infinite mass.”
          </p>
          <p>
           Kinematic - “A kinematic body moves under simulation according to its velocity. Kinematic bodies do not 
           respond to forces. They can be moved manually by the user, but normally a kinematic body is moved by 
           setting its velocity. A kinematic body behaves as if it has infinite mass. Kinematic bodies do not 
           collide with other kinematic or static bodies.” 
          </p>
          <p>
            Dynamic - “A dynamic body is fully simulated. They can be moved manually by the user, but normally 
            they move according to forces. A dynamic body can collide with all body types. A dynamic body always 
            has finite, non-zero mass.” 
          </p>
          <p>
            We will select the dynamic option for our object as this will allow us to see a good demonstration 
            of an object in action. 
          </p>
          <img src={rigidBody2DComponent_options} className='center_img'></img>
          <p className='center_txt'>Figure 4: Horizon game engine – Rigid Body options</p>

          <strong id='step3'>Step 3: Play & Stop scenes</strong>
          <p>
            To test out this new dynamic component on our object, we can play our scene. 
            To do this click File -&gt; Play. To stop, click File -&gt; stop. When you hit play 
            you will notice that the red box ‘falls down’ off the screen. This is because the Rigid 
            Body 2D component has acted on the object to provide an artificial gravity. 
            This doesn’t allow you to provide much function for your scene, 
            but it is an import step to complete in building your scene. If you haven’t already, click stop on your scene. 
          </p>
          
          <img src={play} className='center_img_no_width'></img>
          <p className='center_txt'>Figure 5: Horizon game engine – Play button</p>
          
          <img src={stop}  className='center_img_no_width' width='20%'></img>
          <p className='center_txt'>Figure 6: Horizon game engine – Stop button</p>

          <img src={Scene_in_play} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 7: Horizon game engine – Scene in play</p>

          <strong id='step4'>Step 4: Scene setup with added objects</strong>
          <p>
            Now that we have seen how to add a rigid body to our objects, we start can set up multiple objects 
            and begin building a fuller scene. Follow the video sequence at the top to set up your scene.  
          </p>

          <img src={scene_layout} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 8: Horizon game engine – Scene setup with added objects</p>

          <strong id='step5'>Step 5: Add Box Colliders</strong>
          <p>
            Now that we have our scene set up, we can look into the next physics property – ‘Box Collider’. 
            The box collider allows the object to interact with the physics system and provide collision 
            detection system for the object. To use this property, select the red box in your scene, 
            click add component and then click ‘BoxCollider2DComponent’. Repeat this step for the remianing three objects.
          </p>
          <img src={box_collider} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 9: Horizon game engine – Box Collider</p>

          <strong id='step6'>Step 6: Restitution - (Bounciness)</strong>
          <p>
            Now that we have the box collider and rigid body components installed on our objects, 
            we can ‘play’ the scene again to see how the objects will interact with each other. 
            Once you click play you will notice that both squares ‘fall down’ but are caught by the 
            overlapping platforms. You will notice that when setting up the scene in the video we applied the Box Collider 
            2D and set the 'restitution' of the left and right platforms to ‘0.780’, essentially the restitution 
            of an object in game development is its bounciness once a constraint is violated.
          </p>

          <img src={scene_play} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 10: Horizon game engine – scene in play with physics</p>

          <p>
            What we are trying to show here is that when we hit play, the red & white will fall at their velocity 
            given by the rigid body and then ‘bounce’ up again at’0.780’ of the velocity it fell at, as they bounced off 
            Left and right platfoms.
          </p>
          <p>
            This tutorial showed the basic functionality of how to add a physics component to an object and 
            how a scene can be expanded upon to create beginnings of a game. 
          </p>
          <p>
            <strong id='references'>Reference:</strong><br/>
            - "Box2D: Dynamics Module. &#40;2022&#41;. Box2d.org. 
            <a className='break-ref' href="https://box2d.org/documentation/md__d_1__git_hub_box2d_docs_dynamics.html" target="_blank">
              https://box2d.org/documentation/md__d_1__git_hub_box2d_docs_dynamics.html"
            </a>
          </p>
        </div>
    </div>
  )
}

export default Physics