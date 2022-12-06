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
import "./QuestionDetail.css";

import {
  createCommentSchema,
  createAnswerSchema,
} from "../../validation/postValidation";
import { Formik } from "formik";

import * as AiIcons from "react-icons/ai";

const QuestionDetail = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState();
  const [isUpvotedByThisUser, setIsUpvotedByThisUser] = useState(false);
  const [isDownvotedByThisUser, setIsDownvotedByThisUser] = useState(false);

  const [showLoading, setShowLoading] = useState(true);
  const [answer_comment, setAnswerComment] = useState("");

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
        }

        if (response.data.isUpvotedByThisUser) setIsUpvotedByThisUser(true);
        if (response.data.isDownvotedByThisUser) setIsDownvotedByThisUser(true);

        setAnswers(ans);
        setShowLoading(false);
      }
      if (error) {
        setShowLoading(false);
        console.log(error);
      }
    };
    init();
  }, [Api.getQuestion, setAnswers, setShowLoading]);
  //  console.log( "selected" ,obj);

  const postAnswerComment = async (data) => {
    const [postAnswerErr, postAnswerRes] = await Api.createAnswer(
      obj.data._id,
      data.answer_comment,
      1
    );
    if (postAnswerRes) {
      window.location.reload();
      toast.success("Comment Posted!");
    }
  };

  const postAnswer = async (data) => {
    if (obj && obj.data) {
      const [postAnswerErr, postAnswerRes] = await Api.createAnswer(
        obj.data._id,
        data.answer,
        1
      );
      if (postAnswerRes) {
        window.location.reload();
        toast.success("Answer Posted!");
      }
    } else {
      const [postAnswerErr, postAnswerRes] = await Api.createAnswer(
        id,
        data.answer,
        0
      );
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
    } else {
      const [voteErr, voteRes] = await Api.voteQuestion(id);
      if (voteErr) {
        toast.info("You already liked this question!");
      }
      if (voteRes) {
        toast.success("Question Liked!");
        setIsUpvotedByThisUser(true);
        setIsDownvotedByThisUser(false);
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
    } else {
      const [voteErr, voteRes] = await Api.downVoteQuestion(id);
      if (voteErr) {
        toast.error("Something went wrong!");
      }
      if (voteRes) {
        toast.success("Success!");
        setIsUpvotedByThisUser(false);
        setIsDownvotedByThisUser(true);
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
        {showLoading ? <div className="loadingDiv"></div> : ""}

        <Card
          className="text-center"
          style={{
            height: "fix-layout",
            border: "none",
            backgroundColor: "#c0c0c045",
          }}
        >
          <Card.Body style={{ width: "100%" }}>
            <Card.Text className="question-title">
              <div style={{ display: "flex" }}>
                <h2 className="q-title">{question?.name}</h2>
              </div>
              <div>
                <p>{question?.description}</p>
              </div>
            </Card.Text>

            <div className="que-tags">
              {question?.tags.map((tag) => (
                <span className="tag">{tag}</span>
              ))}
            </div>
            <div className="question-interactions">
              <Button
                className="question-btn"
                disabled={!localStorage.getItem("authToken")}
                onClick={() => followQuestion()}
              >
                <p className="follow-btn">Follow</p>
              </Button>

              <Button
                className="question-btn"
                disabled={!localStorage.getItem("authToken")}
                onClick={() => upVoteQuestion()}
              >
                <AiIcons.AiFillLike
                  size={40}
                  style={{ color: isUpvotedByThisUser ? "green" : null }}
                />
              </Button>

              <Button
                className="question-btn"
                disabled={!localStorage.getItem("authToken")}
                onClick={() => downVoteQuestion()}
              >
                <AiIcons.AiFillDislike
                  size={40}
                  style={{ color: isDownvotedByThisUser ? "red" : null }}
                />
              </Button>
              <Button
                className="question-btn"
                disabled={!localStorage.getItem("authToken")}
                onClick={() => deleteQuestion()}
              >
                <AiIcons.AiFillDelete size={40} />
              </Button>
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
                <h2 className="answer-heading">
                  {question?.answers?.length} Answers
                </h2>
              </div>
              <hr />
            </Card.Text>
            <div>
              {answers?.map((answer) => (
                <div className="answer-gird" key={answer.data._id}>
                  <div className="like-dislike">
                    <div className="count-like">
                      <Icon
                        icon="ant-design:like"
                        width="1rem"
                        onClick={() => upVoteQuestion(answer.data._id)}
                        height="1rem"
                        style={{
                          cursor: "pointer",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                      />
                      <div className="count-middle">
                        {answer?.data?.votes?.length}
                      </div>
                      <Icon
                        icon="ant-design:dislike"
                        width="1rem"
                        height="1rem"
                        onClick={() => downVoteQuestion(answer.data._id)}
                        style={{
                          cursor: "pointer",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="answer-detail">
                    <div>{answer.data.content}</div>
                    <div className="other-section">
                      <div className="answer-detail-comment">
                        <button
                          onClick={() => {
                            setObj(answer);
                          }}
                          className="answer-detail-commen-button"
                        >
                          <span>
                            Comment
                            {/* {
                              answer.data.comment.length ?
                                <sup className="comment-count">{answer.data.comment.length}</sup>
                                : ""
                            } */}
                          </span>
                        </button>
                      </div>
                      <div className="comment-userinfo">
                        <div className="comment-userinfo-img">
                          <div className="question-user-name">
                            <Icon
                              icon="ant-design:user"
                              width="30px"
                              height="30px"
                            />
                            {answer?.data?.userObj?.name}
                          </div>
                          <div className="question-user-date">
                            {moment(answer.data.createdAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="answer-comment">
                    <div className="answer-commnet-list">
                      <ul className="answer-comment-ul">
                        {answer.data.comment &&
                          answer.data.comment.length >= 1 &&
                          answer.data.comment.map((row) => {
                            return (
                              <>
                                <li key={row._id} className="answer-comment-li">
                                  <div className="answer-commnet-li-div">
                                    <div className="ant-comment-content-author">
                                      <span className="ant-comment-content-author-name">
                                        {row.userObj.name}
                                      </span>
                                      <span className="ant-comment-content-author-time">
                                        <span>
                                          {moment(
                                            row.userObj.createdAt
                                          ).fromNow()}
                                        </span>
                                      </span>
                                    </div>
                                    <div className="ant-comment-content-detail">
                                      <div className="custom-md-style">
                                        <p> {row.content}</p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                    <div
                      className="answer-comment-text"
                      style={{
                        display:
                          obj?.data?._id == answer.data._id ? "block" : "none",
                      }}
                    >
                      <h2 className="question-title">Post your comment</h2>
                      <br />
                      {!localStorage.getItem("authToken") ? (
                        <>
                          <h5 style={{ color: "red" }}>
                            Please login to post a Comment.
                          </h5>
                        </>
                      ) : (
                        <>
                          <Formik
                            initialValues={{
                              answer_comment: "",
                            }}
                            validationSchema={createCommentSchema}
                            onSubmit={postAnswerComment}
                          >
                            {({
                              values,
                              errors,
                              handleSubmit,
                              handleChange,
                              handleBlur,
                              touched,
                            }) => {
                              return (
                                <Form onSubmit={handleSubmit}>
                                  <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control
                                      as="textarea"
                                      rows="3"
                                      placeholder="Start writing your comment..."
                                      name="answer_comment"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.answer_comment}
                                    />
                                    {errors.answer_comment &&
                                    touched.answer_comment ? (
                                      <div className="error-message">
                                        {errors.answer_comment}
                                      </div>
                                    ) : null}
                                  </Form.Group>
                                  <br />
                                  <br />
                                  {!localStorage.getItem("authToken") ? (
                                    <></>
                                  ) : (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "end",
                                        marginTop: "1rem",
                                      }}
                                    >
                                      <Button
                                        className="cancel-button"
                                        variant="secondary"
                                        onClick={() => {
                                          setObj({});
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        className="post-button"
                                        variant="secondary"
                                        onClick={handleSubmit}
                                      >
                                        Post Comment
                                      </Button>
                                    </div>
                                  )}
                                </Form>
                              );
                            }}
                          </Formik>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
        <Card className="text-center" style={{ marginBottom: "5%" }}>
          <Card.Body>
            <Card.Text className="question-title">
              <div style={{ display: "flex" }}>
                <h2 className="question-title">Add your answer</h2>
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
                    answer: "",
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
                    touched,
                  }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Control
                            as="textarea"
                            rows="3"
                            placeholder="Start writing your answer..."
                            name="answer"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.answer}
                          />
                          {errors.answer && touched.answer ? (
                            <div className="error-message">{errors.answer}</div>
                          ) : null}
                        </Form.Group>
                        <br />
                        <br />
                        {!localStorage.getItem("authToken") ? (
                          <></>
                        ) : (
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <Button variant="secondary" onClick={handleSubmit}>
                              Post answer
                            </Button>
                          </div>
                        )}
                      </Form>
                    );
                  }}
                </Formik>
              </>
            )}

            <br />
            <br />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default QuestionDetail;
