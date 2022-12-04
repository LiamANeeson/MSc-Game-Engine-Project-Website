import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Community.css";
import * as Api from "../../features/APIs/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import moment from "moment";
import { Icon } from "@iconify/react";

import { createAnswer, createAnswerSchema } from '../../validation/postValidation'
import { Formik } from 'formik';

const QuestionDetail = (props) => {

  const messagesEndRef = React.createRef()

  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState();


  const [obj, setObj] = useState({});

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


  const postAnswer = async (data) => {

    if (obj && obj.data) {
      const [postAnswerErr, postAnswerRes] = await Api.createAnswer(obj.data._id, data.answer, 1);
      if (postAnswerRes) {
        window.location.reload();
        toast.success("Answer Posted!");
      }
    }
    else {
      const [postAnswerErr, postAnswerRes] = await Api.createAnswer(id, data.answer, 0);
      if (postAnswerRes) {
        window.location.reload();
        toast.success("Answer Posted!");
      }

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

  const upVoteQuestion = async (answer_id = "") => {
    if (answer_id) {
      const [voteErr, voteRes] = await Api.voteAnswer(answer_id);
      if (voteErr) {
        toast.info("You already liked this question!");
      }
      if (voteRes) {
        toast.success("Question Liked!");
      }
    }
    else {
      const [voteErr, voteRes] = await Api.voteQuestion(id);
      if (voteErr) {
        toast.info("You already liked this question!");
      }
      if (voteRes) {
        toast.success("Question Liked!");
      }
    }

  };

  const downVoteQuestion = async (answer_id = "") => {
    if (answer_id) {
      const [voteErr, voteRes] = await Api.downVoteAnswer(answer_id);
      if (voteErr) {
        toast.error("Something went wrong!");
      }
      if (voteRes) {
        toast.success("Success!");
      }

    }
    else {
      const [voteErr, voteRes] = await Api.downVoteQuestion(id);
      if (voteErr) {
        toast.error("Something went wrong!");
      }
      if (voteRes) {
        toast.success("Success!");
      }
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
                  disabled={!localStorage.getItem("authToken")}
                  variant="secondary"
                  onClick={() => followQuestion()}
                >
                  Follow
                </Button>

                <Button
                  disabled={!localStorage.getItem("authToken")}
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
                  disabled={!localStorage.getItem("authToken")}
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
                  disabled={!localStorage.getItem("authToken")}
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
            <div>
              {answers?.map((answer) => (
                <div style={{
                  border: "1px solid #ced4da",
                  padding: "10px",
                  margin: "6px 6px 20px 6px"
                }}>
                  <div style={{ display: "flex" }}>
                    <h6>
                      <p>
                        <Icon
                          icon="ant-design:user"
                          width="30px"
                          height="30px"

                          style={{ marginLeft: "5px", marginRight: "5px" }}
                        />{answer?.data?.userObj?.name}
                      </p>
                      <p>
                        <Icon
                          icon="ant-design:clock-circle"
                          width="30px"
                          height="30px"

                          style={{ marginLeft: "5px", marginRight: "5px" }}
                        />
                        {moment(answer.data.createdAt).fromNow()}
                      </p>

                    </h6>
                    &nbsp; <b>Vote : {answer.data.votes.length}</b>
                    &nbsp; <b>Comment : {answer.data.comment.length}</b>
                  </div>
                  <p>
                    <Icon
                      icon="ant-design:message"
                      width="30px"
                      height="30px"

                      style={{ marginLeft: "5px", marginRight: "5px" }}
                    />
                    {answer.data.content}</p>

                  <div style={{ marginBottom: "15px", border: "1px solid #ced4da", width: "200px", padding: "10px", backgroundColor: "yellow" }}>
                    <Icon
                      onClick={() => {
                        setObj(answer);
                        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      icon="ant-design:comment"
                      width="30px"
                      height="30px"
                      style={{ cursor: "pointer", marginLeft: "5px", marginRight: "5px" }}
                    />
                    <Icon
                      icon="ant-design:like-filled"
                      width="30px"
                      onClick={() => upVoteQuestion(answer.data._id)}

                      height="30px"
                      style={{ cursor: "pointer", marginLeft: "5px", marginRight: "5px" }}
                    />
                    &nbsp;&nbsp;
                    <Icon
                      icon="ant-design:dislike-filled"
                      width="30px"
                      height="30px"
                      onClick={() => downVoteQuestion(answer.data._id)}
                      style={{ cursor: "pointer", marginLeft: "5px", marginRight: "5px" }}
                    />&nbsp;&nbsp;
                  </div>

                  {
                    answer.data.comment && answer.data.comment.length >= 1 && answer.data.comment.map(row => {
                      return (
                        <>
                          <div style={{ marginLeft: "100px", border: "1px solid #ced4da", marginTop: "5px" }}>
                            <h6>
                              <p>
                                <Icon
                                  icon="ant-design:user"
                                  width="30px"
                                  height="30px"

                                  style={{ marginLeft: "5px", marginRight: "5px" }}
                                />{row.userObj.name}
                              </p>
                              <p>
                                <Icon
                                  icon="ant-design:clock-circle"
                                  width="30px"
                                  height="30px"

                                  style={{ marginLeft: "5px", marginRight: "5px" }}
                                />
                                {moment(row.userObj.createdAt).fromNow()}
                              </p>

                            </h6>
                            <p>
                              <Icon
                                icon="ant-design:message"
                                width="30px"
                                height="30px"

                                style={{ marginLeft: "5px", marginRight: "5px" }}
                              />
                              {row.content}</p>
                          </div>

                        </>
                      );
                    })
                  }
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
        <hr />
        <Card className="text-center" style={{ marginBottom: "5%" }}>
          <Card.Body>
            <Card.Text className="question-title">
              <div style={{ display: "flex" }}>
                <h2 className="question-title">
                  {
                    obj && obj.data && obj.data?.userObj?.name ? <>
                      <b>   {'Put Your your answer on comment:'} {obj.data.userObj.name}  </b>
                      <button onClick={() => { setObj(null) }} style={{ fontSize: "18px", color: "black", backgroundColor: "yellow" }}>Clear Selection</button></> : "Add your answer"
                  }
                </h2>
              </div>
            </Card.Text>
            <br />
            {!localStorage.getItem("authToken") ? (
              <>
                <h5 style={{ color: "red" }}>Please login to post a answer.</h5>
              </>
            ) : (
              <>
                                  <Formik
                                      initialValues={{
                                          answer: '',
                                      }}
                                      validationSchema={createAnswerSchema}
                                      onSubmit={postAnswer}
                                  >
                                      {({
                                          values,
                                          errors,
                                          handleSubmit,
                                          handleChange,
                                          handleBlur,
                                          touched
                                      }) => {
                                          return (
                                              <Form onSubmit={handleSubmit}>
                                                  <Form.Group ref={messagesEndRef} controlId="exampleForm.ControlTextarea1">
                                                      <Form.Control
                                                          as="textarea"
                                                          rows="3"
                                                          placeholder="Start writing your answer..."
                                                          name="answer"
                                                          onChange={handleChange}
                                                          onBlur={handleBlur}
                                                          value={values.answer}
                                                      />
                                                      {errors.answer && touched.answer ?
                                                          <div className="error-message">
                                                              {errors.answer}
                                                          </div> : null
                                                      }
                                                  </Form.Group>
                                                  <br />
                                                  <br />
                                                  {!localStorage.getItem("authToken") ? (
                                                      <></>
                                                  ) : (
                                                      <div style={{ display: "flex", justifyContent: "end" }}>
                                                              <Button variant="secondary" onClick={handleSubmit}>
                                                              Post answer
                                                          </Button>
                                                      </div>
                                                  )}
                                              </Form>
                                          )
                                      }}
                                  </Formik>
                
              </>
            )}

            
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default QuestionDetail;