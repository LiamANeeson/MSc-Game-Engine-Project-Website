import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./Community.css";
import * as Api from "../../features/APIs/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const QuestionDetail = (props) => {
    const { id } = useParams();
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState();
    useEffect(() => {
        const init = async () => {
            const [error, response] = await Api.getQuestion(id);
            if (response) {
                setQuestion(response.data);
                let ans = [];
                let answerID = response?.data?.answers?.map((answer) => answer);
                for (let i = 0; i < answerID.length; i++) {
                    const [err, res] = await Api.getAnswer(answerID[i]);
                    ans.push(res);
                    setAnswers(ans);
                }
            }
            if (error) {
                console.log(error);
            }
        };
        init();
    }, []);

    return (
        <Container
            className="text-center"
            style={{
                width: "100%",
                backgroundColor: "white",
                marginTop: "2%",
                padding: "10px",
            }}
        >
            <div style={{ display: "flex" }}>
                <div>
                    <Card
                        className="text-center"
                        style={{ height: "fix-layout", border: "none" }}
                    >
                        <Card.Body style={{ width: "80%" }}>
                            <Card.Text className="question-title">
                                <div style={{ display: "flex" }}>
                                    <h2 className="question-title">{question?.title}</h2>
                                </div>
                                <div>
                                    <p>{question?.description}</p>
                                </div>
                            </Card.Text>

                            <div style={{ display: "flex" }}>
                                <Button variant="secondary" style={{ marginRight: "5px" }}>
                                    Follow
                                </Button>{" "}
                                <Button variant="secondary">Comment</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card
                        // className="text-center"
                        style={{ width: "70%", height: "fix-layout", border: "none" }}
                    >
                        <Card.Body>
                            <Card.Text className="question-title">
                                <div style={{ display: "flex" }}>
                                    <h2 className="question-title">Tags</h2>
                                </div>
                            </Card.Text>
                            <div style={{ display: "flex" }}>
                                {question?.tags.map((tag) => (
                                    <span className="tag">{tag}</span>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <hr />
            <Card
                className="text-center"
                style={{ width: "100%", height: "fix-layout", border: "none" }}
            >
                <Card.Body>
                    <Card.Text className="question-title">
                        <div style={{ display: "flex" }}>
                            <h2 className="question-title">
                                {question?.answers?.length} Answers
                            </h2>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <hr />
            <Card className="text-center" style={{ marginBottom: "5%" }}>
                <Card.Body>
                    <Card.Text className="question-title">
                        <div style={{ display: "flex" }}>
                            <h2 className="question-title">Add your answer</h2>
                        </div>
                    </Card.Text>
                    <br />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            rows="3"
                            placeholder="Start writing your answer..."
                        // onChange={onChangeDescription}
                        />
                    </Form.Group>
                    <br />
                    <br />
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button variant="primary">Post answer</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default QuestionDetail;