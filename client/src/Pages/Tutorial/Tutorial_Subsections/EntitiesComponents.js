import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'

import './tut_subsections.css'

function EntitiesComponents() {
  return (
    <div className='tut-main-container'>
      <Sidebar />
      <div className='adv-tut-content'>
        <h2>Entity Component system</h2>

        <p>In this tutorial we will discuss how to access some of the components that we can apply to an object entity, check out the video for visual reference!</p>
        <iframe className='youtube-iframe' src="https://www.youtube.com/embed/tDCYkakzbqU" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <p>Figure 1: Video - Horizon Game Engine – Exploring components</p>

        <p>Now that there are objects on screen to work with, we can start to look 
          at the different behaviours that we can apply to each object including Rendering,
          as previously discussed, Physics and Scripting.</p>

        <p>To add a component to an object, select the object hierarchy or in the viewport, then, 
          click the 'add component’ button in the components panel to reveal the components below. 
          Click on one of these components to apply them to object selected. 
          We will be exploring these components in the next few tutorials.</p>
      </div>
    </div>
  )
}

export default EntitiesComponents