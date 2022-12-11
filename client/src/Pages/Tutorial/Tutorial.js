import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import './Tutorial.css';

import pic1 from '../../Assets/Images/game_art_1_ratio.png';
import pic2 from '../../Assets/Images/open_game_art_download.PNG';


function Tutorial() {

  return (
      <div className='tut-main-container'>
            <Card className='card-comp'>
              <Card.Img variant="top" src={pic1} />
              <Card.Body>
                <Card.Title>Beginner Game</Card.Title>
                <Card.Text>
                  Make a game
                </Card.Text>
                <Button className='card-btn' href='/tutorial/beginner/game-getting-started'>Make game!</Button>
              </Card.Body>
            </Card>

            <Card className='card-comp'>
            <Card.Img variant="top" src={ pic2 }/>
            <Card.Body>
              <Card.Title>Advanced functionality</Card.Title>
              <Card.Text>
                Learn Horizon GE
              </Card.Text>
              <Button className='card-btn' href='/tutorial/advanced/getting-started'>Learn HorizonGE</Button>
            </Card.Body>
          </Card>
      </div>
  )
}

export default Tutorial

//Additional unused code for sampling
{/* <Sidebar />
<div className='tut-content'>
  <h2>HorizonGE Tutorials</h2>
  <p className='par-text'>Welcome to our Tutorials page, here you can learn the "ins and outs" 
    of the Horizon game engine. To navigate through our tutorials use the side bar provided. This will show you how to do things like 
    opening the game engine, setting up a new project, opening a scene, adding a new object and creating you own game!</p>
  <p>Use this video for reference throughout the tutorial series to help you follow the steps that will be described. There are also subsection videos in each tutorial to follow also.</p>
  <iframe className='youtube-iframe' src="https://www.youtube.com/embed/1Gsn6ALwpyM" title="YouTube vceDs"
     frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
     allowFullScreen></iframe>
  <p>To get started click on the 'Getting started' tab on the sidebar on the left-hand side!</p>
</div> */}




//Example code
// <div className='tutorial-container'>
//       {<Sidebar />}
//       <div className='tutorial-content-container'>
//         <h1>Tutorial - Setting up a project</h1>
//         <Treemap links={links} />
//         <br />
//         <Row>
//           <Col md={6}>
//             <iframe className='youtube-iframe' src="https://www.youtube.com/embed/-NYTRSvceDs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//           </Col>
          
//         </Row>


//         <h2 id='open'>Opening a project</h2>
//         <Row>
//           <Col md={6} as='p'>
//             Once the Horizon Game Engine has been opened, you will see the Horizon game engine <code className='gray-highlight'>home screen</code>  below:
//           </Col>
//           <Col md={6} as='img' className='tutorial-image' src={require('../../static/image1.png')} alt='Home Screen' />
//         </Row>
//         <p id='empty'> Figure 1: Horizon game engine - empty </p>

//         <Row>
//           <Col md={6} as='p'>Next, we need to select the file menu to open the option to select a <code className='gray-highlight'>New Project</code>.
//           </Col>
//           <Col md={6} as='img' className='tutorial-image' src={require('../../static/image2.png')} alt='New Project' />
//         </Row>


//         <p id='menu'> Figure 2: Horizon game engine – File menu </p>
//         <Row>
//           <Col md={6} as='p'>Next, we need to select <code className='gray-highlight'>New Project</code>  as seen in the figure.
//           </Col>
//           <Col md={6} as='img' className='tutorial-image' src={require('../../static/image3.png')} alt='Menu' />
//         </Row>


//         <p id='menuopen'> Figure 3: Horizon game engine – File menu open </p>

//         <Row>
//           <Col md={6} as='p'>Clicking <code className='gray-highlight'>New Project</code> will open up a <code className='gray-highlight'>New Project</code> dialog box where you can select the name of the project you’re creating. To select the directory of where you wish to store your project, click on the 3 dots (...) action box, to open up a folder dialog box where you can select the folder of your choosing. Once you have selected your desired directory, hit the <code className='gray-highlight'>create</code> button to generate your new project.
//           </Col>
//           <Col md={6} as='img' className='tutorial-image' src={require('../../static/image4.png')} alt='Menu Open' />
//         </Row>


