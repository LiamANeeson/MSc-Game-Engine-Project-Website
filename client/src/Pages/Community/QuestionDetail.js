import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./Community.css";
import * as Api from "../../features/APIs/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import moment from "moment";

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

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const postAnswer = async () => {
    const [postAnswerErr, postAnswerRes] = await Api.createAnswer(id, answer);
    if (postAnswerRes) {
      window.location.reload();
      toast.success("Answer Posted!");
    }
  };

  return (
    <>
      <div style={{ padding: "10px" }}>
        <Card
          className="text-center"
          style={{
            height: "fix-layout",
            border: "none",
            backgroundColor: "#D3D3D3",
          }}
        >
          <Card.Body style={{ width: "100%" }}>
            <Card.Text className="question-title">
              <div style={{ display: "flex" }}>
                <h2 className="question-title">{question?.title}</h2>
              </div>
              <div>
                <p>{question?.description}</p>
              </div>
            </Card.Text>

            <div style={{ display: "flex" }}>
              <Button variant="secondary">Follow</Button>{" "}
              <div className="que-tags">
                {question?.tags.map((tag) => (
                  <span className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
        <hr />
        <Card
          // className="text-center"
          style={{ width: "70%", height: "fix-layout", border: "none" }}
        >
          <Card.Body>
            <Card.Text className="question-title">
              <div style={{ display: "flex" }}>
                <h2 className="question-title">
                  {question?.answers?.length} Answers
                </h2>
              </div>
            </Card.Text>
            <div>
              {answers?.map((answer) => (
                <>
                  <div style={{ display: "flex" }}>
                    <h6>
                      user1{" "}
                      {moment(answer.data.createdAt).format(
                        "DD-MM-YYYY,h:mm a"
                      )}
                    </h6>
                  </div>
                  <p>{answer.data.content}</p>
                </>
              ))}
            </div>
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
                onChange={onChangeAnswer}
              />
            </Form.Group>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button variant="secondary" onClick={postAnswer}>
                Post answer
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default QuestionDetail;
