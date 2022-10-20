import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as Api from "../../features/APIs/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Community.css";

const AskQuestion = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  console.log(tags)

  //onChange Handler
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeTags = (e) => {
    setTags(e.target.value);
  };

  const askQuestionOnClickHandler = async () => {
    const [err, res] = await Api.createQuestion(title, description, tags);
    if (err) {
      toast.error("Something went wrong.Please try again later!");
    }
    if (res) {
      //   console.log(res);
      toast.success("Question Created!");
      navigate("/community");
    }
  };
  return (
    <Container
      className="text-center"
      style={{ width: "80%", backgroundColor: "white", marginTop: "2%" }}
    >
      <Card className="text-center" style={{ height: "fix-layout", border: "none" }}>
        <Card.Body>
          <Card.Text className="question-title">
            <h2 className="question-title">Ask a question</h2>
          </Card.Text>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={onChangeTitle} />
          </Form.Group>
          <br />
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={onChangeDescription}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              placeholder="Separated by comma"
              onChange={onChangeTags}
            />
          </Form.Group>
          <br />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={askQuestionOnClickHandler} variant="primary">
              Create a question
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AskQuestion;
