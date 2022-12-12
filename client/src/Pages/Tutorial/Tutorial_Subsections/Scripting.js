import React, { useState } from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import box_collider from '../../../Assets/Images/physics/box_collider.png'
import Add_script_component from '../../../Assets/Images/scripting/Add_script_component.png'
import Add_script from '../../../Assets/Images/scripting/Add_script.png'
import build_succeded from '../../../Assets/Images/scripting/build_succeded.png'
import project_files from '../../../Assets/Images/scripting/project_files.png'
import script_in_player_file from '../../../Assets/Images/scripting/script_in_player_file.png'
import scripting_VS_template from '../../../Assets/Images/scripting/scripting_VS_template.png'


import './tut_subsections.css'

import { Prism as SyntaxHighlighter, style } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaRegCopy, FaRegClipboard} from 'react-icons/fa'

import Treemap from '../../../Components/TreeMap/TreeMap'



function Scripting() {

  const links = [{ id: '#step1', text: 'Figure 1: Add Script component' },
  { id: '#step2', text: 'Figure 2: Open ScriptAppLib' },
  { id: '#step3', text: 'Figure 3: Project template in Visual Studio' },
  { id: '#step4', text: 'Figure 4: Player.cs code snippet' },
  { id: '#step5', text: 'Figure 5: Build Succeeded' },
  { id: '#step6', text: 'Figure 6: Add built scene to object' },
  { id: '#step7', text: 'Figure 7: Player2.cs code snippet' },
  { id: '#step8', text: 'Figure 8: Play with both object controls' },]

  const [isCopied, setIsCopied] = useState(false);


  const codeString = 
`  using Hzn;
  using System;
  namespace Hzn
  {
    class Player : GameObject
    {
      private TransformComponent m_Transform;
      private RigidBody2DComponent m_RigidBody;
      public void OnCreate()
      {
        Console.WriteLine($"Player1.OnCreate - {ID}");

        m_Transform = GetComponent<TransformComponent>();
        m_RigidBody = GetComponent<RigidBody2DComponent>();
      }
      public void OnUpdate(float ts)
      {
        Vector3 velocity = Vector3.Zero;
        //Control direction according to keyboard input
        if (Input.IsKeyDown(KeyCode.W))
        {
            velocity.Y = 1.0f;
        }
        else if (Input.IsKeyDown(KeyCode.S))
        {
            velocity.Y = -1.0f;
        }
        if (Input.IsKeyDown(KeyCode.A))
        {
            velocity.X = -1.0f;
        }
        else if (Input.IsKeyDown(KeyCode.D))
        {
            velocity.X = 1.0f;
        }
        velocity *= 35.0f * ts;
        m_RigidBody.ApplyLinearImpulse(velocity.XY, true);
      }
    }
  
    `;

    const codeStringPlayer2 = 
`  using Hzn;
  using System;
  namespace Hzn
  {
    class Player2 : GameObject
    {
      private TransformComponent m_Transform;
      private RigidBody2DComponent m_RigidBody;
      public void OnCreate()
      {
        Console.WriteLine($"Player1.OnCreate - {ID}");

        m_Transform = GetComponent<TransformComponent>();
        m_RigidBody = GetComponent<RigidBody2DComponent>();
      }
      public void OnUpdate(float ts)
      {
        Vector3 velocity = Vector3.Zero;
        //Control direction according to keyboard input
        if (Input.IsKeyDown(KeyCode.Up))
        {
            velocity.Y = 1.0f;
        }
        else if (Input.IsKeyDown(KeyCode.Down))
        {
            velocity.Y = -1.0f;
        }
        if (Input.IsKeyDown(KeyCode.Left))
        {
            velocity.X = -1.0f;
        }
        else if (Input.IsKeyDown(KeyCode.Right))
        {
            velocity.X = 1.0f;
        }
        velocity *= 35.0f * ts;
        m_RigidBody.ApplyLinearImpulse(velocity.XY, true);
      }
    }
    `;


  return (
    <div className='tut-main-container'>
        <Sidebar />
        <div className='adv-tut-content'>
          <h2>Adding Scripts</h2>
          <Treemap links={links} />
          <br></br>
          <p>In this tutorial we look at how we can add scripting to scene objects, check out the video for visual reference!</p>
          
          <iframe className='youtube-iframe' src="https://www.youtube.com/embed/lZtUc3ZCHHk" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <p className='center_txt'>Figure 1: Video - Horizon game engine – Adding scripting to objects</p>

          <p>We will continue to use the scene from the previous physics tutorial. 
            We will look at how we can add scripting to a scene object.
          </p>
          <img src={box_collider} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 2: Horizon game engine – Scene setup with two objects rendered</p>

          <strong id='step1'>Step 1:</strong>
          <p>To start off with, click on the ‘Red Box’, go to the components section on the right-hand side and click on the ‘ScriptComponent’ 
            button. This will add a scripting component to the object's components section. If you click on the drop-down menu of 
            script component, you will see that there are no scripts available to select. This is what we will be working on next. Repeat the 
            above process for the ‘White Box’ also.
          </p>
          <img src={Add_script_component} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 3: Horizon game engine – Add script component</p>
          
          <strong id='step2'>Step 2:</strong>
          <p>To start making a script you will need to open up the directory that the project is saved to. Navigate to the 
            ‘ScriptAppLib’ folder where you will see ‘ScriptAppLib.sln’. Double-click the ‘ScriptAppLib.sln’ ‘solution’ file to open 
            up the scripting project template using visual studio.
          </p>
          <img src={project_files} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 4: Horizon game engine – Project Files</p>

          <strong id='step3'>Step 3:</strong>
          <p>The Horizon Game Engine will use the Visual Studio IDE to allow us to build C# scripts.</p>
          <p>Once visual studio is opened, it will produce a project template with a ‘Player.cs’ file in the source folder. Open this 
            file. See the figure below on how your visual studio setup should look.
          </p>
          <img src={scripting_VS_template} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 5: Horizon game engine – Scripting template in Visual studio</p>

          <strong id='step4'>Step 4:</strong>
          <p>This is where we can input our scripts. To test this out copy and paste the following example code below into the 'Player.cs' file. 
            It will provide control over the Red Box and allow you to move it around using the WSAD keys. </p>
          <p>Code for 'Player.cs':</p>
          
          <div className='parent_code_snipp_div'>
          <CopyToClipboard onCopy={() => setIsCopied(true)} className='copy_button' text={codeString}>
              <button className="copy_icon_btn">{isCopied? <FaRegClipboard/> : <FaRegCopy  className="copy_icon"/>}</button>
          </CopyToClipboard>

          <SyntaxHighlighter wrapLongLines  showLineNumbers language="csharp" style={darcula}>
            {codeString}
          </SyntaxHighlighter>
          </div>
          <p className='center_txt'>Figure 6: Horizon game engine – 'Player.cs' code snippet</p>

          <p>
            Your 'Player.cs' file should look like this:
          </p>

          <img src={script_in_player_file} className='pic-width center_img' ></img>
          <p className='center_txt'>Figure 7: Horizon game engine – Scripting in 'Player.cs' file</p>
          
            <strong id='step5'>Step 5:</strong>
          <p>Great! Now we build the ‘Player.cs’ file. Click then right–click on the ‘scriptAppLib’ line at the top of the solution 
            explorer in visual studio and click build, you should see build succeded at the bottom of the output 
            section in the visual studio window. That’s it, we can now head back over to Horizon game engine and 
            see if our script has been imported. Check out the video at the top to see how this step should work.
          </p>
          <img src={build_succeded} className='pic-width center_img' ></img>
          <p>Figure 8: Horizon game engine – Script build succeded</p>
          
          <strong id='step6'>Step 6:</strong>
          <p>Now let’s go back to Horizon Game Engine with our newly built scripts. Click on the Red Box again, 
            and check out the drop-down menu of the script component and you should see your ‘Player.cs’ script there. 
            Select it, now the script has been applied to the Red Box object. Let’s hit play see if it works, don't forget to use 
            'W' 'S' 'A' 'D' as the controls!
          </p>
          
          <img src={Add_script} className='pic-width center_img'></img>
          <p>Figure 9: Horizon game engine – Add script to object</p>

          <strong id='step7'>Step 7:</strong>
          <p>We can now do the same thing for the White Box. Go back to visual studio and in the ‘Solution Explorer’ click 
            on the ‘Player.cs’ file, make a copy of this using ‘Ctrl + C’ & ‘Ctrl + V’. Rename the second file to 
            ‘Player2.cs’ by right clicking the 'Player-copy.cs' file and clicking rename. We just need to change 5 lines of the code to 
            make it work. On line 6 change ‘Player’ to ‘Player2’, on line 25 change ‘W’ to ‘Up’, on line 29 change ‘S’ to 
            ‘Down’, on line 33 change ‘A’ to ‘Left’ and on line 37 change ‘D’ to ‘Right’. However, you don't need to manually change this, 
            see the code snippet below for reference, and copy and paste it into your 'Player2.cs' file. Build the solution again as in step 5, and you're good to go!
            Check out the video at the top to see how this step should work.
          </p>
          <p>Code for Player2.cs: </p>

          <div className='parent_code_snipp_div'>
          <CopyToClipboard onCopy={() => setIsCopied(true)} className='copy_button' text={codeString}>
              <button className="copy_icon_btn">{isCopied? <FaRegClipboard/> : <FaRegCopy  className="copy_icon"/>}</button>
          </CopyToClipboard>

          <SyntaxHighlighter wrapLongLines  showLineNumbers language="csharp" style={darcula}>
            {codeStringPlayer2}
          </SyntaxHighlighter>
          </div>
          <p className='center_txt'>Figure 10: Horizon game engine – 'Player2.cs' code snippet</p>

          <strong id='step8'>Step 8:</strong>
          <p>
            Go back to the Horizon Game Engine and click on the White Box, click on the drop-down menu for 
            the script component in the components section and select ‘Player2.cs’ this will apply the script to the 
            ‘White Box’ object. And that’s it! We can now run our scene and control the Red Box with WSAD and the White 
            Box with Up, Down, Left & Right Arrows. Give it a try and see!
          </p>
          
          <p>
            This tutorial focused on how to add a script to a game object in Horizon Game Engine.
          </p> 
        </div>
    </div>
  )
}

export default Scripting