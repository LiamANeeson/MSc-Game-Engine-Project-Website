import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "./Community.css";
import * as Api from "../../features/APIs/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import moment from "moment";
import { Icon } from "@iconify/react";

const QuestionDetail = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState();

  const logedInUser = localStorage.getItem("AuthToken");

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

  const deleteQuestion = async () => {
    const [deleteErr, deleteRes] = await Api.deleteQuestion(id);
    if (deleteErr) {
      toast.error("Something went wrong.Try again later!");
    }
    if (deleteRes) {
      toast.success("Question deleted!");
      navigate("/community");
    }
  };

  const upVoteQuestion = async () => {
    const [voteErr, voteRes] = await Api.voteQuestion(id);
    if (voteErr) {
      toast.info("You already liked this question!");
    }
    if (voteRes) {
      toast.success("Question Liked!");
    }
  };

  const downVoteQuestion = async () => {
    const [voteErr, voteRes] = await Api.downVoteQuestion(id);
    if (voteErr) {
      toast.error("Something went wrong!");
    }
    if (voteRes) {
      toast.success("Success!");
    }
  };

  const followQuestion = async () => {
    const [followErr, followRes] = await Api.followQuestion(id);
    if (followErr) {
      toast.error("Something went wrong!");
    }
    if (followRes) {
      toast.success("Followed!");
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
              <div className="que-tags">
                {question?.tags.map((tag) => (
                  <span className="tag">{tag}</span>
                ))}
              </div>
              <div
                style={{
                  width: "30%",
                  marginLeft: "5px",
                  padding: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  disabled={!logedInUser}
                  variant="secondary"
                  onClick={() => followQuestion()}
                >
                  Follow
                </Button>

                <Button
                  disabled={!logedInUser}
                  variant="secondary"
                  onClick={() => upVoteQuestion()}
                >
                  <Icon
                    icon="ant-design:like-filled"
                    width="30px"
                    height="30px"
                    style={{ cursor: "pointer" }}
                  />
                </Button>

                <Button
                  disabled={!logedInUser}
                  variant="secondary"
                  onClick={() => downVoteQuestion()}
                >
                  <Icon
                    icon="ant-design:dislike-filled"
                    width="30px"
                    height="30px"
                    style={{ cursor: "pointer" }}
                  />
                </Button>

                {/*<div style={{ padding: "5px" }}>
                <Icon
                  icon="bxs:pencil"
                  width="30px"
                  height="30px"
                  style={{ cursor: "pointer" }}
                />
              </div>*/}

                <Button
                  disabled={!logedInUser}
                  variant="secondary"
                  onClick={() => deleteQuestion()}
                >
                  <Icon
                    icon="ant-design:delete-filled"
                    width="30px"
                    height="30px"
                    style={{ cursor: "pointer" }}
                  />
                </Button>
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
            {!logedInUser ? (
              <>
                <h5 style={{ color: "red" }}>Please login to post a answer.</h5>
              </>
            ) : (
              <>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Start writing your answer..."
                    onChange={onChangeAnswer}
                  />
                </Form.Group>
              </>
            )}

            <br />
            <br />
            {!logedInUser ? (
              <></>
            ) : (
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button variant="secondary" onClick={postAnswer}>
                  Post answer
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default QuestionDetail;
