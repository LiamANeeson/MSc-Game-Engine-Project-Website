import React from "react";
import { Container, Row, Col, Card, Button, NavLink } from "react-bootstrap";

import "./Home.css";

import * as HiIcons from "react-icons/hi";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";

// Row = 12 cols or 100%
function Home() {
  let iconStyles = { fontSize: "7rem", marginLeft: "6rem" , marginBottom: "3rem"};

  return (
    <Container fluid>
      {/* ********** Main Section ********** */}
      <Row style={{ backgroundColor: "white" }}>
        <Col>
          <h1 className="title">HorizonGE</h1>
          <h2 className="sub-title">
            Learn to make awesome 2D games with <br></br>
            the Horizon Game Engine!
          </h2>
        </Col>
        <Col>
          <button className="downlad-cta">Get Started</button>
          <button className="game-cta">Game</button>
        </Col>
      </Row>
      {/* ********** End Main Section ********** */}
      {/* ********** Section Section ********** */}
      <Row style={{ backgroundColor: "#009DDC", padding: "2rem"}}>
        <h3 className="section-title">Why Horizon?</h3>
        <div className="highlight"></div>
        <Col>
          <Card className="custom-card" style = {{backgroundColor: "#009DDC", border: "none"}}>
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
        <Col>
          <Card className="custom-card" style = {{backgroundColor: "#009DDC", border: "none"}}>
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
        <Col>
          <Card className="custom-card" style = {{backgroundColor: "#009DDC", border: "none"}}>
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
      <Row style={{ 
        backgroundColor: "#009B72", 
        height: "34rem", 
        padding: "2rem"
        }}>
        <h2 className="section-title">Features</h2>
        <Col>
          <Card className="custom-card" style = {{backgroundColor: "#009B72", border: "none"}}>
            <BsIcons.BsCameraReels style={iconStyles} />
            <Card.Title style={{ fontWeight: "800" }}>Multiple Cameras</Card.Title>
            <Card.Text style={{ height: "8rem" }}>
              The Horizon Game Engine allows you to make games from multiple
              perspectives. If you want to make platformers or top down games
              Horizon has got you covered!
            </Card.Text>
            <Button className="learnMoreBtns">See More About Cameras</Button>
          </Card>
        </Col>
        <Col>
          <Card className="custom-card" style = {{backgroundColor: "#009B72", border: "none", }}>
            <GiIcons.GiMaterialsScience style={iconStyles} />
            <Card.Title style={{ fontWeight: "800" }}>Physics</Card.Title>
            <Card.Text style={{ height: "8rem" }}>
              Add Physics Rigid Bodies and Coliders to all objects in our game
              using our physics system.
            </Card.Text>
            <Button className="learnMoreBtns">See More On Physics</Button>
          </Card>
        </Col>
        <Col>
          <Card className="custom-card" style = {{backgroundColor: "#009B72", border: "none"}}>
            <HiIcons.HiDesktopComputer style={iconStyles} />
            <Card.Title style={{ fontWeight: "800" }}>Custom API</Card.Title>
            <Card.Text style={{ height: "8rem" }}>
              The Horizon Game Engine was built using a custom API which is
              available to anyone. So if you want to view the source code and
              use it directly you can!
            </Card.Text>
            <Button className="learnMoreBtns">See Custom API</Button>
          </Card>
        </Col>
        <Col>
          <Card className="custom-card" style = {{backgroundColor: "#009B72", border: "none"}}>
            <BiIcons.BiCodeAlt style={iconStyles} />
            <Card.Title style={{ fontWeight: "800" }}>Scripting</Card.Title>
            <Card.Text style={{ height: "8rem" }}>
              Add Scipts to objects in your game using C# or using our visual
              scripting node editor
            </Card.Text>
            <Button className="learnMoreBtns">See More About Scripting</Button>
          </Card>
        </Col>
      </Row>
      {/* ********** End of Third Section ********** */}
      <Row style={{ backgroundColor: "#6761A8", height: "18rem", padding: "2rem" }}>
        <h2 className="section-title">Get Involved</h2>
        <Col>
          <Card className="custom-card" style = {{backgroundColor: "#6761A8", border: "none"}}>
            <Card.Title style={{ fontWeight: "800" }}>Tutorial</Card.Title>
            <Card.Body>
              Take a look at our tutorials so you can start building games
            </Card.Body>
            <Button className="learnMoreBtns">View Tutorials</Button>
          </Card>
        </Col>
        <Col>
          <Card className="custom-card" style = {{backgroundColor: "#6761A8", border: "none"}}>
            <Card.Title style={{ fontWeight: "800" }}>Community</Card.Title>
            <Card.Body>
              Got a question? Ask the Horizon Engine Community{" "}
            </Card.Body>
            <Button className="learnMoreBtns">Community Section</Button>
          </Card>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "#009DDC", height: "10rem", padding: "2rem" }}>
        <h2 className="section-title">Thanks!</h2>
        <Col>
          The Horizon Game Engine Could not have been made without the help of
          colleagues, friends and family so thanks to them all
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
