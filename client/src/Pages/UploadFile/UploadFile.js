import React from "react";

import { Container, Row, Col, Card, Modal, Form, Button, Table } from "react-bootstrap";
import { useState, useEffect } from 'react'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { saveAs } from 'file-saver'

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';


function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <p style={{ marginTop: "1rem", marginLeft: "1rem" }}>
                    <svg style={{ color: "orange" }} viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle"
                        width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path>
                    </svg>
                    &nbsp;You need to sign in to perform this operation

                    <br />
                    <div style={{ float: "right", marginTop: "24px" }}>
                        <button type="button" onClick={props.onHide} className='login-cancel-button'><span>Cancel</span></button>
                        <button type="button" className='login-do-button'>
                            <a href='/login' style={{ color: "white" }}>
                                <span>Sign in</span>
                            </a></button>
                    </div>
                </p>
            </Modal.Body>
        </Modal>
    );
}


function UploadFile() {

    const [show1, setMessage] = useState(false);
    const [show, setShow] = useState(false);
    const [image, setImage] = useState({ preview: '', data: '' })
    const [games, setGames] = useState([]);
    const [size, setSize] = useState();
    const [profileImg, setState] = useState();
    const [game, setGameNAME] = useState();
    const [tag, setTag] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {

        fetch("/api/users/getfiles")
            .then((response) => response.json())
            .then((data) => setGames(data.data));
        $(document).ready(function () {
            LoadDataTable()
        });
    }, [])

    const handleClose = () => setShow(false);

    const LoadDataTable = () => {
        setTimeout(function () {
            $('#example').DataTable();
        }, 1000);
    }
    const downloadImage = (image) => {
        saveAs(image, 'image.jpg') // Put your image url here.
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!localStorage.getItem('authToken')) {
            setShow(true);
            return false;
        }
        let formData = new FormData()
        formData.append('file', image.data)
        formData.append('name', game)
        formData.append('description', description)
        formData.append('size', size)
        formData.append('tag', tag)
        formData.append('username', !localStorage.getItem("authToken") ? 'Test' : localStorage.getItem("userName"))
        console.log(formData);
        axios.post("/upload", formData, {
            headers: {
                "content-type": "multipart/formdata"
            }
        }).then(res => {
            console.log(res);
            if (res.status == 200) {
                setMessage(true)
                fetchData();
            }
        })
    }

    const onFileChange = event => {
        console.log(event.target.files[0].size / 1024 / 1024);
        let size = event.target.files[0].size / 1024
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        }
        setSize(size.toFixed(2))
        setImage(img)
    }
    const fetchData = () => {
        fetch("http://localhost:5000/api/users/getfiles")
            .then((response) => response.json())
            .then((data) => setGames(data.data));

        LoadDataTable()
    }

    return (
        <Container>

            <Row>
                <Col md={6} className="my-5 ">
                    <Card className="p-4 ">
                        <img src="https://3d-ace.com/wp-content/uploads/background_picture_for_2d_game-550x309.jpg" width="100%" />
                        <h3 className=" mb-3">Upload your own games and Contribute to community</h3>
                        <p>Are you excited to upload your own game and announce to world that you are developing cool games using HorizonEngine.</p>
                        <hr />
                        <p>You can also download other developers games also. Thats what we call Share and Care !!!
                        </p>
                    </Card>
                </Col>
                <Col md={6} className="my-5">
                    {
                        show1 ?
                            <Alert variant="danger" >
                                <Alert.Heading>Game Upload Successfully!</Alert.Heading>
                            </Alert>
                            : ''
                    }

                    <Card className="p-4">
                        <div className="text-center">
                            <h3>Upload Game</h3>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Game Name</Form.Label>
                                <Form.Control required type="text" onChange={(e) => setGameNAME(e.target.value)} name="game" placeholder="Enter Game Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Tag</Form.Label>
                                <Form.Control required type="text" onChange={(e) => setTag(e.target.value)} name="tag" placeholder="Enter Game Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Upload File</Form.Label>
                                <Form.Control required type="file" onChange={onFileChange} name="file" />
                                {image.preview && <img src={image.preview} width='100' height='100' />}

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control required as="textarea" onChange={(e) => setDescription(e.target.value)} name="description" rows={3} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card>


                </Col>
            </Row>
            <Table id="example" className="display">
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
                    {games && games.length > 0 && games.map((userObj, index) => (
                        <tr key={userObj.id}>
                            <td>{userObj.name}</td>
                            <td>{userObj.description}</td>
                            <td>{userObj.tag}</td>
                            <td>{userObj.username}</td>
                            {/* <td><a href={userObj.files} target="_blank" className="ml-2" download><img src={userObj.files} width="100px" height="100px"/></a></td> */}
                            <td>
                                <Button variant="primary" onClick={() => downloadImage(userObj.files)}>Download({userObj.size + "Kb"})</Button>
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
            <MyVerticallyCenteredModal
                show={show}
                onHide={() => setShow(false)}
            />
        </Container>

    );
}

export default UploadFile