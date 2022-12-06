import React from 'react'

import {
  Container,
  Row,
  Col,
  Card
} from 'react-bootstrap'

import './About.css'
import GameEngineMedium from '../../Assets/Images/Game_Engine_Medium.PNG'
import Game2D from '../../Assets/Images/game_art_1.PNG'


function About() {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Features</h2>
          <p>
            <em>Start your Game Dev Journey with the Horizon Game Engine</em>
          </p>
          <ul>
            <li>
              <strong>Custom API: </strong>
              The Horizon The Horizon Engine uses it's own custom API making it platform and library agnostic.
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
              Join our community and learn more about the Horizon Game Engine using our community section
            </li>
          </ul>
          <br></br>
        </Col>
        <Col md={6}>
          <Card className='mt-5 mb-5'>
            <Card.Img variant="bottom" src={GameEngineMedium} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className='mb-5'>
            <Card.Img variant="bottom" src={Game2D} />
          </Card>
        </Col>
        <Col md={6}>
          <h2>Create Amazing 2D Games</h2>
          <p>
            <em>Horizon is  purpose built for creating 2D Games</em>
          </p>
          <ul>
            <li>
              <strong>Multiple Camera Angles: </strong>
              Developers will be able to utilise a top-down and side scroll camera angle in their games.
            </li>
            <li>
              <strong>Audio: </strong>
              Add audio to any game objects
            </li>
            <li>
              <strong>Logging & Debugging: </strong>
              Check for any bugs or errors using our inbuilt logging system
            </li>
          </ul>
          <br></br>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Horizon Engine Scripting</h2>
          <p>
            <em>Customise your games with scripting</em>
          </p>
          <ul>
            <li>
              <strong>Visual Scripting: </strong>
              Create logic for game obejcts using visual drag-and-drop graphs instead of writing code!
            </li>
            <li>
              <strong>Focus on Creating Games: </strong>
              Visual scripting empowers users to focus on creating awesome games not writing code
            </li>
          </ul>
        </Col>
        <Col md={6}>
        </Col>
      </Row>
    </Container>
  )
}

export default About
