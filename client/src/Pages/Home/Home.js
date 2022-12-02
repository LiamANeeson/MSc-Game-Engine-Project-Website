import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

import "./Home.css";
import PhysicsPic from "../../Assets/Images/physics_example.PNG";
import ScenePic from "../../Assets/Images/scene_example.png";
import ScriptingPic from "../../Assets/Images/scripting_example.jpg";
import CommunityPic from "../../Assets/Images/Gamer_Dev_Pic.jpg";
import GameEngineMedium from "../../Assets/Images/Game_Engine_Medium.PNG";
import Game2D from "../../Assets/Images/game_art_1.PNG";

// Row = 12 cols or 100%
function Home() {
  return (
    <Container className="home-container">
      <Row>
        <Col>
          <Card className="text-center mt-5">
            <Card.Body>
              <Card.Title className="fs-1 fw-bold">Build 2D Games</Card.Title>
              <Card.Text className="fw-bold">
                Create Awesome 2D Games with the Horizon Game Engine
              </Card.Text>
              <Card.Text>
                Horizon Game Engine Gives you all the necessary tools you need
                to create 2D games. Letting you learn and focus on creating
                games!
              </Card.Text>
              <Card.Text>
                Horizon is a free and open-source so you don't have to worry
                about fees or royalties! All you have to do is create some
                games!
              </Card.Text>
              <Button
                href="/download"
                variant="primary"
                className="home-cta-btn"
              >
                Download HorizonGE
              </Button>
              <Button
                href="/download"
                variant="primary"
                className="game-cta-btn"
              >
                Download Dark Trails Game
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="custom-row">
        <Col lg={3} sm={6}>
          <Card className="custom-card text-center mt-5 mb-5">
            <Card.Img src={PhysicsPic} style={{ height: "14rem" }} />
            <Card.Body>
              <Card.Title>Physics</Card.Title>
            </Card.Body>
            <Card.Footer>
              <Button href="/About" variant="primary" className="home-cta-btn">
                Learn More
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card className="text-center mt-5 mb-5">
            <Card.Img src={ScenePic} style={{ height: "14rem" }} />
            <Card.Body>
              <Card.Title>Scene Managment</Card.Title>
            </Card.Body>
            <Card.Footer>
              <Button href="/About" variant="primary" className="home-cta-btn">
                Learn More
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card className="text-center mt-5 mb-5">
            <Card.Img src={ScriptingPic} style={{ height: "14rem" }} />
            <Card.Body>
              <Card.Title>Scripting</Card.Title>
            </Card.Body>
            <Card.Footer>
              <Button href="/About" variant="primary" className="home-cta-btn">
                Learn More
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card className="text-center mt-5 mb-5">
            <Card.Img src={CommunityPic} style={{ height: "14rem" }} />
            <Card.Body>
              <Card.Title>Horizon Community</Card.Title>
            </Card.Body>
            <Card.Footer>
              <Button href="/About" variant="primary" className="home-cta-btn">
                Learn More
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={6}>
          <Card style = {{border: "none", padding: "50px"}}>
            <Card.Title>Features</Card.Title>
            <ListGroup>
              <ListGroup.Item  style = {{border: "none", padding: "25px 25px" }}>
                <strong>Custom API: </strong>
                The Horizon The Horizon Engine uses it's own custom API making
                it platform and library agnostic.
              </ListGroup.Item>
              <ListGroup.Item style = {{border: "none", padding: "25px 25px"  }}>
                <strong>Physics System: </strong>
                Add rigid body physics to any objects added to the scene.
              </ListGroup.Item>
              <ListGroup.Item style = {{border: "none", padding: "25px 25px" }}>
                <strong>Scripting: </strong>
                Add Scripts to game objects using scripting!
              </ListGroup.Item>
              <ListGroup.Item style = {{border: "none", padding: "25px 25px" }}>
                <strong>Community Driven: </strong>
                Join our community and learn more about the Horizon Game Engine
                using our community section
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={6} sm={6}>
          <Card style = {{border: "none", paddingTop: "50px"}}>
            <Card.Img variant="bottom" src={GameEngineMedium} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={6}>
          <Card style = {{border: "none", paddingTop: "50px"}}>
            <Card.Title>Creating 2D Games</Card.Title>
            <ListGroup>
              <ListGroup.Item style = {{ border: "none", padding: "25px 25px" }}>
                <strong>Multiple Camera Angles: </strong>
                Developers will be able to utilise a top-down and side scroll
                camera angle in their games.
              </ListGroup.Item>
              <ListGroup.Item style = {{ border: "none", padding: "25px 25px" }}>
                <strong>Audio: </strong>
                Add audio to any game objects
              </ListGroup.Item>
              <ListGroup.Item style = {{ border: "none", padding: "25px 25px"  }}>
                <strong>Logging & Debugging: </strong>
                Check for any bugs or errors using our inbuilt logging system
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={6} sm={6}>
          <Card style = {{border: "none"}}>
            <Card.Img variant="bottom" src={Game2D} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={6}>
          <Card style = {{border: "none", paddingTop: "50px"}}>
          <Card.Title>Scripting</Card.Title>
            <ListGroup style = {{border: "none"}}>
              <ListGroup.Item style = {{ border: "none",padding: "25px 25px" }}>
                <strong>Visual Scripting: </strong>
                Create logic for game obejcts using visual drag-and-drop graphs
                instead of writing code!
              </ListGroup.Item>
              <ListGroup.Item style = {{ border: "none",padding: "25px 25px" }}>
                <strong>Focus on Creating Games: </strong>
                Visual scripting empowers users to focus on creating awesome
                games not writing code
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={6} sm={6}>
          <Card style = {{border: "none"}}>
            <Card.Title style = {{padding: "25px"}}>Picture</Card.Title>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
