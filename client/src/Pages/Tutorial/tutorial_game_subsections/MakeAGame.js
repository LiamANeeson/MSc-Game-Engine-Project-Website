import React, { useState } from 'react';
import GameSidebar from '../../../Components/GameTutSidebar/GameSidebar';
import './GameTutSubSec.css';

import AddingSprites from '../../../Assets/Images/gameTutImages/AddingSprites.png';
import Treemap from '../../../Components/TreeMap/TreeMap'

//code snippets
import { Prism as SyntaxHighlighter, style } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaRegCopy, FaRegClipboard} from 'react-icons/fa';

import tilemap from '../../../Assets/TileMap/Tilemap.zip';


function GameGettingStarted() {

  const links = [{ id: '#step1', text: 'Step 1: Creating a Project' },
  { id: '#step2', text: 'Step 2: Setting up the Scene' },
  { id: '#step3', text: 'Step 3: Adding Sprites' },
  { id: '#step4', text: 'Step 4: Playing the Game' },]

  const [isCopied, setIsCopied] = useState(false);

  const Player = 
`  using Hzn;
  using System;
  using System.Collections.Generic;

  namespace Hzn {
      internal class Player : GameObject {
          public static bool canJump = true;

          private RigidBody2DComponent m_Rigidbody;

          public void OnCreate() {
              m_Rigidbody = GetComponent<RigidBody2DComponent>();
          }

          public void OnUpdate(float ts) {
              Vector3 velocity = Vector3.Zero;

              //Control direction according to keyboard input
              if (Input.IsKeyDown(KeyCode.Up) && canJump) {
                  velocity.Y = 15.0f;
                  canJump = false;
              }

              if (Input.IsKeyDown(KeyCode.Left)) {
                  velocity.X = -2.0f;
              } else if (Input.IsKeyDown(KeyCode.Right)) {
                  velocity.X = 2.0f;
              }

              velocity *= 35.0f * ts;

              if (m_Rigidbody != null) {
                  m_Rigidbody.ApplyLinearImpulse(velocity.XY, true);
              }
          }

          public void OnCollisionEnter(uint otherId) {
              GameObject obj = scene.GetGameObjectByID(otherId);
              if (obj.GetComponent<NameComponent>().Name == "Enemy") {
                  obj = this;
                  scene.DestroyGameObject(ref obj);
              } else {
                  canJump = true;
              }
          }

          public void OnTriggerEnter(uint otherId) {
              Console.WriteLine("Level completed");
          }
      }
  }
    `;
  
      const Camera = 
`
 using Hzn;
using System;
using System.Collections.Generic;

namespace Hzn {
    internal class Camera : GameObject {
        public void OnUpdate(float ts) {
            GameObject player = scene.GetGameObjectByID(1);
            if (player != null) {
                Translation = new Vector3(player.Translation.X, Translation.Y, Translation.Z);
            }
        }
    }
}         
  `;

  const Enemy = 
  `
   using Hzn;
  using System;
  using System.Collections.Generic;

  namespace Hzn {
      internal class Enemy : GameObject {
          bool canJump = false;

          private RigidBody2DComponent m_Rigidbody;

          public void OnCreate() {
              m_Rigidbody = GetComponent<RigidBody2DComponent>();
          }

          public void OnUpdate(float ts) {
              Vector3 velocity = Vector3.Zero;

              if (canJump) {
                  velocity.Y = 30.0f;
                  canJump = false;
              }

              velocity *= 35.0f * ts;

              if (m_Rigidbody != null) {
                  m_Rigidbody.ApplyLinearImpulse(velocity.XY, true);
              }
          }

          public void OnCollisionEnter(uint otherId) {
              GameObject obj = scene.GetGameObjectByID(otherId);
              if (obj.GetComponent<NameComponent>().Name != "Player") {
                  canJump = true;
              }
          }
      }
  }
  `



  return (
    <div className='gmTutMainContainer'>
       
          <GameSidebar />
          <div className='gmTutContent'>
            <h2>Make your own game!</h2>
            <Treemap links={links} />
            <br></br>
            <p>In this tutorial we look at creating our own game, Check out this video!</p>
            <iframe className='youtube-iframe' src="https://www.youtube.com/embed/SK7DDoKpSiU" title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <p className='center_txt'> Figure 1: Video - Horizon game engine – Game tutorial</p>


            <strong id='step1'>Step 1: Creating a Project</strong>
            <p>The first step when starting to work with Horizon Engine is to create a new 
              project. This is done by selecting File -&gt; New Project. A prompt will appear 
              on the screen, asking you to name the project and to select a folder where to 
              put it. In this case we are going to name our project "Tutorial", but you can 
              name it whatever you want. After we click the “Create” button, the project 
              will be created in the selected directory. The next thing that we need to do is 
              create a new scene. This is done very easily by selecting File -&gt; New Scene. 
              After clicking the menu item, an initial scene will be created for you and will 
              open automatically. You should be able to see a white square in the viewport and 
              two objects in the hierarchy view – the square and a camera.</p>


              <strong id='step2'>Step 2: Setting up the Scene</strong>
              <p>Now that we have our blank scene, we are going to add a couple of objects 
                to it. You can watch the video to see the exact coordinates for the objects 
                that we use, but you can order them however you like.</p>


              <strong id='step3'>Step 3: Adding Sprites</strong>
              <p>In order to add sprites to our project, we need to add a sprite sheet into the sprites folder of the project, after that add a file with the same name as the sprite sheet and with a .meta extension (e.g. image.png and image.meta). The .meta file will contain two lines: </p>
              <p>•	width:X</p>
              <p>•	height:Y</p>
              <p>X and Y in this case should be replaced by values chosen by you. They represent the width and height of each sprite in the sprite sheet. If you download spritesheet.png and the spritesheet.meta from here, you should be able to simply paste them in the sprites folder and they will be ready to be used.</p>
              <p>Back in the editor, we can now navigate to the sprites folder and select the image that we just imported. Then, we have to click on the Sprites panel, and you will be able to see all the sprites in the selected sprite sheet.</p>
              <p>In order to change the image of an object, we should first select an object from the object hierarchy panel. After this, we have to drag an image from the Sprites panel and drop it on the Texture button of the Render component of the object. You can find the render component in the Component view or if the object doesn’t have a render component, you can simply add it.</p>
              
              <div class="tilemap-cta-container ">
              <div class="center-cta">
              <a href={tilemap} download>
                <button className='download-cta' type="submit">Download tilemaps!</button>
              </a>
              </div>
              </div>



              <br></br>
              <strong>Adding sprites:</strong>
              <img src={AddingSprites} className='pic-width center_img' alt="HorizonGE adding sprites"></img>
              <p className='center_txt'> Figure 2: Horizon game engine – Adding sprites</p>
              <br></br>
              <strong>Step 4: Adding Scripts</strong>
              <p>In order to add different behaviors to our object, we need to write some scripts. We have to navigate to the ScriptAppLib folder in the root folder of our project and open the Visual Studio solution file (ScriptAppLib.sln). It is good practice to separate the different classes into different files and for the sake of this game, we are going to create three files in the Sources folder: Player.cs, Enemy.cs, and Camera.cs. You can copy the content of each file from below.</p>
              <p>After we have written the files, we have to build the solution. This is done by clicking the keyboard combination Ctlr+Shift+B from inside Visual Studio or by navigating to Build -&gt; Build All. This will allow the game engine to detect that you have made changes to the scripts and will reload them.</p>
              <p>Finally, from inside the game engine, we should apply the scripts to the game objects. This is done by selecting the appropriate script file from the drop down of the Script component which you can find in the Components view. Keep in mind that not every object in the scene needs a script component.</p>
              <p>You can watch the video for a reference on how to do all the steps from above.</p>

              {/* Player code snippet */}
              <strong>Player code:</strong>
              <div className='parent_code_snipp_div'>
              <CopyToClipboard onCopy={() => setIsCopied(true)} className='copy_button' text={Player}>
                  <button className="copy_icon_btn">{isCopied? <FaRegClipboard/> : <FaRegCopy  className="copy_icon"/>}</button>
              </CopyToClipboard>

              <SyntaxHighlighter wrapLongLines  showLineNumbers language="csharp" style={darcula}>
                {Player}
              </SyntaxHighlighter>
              </div>
              <p className='center_txt'>Figure 3: Horizon game engine – 'Player.cs' code snippet</p>


              {/* Camera code snippet */}
              <strong>Camera code:</strong>
              <div className='parent_code_snipp_div'>
              <CopyToClipboard onCopy={() => setIsCopied(true)} className='copy_button' text={Camera}>
                  <button className="copy_icon_btn">{isCopied? <FaRegClipboard/> : <FaRegCopy  className="copy_icon"/>}</button>
              </CopyToClipboard>

              <SyntaxHighlighter wrapLongLines  showLineNumbers language="csharp" style={darcula}>
                {Camera}
              </SyntaxHighlighter>
              </div>
              <p className='center_txt'>Figure 4: Horizon game engine – 'Camera.cs' code snippet</p>

              {/* Enemy code snippet */}
              <strong>Enemy code:</strong>
              <div className='parent_code_snipp_div'>
              <CopyToClipboard onCopy={() => setIsCopied(true)} className='copy_button' text={Enemy}>
                  <button className="copy_icon_btn">{isCopied? <FaRegClipboard/> : <FaRegCopy  className="copy_icon"/>}</button>
              </CopyToClipboard>

              <SyntaxHighlighter wrapLongLines  showLineNumbers language="csharp" style={darcula}>
                {Enemy}
              </SyntaxHighlighter>
              </div>
              <p className='center_txt'>Figure 5: Horizon game engine – 'Enemy.cs' code snippet</p>
              

              <strong id='step4'>Step 4: Playing the Game</strong>
              <p>In order to play the game that we just made, we simply need to navigate to File -&gt; Play and the currently open scene will come to life. Using the arrow keys, you can now move around the scene and should try to avoid the enemies. The goal of the level is to get to the door in the end and a Level completed text will appear in the console once you get there.</p>
              <p>After you are done playing the game, simply navigate to File -&gt; Stop to reset the scene and enter Edit mode once again.</p>
              <p>If you are done working on a project, simply navigate to File -&gt; Close Project and all your changes will be saved automatically.</p>
              <p>Feel free to reference the video above if any of the steps is unclear.</p>



          </div>
        
    </div>
  )
}

export default GameGettingStarted





