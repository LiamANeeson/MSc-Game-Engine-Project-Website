import React from 'react'
import {
  Container,
  Row, 
  Col, 
  Card,
  Button
} from 'react-bootstrap';

import './Home.css'
import PhysicsPic from '../../Assets/Images/physics_example.PNG'
import ScenePic from '../../Assets/Images/scene_example.png'
import ScriptingPic from '../../Assets/Images/scripting_example.jpg'
import CommunityPic from '../../Assets/Images/Gamer_Dev_Pic.jpg'


// Row = 12 cols or 100%
function Home() {
  return (
    <Container className='home-container'>
      <Row>
        <Col>
        <Card className='text-center mt-5'>
          <Card.Body>
            <Card.Title className="fs-1 fw-bold">Build 2D Games</Card.Title>
            <Card.Text className="fw-bold">
              Create Awesome 2D Games with the Horizon Game Engine
            </Card.Text>
            <Card.Text>
              Horizon Game Engine Gives you all the necessary tools you need to create 2D games. Letting you learn and focus on creating games!
            </Card.Text>
            <Card.Text>
              Horizon is a free and open-source so you don't have to worry about fees or royalties! All you have to do is create some games!
            </Card.Text>
            <Button href="/download" variant="primary" className='home-cta-btn'>Download Horizon Game Engine</Button>
            <Button href="/download" variant="primary" className='game-cta-btn'>Download Dark Trails Game</Button>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row className='custom-row'>
        <Col lg={3} sm={6}>
          <Card className='custom-card text-center mt-5 mb-5'>
            <Card.Img src={PhysicsPic}/>
            <Card.Body>
              <Card.Title>Physics</Card.Title>
              <Card.Text bsPrefix='card-text'>
                Learn about physics used in 2D games and how to use it the Horizon GE.
              </Card.Text>
              {/*<Button variant="primary" className='home-cta-btn'>Learn More</Button>*/}
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className='home-cta-btn'>Learn More</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card className='text-center mt-5 mb-5'>
          <Card.Img src={ScenePic}/>
            <Card.Body>
              <Card.Title>Scene Managment</Card.Title>
              <Card.Text>
                Learn all about scenes in game development and how they work in Horizon GE.{' '}
              </Card.Text>
              {/*<Button variant="primary" className='home-cta-btn'>Learn More</Button>*/}
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className='home-cta-btn'>Learn More</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card className='text-center mt-5 mb-5'>
          <Card.Img src={ScriptingPic} />
            <Card.Body>
              <Card.Title>Scripting</Card.Title>
              <Card.Text>
                Horizon GE uses a visual scripting model allowing users to add scripts to objects without the need to learn a scripting language!.{' '}
              </Card.Text>
              {/*<Button variant="primary" className='home-cta-btn'>Learn More</Button>*/}
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className='home-cta-btn'>Learn More</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card className='text-center mt-5 mb-5'>
          <Card.Img src = {CommunityPic}/>
            <Card.Body>
              <Card.Title>Horizon Community</Card.Title>
              <Card.Text> 
                Horizon Game Engine Community Page allows users to create posts or search for posts to discuss the Horizon Game Engine!.{' '}
              </Card.Text>
              {/*<Button variant="primary" className='home-cta-btn'>Learn More</Button>*/}
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className='home-cta-btn'>Learn More</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Home

    // <div className='homePage-container'>
    //   <div className='headline-content'>
    //     <h2 className='headline-text'>
    //       Learn Game Development
    //       <em>Create Awesome 2D Games with the Horizon Game Engine</em>
    //     </h2>
    //     <div className='head-image'>
    //     </div>
    //     <p className='blurb'>
    //     Horizon Game Engine Gives you all the necessary tools you need to create 2D games. Letting you learn and focus on creating games!
    //     </p>
    //     <p className='blurb'>
    //       Horizon is a free and open-source so you don't have to worry about fees or royalties! All you have to do is create some games!
    //     </p>
    //     <button className = 'head-btn'>Download</button>
    //     <button className = 'head-btn'>Learn More</button>
    //   </div>
    // </div>