import React from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { saveAs } from "file-saver";
import * as FaIcons from "react-icons/fa";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import "./UploadFile.css";

function UploadFile() {
  const [show1, setMessage] = useState(false);
  const [show, setShow] = useState(!localStorage.getItem("authToken"));
  const [image, setImage] = useState({ preview: "", data: "" });
  const [games, setGames] = useState([]);
  const [size, setSize] = useState();
  const [profileImg, setState] = useState();
  const [game, setGameNAME] = useState();
  const [tag, setTag] = useState();
  const [description, setDescription] = useState();
  const [modalshow, setModalShow] = useState(false);

  useEffect(() => {
    fetch("/api/users/getfiles")
      .then((response) => response.json())
      .then((data) => setGames(data.data));
    $(document).ready(function () {
      LoadDataTable();
    });
  }, []);

  const LoadDataTable = () => {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  };
  const downloadImage = (image) => {
    saveAs(image, "image.jpg"); // Put your image url here.
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("authToken")) {
      setShow(true);
      return false;
    }
    let formData = new FormData();
    formData.append("file", image.data);
    formData.append("name", game);
    formData.append("description", description);
    formData.append("size", size);
    formData.append("tag", tag);
    formData.append(
      "username",
      !localStorage.getItem("authToken")
        ? "Test"
        : localStorage.getItem("userName")
    );
    console.log(formData);
    axios
      .post("/upload", formData, {
        headers: {
          "content-type": "multipart/formdata",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setMessage(true);
          fetchData();
        }
      });
  };

  const onFileChange = (event) => {
    console.log(event.target.files[0].size / 1024 / 1024);
    let size = event.target.files[0].size / 1024;
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setSize(size.toFixed(2));
    setImage(img);
  };
  const fetchData = () => {
    fetch("http://localhost:5000/api/users/getfiles")
      .then((response) => response.json())
      .then((data) => setGames(data.data));

    LoadDataTable();
  };

  const authToken = localStorage.getItem("authToken");
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  return (
    <>
      <Container>
        <Row>
          <Col lg={6} md={12}>
            <Card style={{ border: "none" }}>
              <Card.Title style={{ fontWeight: "700", fontSize: "4rem" }}>
                <FaIcons.FaGamepad style = {{paddingRight: "10px"}}/>
                Upload Games
              </Card.Title>
              <Card.Subtitle
                style={{
                  fontWeight: "500",
                  fontsize: "2rem",
                  paddingTop: "5%",
                  paddingBottom: "5%",
                }}
              >
                Upload your own games and Contribute to the Horizon community
              </Card.Subtitle>
            </Card>
          </Col>
          <Col lg={6} md={12}>
            <Card style={{ border: "none" }}>
              <Button
                className="upload-game-btn"
                onClick={handleShow}
                disabled={!authToken}
              >
                Upload Game
              </Button>
            </Card>
          </Col>
          <Modal show={modalshow} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Upload a Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Game Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) => setGameNAME(e.target.value)}
                    name="game"
                    placeholder="Enter Game Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) => setTag(e.target.value)}
                    name="tag"
                    placeholder="Enter Tags"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Upload File</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    onChange={onFileChange}
                    name="file"
                  />
                  {image.preview && (
                    <img src={image.preview} width="100" height="100" />
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    rows={3}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
        <Table responsive id="example" className="display">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Tag</th>
              <th>Uploaded By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games &&
              games.length > 0 &&
              games.map((userObj, index) => (
                <tr key={userObj.id}>
                  <td>{userObj.name}</td>
                  <td>{userObj.description}</td>
                  <td>{userObj.tag}</td>
                  <td>{userObj.username}</td>
                  {/* <td><a href={userObj.files} target="_blank" className="ml-2" download><img src={userObj.files} width="100px" height="100px"/></a></td> */}
                  <td>
                    <Button
                      className="table-btn"
                      onClick={() => downloadImage(userObj.files)}
                    >
                      Download({userObj.size + "Kb"})
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Tag</th>
              <th>Uploaded By</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </Table>
        {
          <Modal
            show={modalshow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <p>Please login to upload the file</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        }
      </Container>
    </>
  );
}

export default UploadFile;
