import React from "react";
import { Container, Row, Col, Card, Button, NavLink } from "react-bootstrap";

import "./Home.css";

// Row = 12 cols or 100%
function Home() {
  let iconStyles = {
    fontSize: "7rem",
    marginLeft: "6rem",
    marginBottom: "3rem",
  };

  return (
    <Container fluid>
      {/* ********** Main Section ********** */}
      <Row style={{ backgroundColor: "white" }}>
        <Col sm={12} md = {12} lg = {6}>
          <Card className = "custom-cardOne" style={{ border: "none" }}>
            <Card.Title className = "title">Horizon</Card.Title>
            <Card.Subtitle className = "sub-title">
              Learn to make awesome 2D games with <br></br>
              the Horizon Game Engine!
            </Card.Subtitle>
          </Card>
        </Col>
        <Col sm={12} md = {12} lg = {6}>
          <Card  className = "custom-cardOne" style={{ border: "none" }}>
            <Button className = "download-cta" href="/download">Get Started</Button>
            <Button className = "game-cta" href="/download">Download Game</Button>
          </Card>
        </Col>
      </Row>
      {/* ********** End Main Section ********** */}
      {/* ********** Section Section ********** */}
      <Row style={{ backgroundColor: "#8ECAE6", padding: "2rem" }}>
        <h3 className="section-title">Why Horizon?</h3>
        <Col sm={12} md={4} lg={4}>
          <Card
            className="custom-card"
            style={{ backgroundColor: "#8ECAE6", border: "none" }}
          >
            <Card.Title style={{ fontWeight: "800" }}>
              Make Your Own Games
            </Card.Title>
            <Card.Text>
              Horizon Engine Includes all the features you need so you can make
              any 2D game you want. Add Physics, Audio and include any sprite
              sheet that you want!
            </Card.Text>
          </Card>
        </Col>
        <Col sm={12} md={4} lg={4}>
          <Card
            className="custom-card"
            style={{ backgroundColor: "#8ECAE6", border: "none" }}
          >
            <Card.Title style={{ fontWeight: "800" }}>
              Make Your Own Games
            </Card.Title>
            <Card.Text>
              Horizon Engine Includes all the features you need so you can make
              any 2D game you want. Add Physics, Audio and include any sprite
              sheet that you want!
            </Card.Text>
          </Card>
        </Col>
        <Col sm={12} md={4} lg={4}>
          <Card
            className="custom-card"
            style={{ backgroundColor: "#8ECAE6", border: "none" }}
          >
            <Card.Title style={{ fontWeight: "800" }}>
              Make Your Own Games
            </Card.Title>
            <Card.Text>
              Horizon Engine Includes all the features you need so you can make
              any 2D game you want. Add Physics, Audio and include any sprite
              sheet that you want!
            </Card.Text>
          </Card>
        </Col>
      </Row>
      {/* ********** End of Second Section ********** */}
      {/*  ********** Third Section ********** */}
      <Row
        style={{
          backgroundColor: "#219EBC",
          padding: "2rem",
        }}
      >
        <h2 className="section-title">Features</h2>
        <Col lg={3} md={6} sm={12}>
          <Card
            className="custom-card"
            style={{ backgroundColor: "#219EBC", border: "none" }}
          >
            <Card.Title style={{ fontWeight: "800" }}>
              Multiple Cameras
            </Card.Title>
            <Card.Text style={{ height: "8rem" }}>
              The Horizon Game Engine allows you to make games from multiple
              perspectives. If you want to make platformers or top down games
              Horizon has got you covered!
            </Card.Text>
            <Button className="learnMoreBtns">See More About Cameras</Button>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card
            className="custom-card"
            style={{ backgroundColor: "#219EBC", border: "none" }}
          >
            <Card.Title style={{ fontWeight: "800" }}>Physics</Card.Title>
            <Card.Text style={{ height: "8rem" }}>
              Add Physics Rigid Bodies and Coliders to all objects in our game
              using our physics system.
            </Card.Text>
            <Button className="learnMoreBtns" href="/tutorial/physics">See More On Physics</Button>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card
            className="custom-card"
            style={{ backgroundColor: "#219EBC", border: "none" }}
          >
            <Card.Title style={{ fontWeight: "800" }}>Custom API</Card.Title>
            <Card.Text style={{ height: "8rem" }}>
              The Horizon Game Engine was built using a custom API which is
              available to anyone. So if you want to view the source code and
              use it directly you can!
            </Card.Text>
            <Button className="learnMoreBtns" href="/docs">See Custom API</Button>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card
            className="custom-card"
            style={{ backgroundColor: "#219EBC", border: "none" }}
          >
            <Card.Title style={{ fontWeight: "800" }}>Scripting</Card.Title>
            <Card.Text style={{ height: "8rem" }}>
              Add Scipts to objects in your game using C# or using our visual
              scripting node editor
            </Card.Text>
            <Button className="learnMoreBtns" href="/tutorial/scripting">See More About Scripting</Button>
          </Card>
        </Col>
      </Row>
      {/* ********** End of Third Section ********** */}
      <Row style={{ backgroundColor: "#8ECAE6", padding: "2rem" }}>
        <h2 className="section-title">Get Involved</h2>
        <Col sm={6}>
          <Card
            className="custom-card"
            style={{ backgroundColor: "#8ECAE6", border: "none" }}
          >
            <Card.Title style={{ fontWeight: "800" }}>Tutorial</Card.Title>
            <Card.Body>
              Take a look at our tutorials so you can start building games
            </Card.Body>
            <Button className="learnMoreBtns" href="/tutorial">View Tutorials</Button>
          </Card>
        </Col>
        <Col sm={6}>
          <Card
            className="custom-card"
            style={{ backgroundColor: "#8ECAE6", border: "none" }}
          >
            <Card.Title style={{ fontWeight: "800" }}>Community</Card.Title>
            <Card.Body>
              Got a question? Ask the Horizon Engine Community{" "}
            </Card.Body>
            <Button className="learnMoreBtns" href="/community">Community Section</Button>
          </Card>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "white", padding: "2rem" }}>
        <h2 className="section-title">Thanks!</h2>
        <Col>
          <Card
            className="custom-card"
            style={{
              backgroundColor: "white",
              border: "none",
              paddingBottom: "30px",
            }}
          >
            <Card.Body>
              The Horizon Game Engine Could not have been made without the help
              of colleagues, friends and family so thanks to them all
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
