import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import "./Home.css";
import PhysicsPic from "../../Assets/Images/physics_example.PNG";
import ScenePic from "../../Assets/Images/scene_example.png";
import ScriptingPic from "../../Assets/Images/scripting_example.jpg";
import CommunityPic from "../../Assets/Images/Gamer_Dev_Pic.jpg";

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
    </Container>
  );
}

export default Home;