//         <p id='box'> Figure 4: Horizon game engine – File dialog box </p>

//         <Row>
//           <Col md={6} as='p'>Once you have made your project you will be redirected to the main Horizon game engine desktop where your new project will be loaded and ready for you to build your very own game! See the figure below for reference.
//           </Col>
//           <Col md={6} as='img' className='tutorial-image' src={require('../../static/image5.png')} alt='dialog box' />
//         </Row>
//         --------------------------------------------------Demo
//         <ul>
//           <li><code className='gray-highlight'>onYouTubeIframeAPIReady</code> - The API will call this function when the page has finished downloading the JavaScript for the player API, which enables you to then use the API on your page. Thus, this function might create the player objects that you want to display when the page loads.</li>
//         </ul>
//         <h2 id='getting-started'>Getting Started</h2>
//         <p>
//           The sample HTML page below creates an embedded player that will load a video, play it for six seconds, and then stop the playback. The numbered comments in the HTML are explained in the list below the example.
//         </p>
//         <CodeBox>
//           {`<!DOCTYPE html>
// <html>
//   <body>
//     <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
//     <div id="player"></div>

//     <script>
//       // 2. This code loads the IFrame Player API code asynchronously.
//       var tag = document.createElement('script');

//       tag.src = "https://www.youtube.com/iframe_api";
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//       // 3. This function creates an <iframe> (and YouTube player)
//       //    after the API code downloads.
//       var player;
//       function onYouTubeIframeAPIReady() {
//         player = new YT.Player('player', {
//           height: '390',
//           width: '640',
//           videoId: 'M7lc1UVf-VE',
//           playerVars: {
//             'playsinline': 1
//           },
//           events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//           }
//         });
//       }syntax-h

//       // 4. The API will call this function when the video player is ready.
//       function onPlayerReady(event) {
//         event.target.playVideo();
//       }

//       // 5. The API calls this function when the player's state changes.
//       //    The function indicates that when playing a video (state=1),
//       //    the player should play for six seconds and then stop.
//       var done = false;
//       function onPlayerStateChange(event) {
//         if (event.data == YT.PlayerState.PLAYING && !done) {
//           setTimeout(stopVideo, 6000);
//           done = true;
//         }
//       }
//       function stopVideo() {
//         player.stopVideo();
//       }
//     </script>
//   </body>
// </html>`}
//         </CodeBox>
//         <ol>
//           <li>
//             The <code className='gray-highlight'>&lt;div&gt;</code>  tag in this section identifies the location on the page where the IFrame API will place the video player. The constructor for the player object, which is described in the Loading a video player section, identifies the <code className='gray-highlight'>&lt;div&gt;</code> tag by its id to ensure that the API places the <code className='gray-highlight'>&lt;iframe&gt;</code> in the proper location. Specifically, the IFrame API will replace the <code className='gray-highlight'>&lt;div&gt;</code> tag with the <code className='gray-highlight'>&lt;iframe&gt;</code> tag.
//           </li>
//           <li>
//             The <code className='gray-highlight'>onYouTubeIframeAPIReady</code> function will execute as soon as the player API code downloads. This portion of the code defines a global variable, player, which refers to the video player you are embedding, and the function then constructs the video player object.
//           </li>
//         </ol>
//         <h2 id='playback'>Controlling playback of 360° videos</h2>
//         <p className='blue-container'>
//           <b> Note: </b> The 360° video playback experience has limited support on mobile devices. On unsupported devices, 360° videos appear distorted and there is no supported way to change the viewing perspective at all, including through the API, using orientation sensors, or responding to touch/drag actions on the device's screen.
//         </p>
//       </div>
//       </div>