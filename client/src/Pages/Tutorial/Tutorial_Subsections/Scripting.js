import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'

import box_collider from '../../../Assets/Images/physics/box_collider.png'
import Add_script_component from '../../../Assets/Images/scripting/Add_script_component.png'
import Add_script from '../../../Assets/Images/scripting/Add_script.png'
import build_succeded from '../../../Assets/Images/scripting/build_succeded.png'
import project_files from '../../../Assets/Images/scripting/project_files.png'
import script_in_player_file from '../../../Assets/Images/scripting/script_in_player_file.png'
import scripting_VS_template from '../../../Assets/Images/scripting/scripting_VS_template.png'


import './tut_subsections.css'

function Scripting() {
  return (
    <div className='tut-main-container'>
        <Sidebar />
        <div className='tut-content'>
          <h2>Adding Scripts</h2>

          <p>In this tutorial we look at how we can add scripting to scene objects, check out the video for visual reference!</p>
          
          <iframe className='youtube-iframe' width="640" height="480" src="https://www.youtube.com/embed/lZtUc3ZCHHk" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <p>Figure 1: Video - Horizon game engine – Adding scripting to objects</p>

          <p>We will continue to use the scene from the previous physics tutorial. 
            We will look at how we can add scripting to a scene object.
          </p>
          <img src={box_collider} className='pic-width' ></img>
          <p>Figure 2: Horizon game engine – Scene setup with two objects rendered</p>

          <strong>Step 1:</strong>
          <p>To start off with, click on the ‘Red Box’, go to the components section on the right-hand side and click on the ‘ScriptComponent’ 
            button. This will add a scripting component to the object's components section. If you click on the drop-down menu of 
            script component, you will see that there are no scripts available to select. This is what we will be working on next. Repeat the 
            above process for the ‘White Box’ also.
          </p>
          <img src={Add_script_component} className='pic-width' ></img>
          <p>Figure 3: Horizon game engine – Add script component</p>
          
          <strong>Step 2:</strong>
          <p>To start making a script you will need to open up the directory that the project is saved to. Navigate to the 
            ‘ScriptAppLib’ folder where you will see ‘ScriptAppLib.sln’. Double-click the ‘ScriptAppLib.sln’ ‘solution’ file to open 
            up the scripting project template using visual studio.
          </p>
          <img src={project_files} className='pic-width' ></img>
          <p>Figure 4: Horizon game engine – Project Files</p>

          <strong>Step 3:</strong>
          <p>The Horizon Game Engine will use the Visual Studio IDE to allow us to build C# scripts.</p>
          <p>Once visual studio is opened, it will produce a project template with a ‘player.cs’ file in the source folder. Open this 
            file. See the figure below on how your visual studio setup should look.
          </p>
          <img src={scripting_VS_template} className='pic-width' ></img>
          <p>Figure 5: Horizon game engine – Scripting template in Visual studio</p>

          <strong>Step 4:</strong>
          <p>This is where we can input our scripts. To test this out copy and paste the following example code below into the player.cs file. 
            It will provide control over the Red Box and allow you to move it around using the WSAD keys. </p>
          <p>Code for Player.cs:</p>
          <pre className="preCode">
            <code className="Code">
                  using Hzn;
                  using System;

                  namespace Hzn
                  &#123;
                    class Player: GameObject
                    &#123;
                      private TransformComponent m_Transform;
                      private RigidBody2DComponent m_RigidBody;

                      public void OnCreate()
                      &#123; {/*open*/}
                        Console.WriteLine($&quot;Player1.OnCreate - &#123;ID&#125;&quot;);
                        m_Transform = GetComponent&lt;TransformComponent&gt;();
                        m_RigidBody = GetComponent&lt;RigidBody2DComponent&gt;();
                      &#125;	{/*close*/}

                      public void OnUpdate(float ts)
                      &#123; {/*open*/}
                        Vector3 velocity = Vector3.Zero;

                        //Control direction according to keyboard input
                        if(Input.IsKeyDown(KeyCode.W))
                        &#123; {/*open*/}
                            velocity.Y = 1.0f;
                        &#125;	{/*close*/}
                        else if(Input.IsKeyDown(KeyCode.S))
                        &#123; {/*open*/}
                            velocity.Y = -1.0f;
                        &#125;	{/*close*/}
                        if(Input.IsKeyDown(KeyCode.A))
                        &#123; {/*open*/}
                            velocity.X = -1.0f;
                        &#125;	{/*close*/}
                        else if(Input.IsKeyDown(KeyCode.D))
                        &#123; {/*open*/}
                            velocity.X = 1.0f;
                        &#125;{/*close*/}
                        velocity *= 35.0f * ts;

                        m_RigidBody.ApplyLinearImpulse(velocity.XY, true);
                      &#125;{/*close*/}
                      &#125;{/*close*/}
                    &#125;	{/*close*/}
            </code>
          </pre>
          <p>
            Your player.cs file should look like this:
          </p>

          <img src={script_in_player_file} className='pic-width' ></img>
          <p>Figure 6: Horizon game engine – Scripting in Player.cs file</p>
          
            <strong>Step 5:</strong>
          <p>Great! Now we build the ‘Player.cs’ file. Click then right–click on the ‘scriptAppLib’ line at the top of the solution 
            explorer in visual studio and click build, you should see build succeded at the bottom of the output 
            section in the visual studio window. That’s it, we can now head back over to Horizon game engine and 
            see if our script has been imported. Check out the video at the top to see how this step should work.
          </p>
          <img src={build_succeded} className='pic-width' ></img>
          <p>Figure 7: Horizon game engine – Script build succeded</p>
          
          <strong>Step 6:</strong>
          <p>Now let’s go back to Horizon Game Engine with our newly built scripts. Click on the Red Box again, 
            and check out the drop-down menu of the script component and you should see your ‘Player.cs’ script there. 
            Select it, now the script has been applied to the Red Box object. Let’s hit play see if it works!
          </p>
          
          <img src={Add_script} className='pic-width' ></img>
          <p>Figure 8: Horizon game engine – Add script to object</p>

          <strong>Step 7:</strong>
          <p>We can now do the same thing for the White Box. Go back to visual studio and in the ‘Solution Explorer’ click 
            on the ‘Player.cs’ file, make a copy of this using ‘Ctrl + C’ & ‘Ctrl + V’. Rename the second file to 
            ‘Player2.cs’ by right clicking the file and clicking rename. We just need to change 5 lines of the code to 
            make it work. On line 6 change ‘Player’ to ‘Player2’, on line 25 change ‘W’ to ‘Up’, on line 29 change ‘S’ to 
            ‘Down’, on line 33 change ‘A’ to ‘Left’ and on line 37 change ‘D’ to ‘Right’. See the code snippet below for 
            reference. Check out the video at the top to see how this step should work.
          </p>
          <p>Code for Player2.cs: </p>
          <pre className="preCode">
            <code className="Code">
                  using Hzn;
                  using System;

                  namespace Hzn
                  &#123;
                    class Player2: GameObject
                    &#123;
                      private TransformComponent m_Transform;
                      private RigidBody2DComponent m_RigidBody;

                      public void OnCreate()
                      &#123; {/*open*/}
                        Console.WriteLine($&quot;Player1.OnCreate - &#123;ID&#125;&quot;);
                        m_Transform = GetComponent&lt;TransformComponent&gt;();
                        m_RigidBody = GetComponent&lt;RigidBody2DComponent&gt;();
                      &#125;	{/*close*/}

                      public void OnUpdate(float ts)
                      &#123; {/*open*/}
                        Vector3 velocity = Vector3.Zero;

                        //Control direction according to keyboard input
                        if(Input.IsKeyDown(KeyCode.UP))
                        &#123; {/*open*/}
                            velocity.Y = 1.0f;
                        &#125;	{/*close*/}
                        else if(Input.IsKeyDown(KeyCode.Down))
                        &#123; {/*open*/}
                            velocity.Y = -1.0f;
                        &#125;	{/*close*/}
                        if(Input.IsKeyDown(KeyCode.Left))
                        &#123; {/*open*/}
                            velocity.X = -1.0f;
                        &#125;	{/*close*/}
                        else if(Input.IsKeyDown(KeyCode.Right))
                        &#123; {/*open*/}
                            velocity.X = 1.0f;
                        &#125;{/*close*/}
                        velocity *= 35.0f * ts;

                        m_RigidBody.ApplyLinearImpulse(velocity.XY, true);
                      &#125;{/*close*/}
                      &#125;{/*close*/}
                    &#125;	{/*close*/}
            </code>
          </pre>
          <strong>Step 8:</strong>
          <p>
            Go back to the Horizon Game Engine and click on the White Box, click on the drop-down menu for 
            the script component in the components section and select ‘Player2.cs’ this will apply the script to the 
            ‘White Box’ object. And that’s it! We can now run our scene and control the Red Box with WSAD and the White 
            Box with Up, Down, Left & Right Arrows. Let’s give it a try and see!
          </p>
          
          <p>
            This tutorial focused on how to add a script to a game object in Horizon Game Engine.
          </p> 
        </div>
    </div>
  )
}

export default Scripting