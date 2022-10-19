import React from 'react'
import './About.css'
import GameArt1 from '../../Images/game_art_1.PNG'

function About() {
  return (
    <div className='container'>
      <h2>Features</h2>
      <p>
        <em>Start your Game Dev Journey with the Horizon Game Engine</em>
      </p>
      <ul className='text'>
        <li>
          <strong>Custom API: </strong>
          The Horizon Engine uses it's own custom API making it platform and library agnostic. 
        </li>
        <li>
          <strong>Physics System: </strong>
          Add rigid body physics to any objects added to the scene.
        </li>
        <li>
          <strong>Visual Scripting: </strong>
          Add Scripts to game objects using our visual scripting!
        </li>
        <li>
          <strong>Community Driven: </strong>
          Join our website and learn more about Horizon Game Engine using our Community section. 
        </li>
      </ul>
      <img src = {GameArt1} alt="2D 8-bit Game Example" className='about-img'/>
      <h2>Create Amazing 2D Games</h2>
      <p>
        <em>Horizon is Game Engine purpose built for creating 2D Games</em>
      </p>
      <ul className='text'>
        <li>
          <strong>Multiple Camera Angles: </strong>
          Developers will be able to utilise a top-down and side scroll camera angle in their games.
        </li>
      </ul>
      <h2>Horizon Engine Scripting</h2>
      <p>
        <em>Customise your games further using scripting</em>
      </p>
      <ul className='text'>
        <li>
          <strong>Multiple Camera Angles: </strong>
          Developers will be able to utilise a top-down and side scroll camera angle in their games.
        </li>
      </ul>
    </div>
  )
}

export default About