import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Community.css";
import * as Api from "../../features/APIs/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import moment from "moment";
import { Icon } from "@iconify/react";
import "./QuestionDetail.css";
import Modal from "react-bootstrap/Modal";

import {
    createCommentSchema,
    createAnswerSchema,
} from "../../validation/postValidation";
import { Formik } from "formik";

import * as AiIcons from "react-icons/ai";

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
                    <svg
                        style={{ color: "orange" }}
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="exclamation-circle"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path>
                    </svg>
                    &nbsp;You need to sign in to perform this operation
                    <br />
                    <div style={{ float: "right", marginTop: "24px" }}>
                        <button
                            type="button"
                            onClick={props.onHide}
                            className="login-cancel-button"
                        >
                            <span>Cancel</span>
                        </button>
                        <button type="button" className="login-do-button">
                            <a href="/login" style={{ color: "white" }}>
                                <span>Sign in</span>
                            </a>
                        </button>
                    </div>
                </p>
            </Modal.Body>
        </Modal>
    );
}

const QuestionDetail = (props) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState();
  const [isUpvotedByThisUser, setIsUpvotedByThisUser] = useState(false);
  const [isDownvotedByThisUser, setIsDownvotedByThisUser] = useState(false);
  const [isFollowedByThisUser, setIsFollowedByThisUser] = useState(false);


    const [modalShow, setModalShow] = React.useState(false);

    const authToken = localStorage.getItem("authToken");
    const [showLoading, setShowLoading] = useState(true);
    const [answer_comment, setAnswerComment] = useState("");

    const [obj, setObj] = useState({});
    const [isDelete, setDelete] = useState(false);

    useEffect(() => {
        const init = async () => {
            const [error, response] = await Api.getQuestion(id);
            if (response) {
                setQuestion(response.data);
                if (localStorage.getItem("userId") == response?.data?.userObj?._id) {
                    setDelete(true);
                }
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
      const isUndoAction = isUpvotedByThisUser;
      const [voteErr, voteRes] = (isUndoAction ? await Api.undoVoteQuestion(id) : await Api.voteQuestion(id));
      if (voteErr) {
        toast.info("You already liked this question!");
      } else if (voteRes) {
        toast.success(isUndoAction ? "Question Unliked!" : "Question Liked!");
        setIsUpvotedByThisUser(isUndoAction ? false : true);
        setIsDownvotedByThisUser(false);
      }
    }
  }

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
      const isUndoAction = isDownvotedByThisUser;
      const [voteErr, voteRes] = (isUndoAction ? await Api.undoDownVoteQuestion(id) : await Api.downVoteQuestion(id));
      if (voteErr) {
        toast.error("Something went wrong!");
      } else if (voteRes) {
        toast.success("Success!");
        setIsDownvotedByThisUser(isUndoAction ? false : true);
        setIsUpvotedByThisUser(false);
      }
    }
  };

  const followQuestion = async () => {
    const [followErr, followRes] = await Api.followQuestion(id);
    if (followErr) {
      toast.error("Something went wrong!");
    }
    if (followRes) {
      setIsFollowedByThisUser(true);
      toast.success("Followed!");
    }
  }

  const unfollowQuestion = async () => {
    const [followErr, followRes] = await Api.unfollowQuestion(id);
    if (followErr) {
      toast.error("Something went wrong!");
    }
    if (followRes) {
      setIsFollowedByThisUser(false);
      toast.success("Unfollowed!");
    }
  }


    return (
        <>
            <Container>
                <div style={{ padding: "10px" }}>
                    {showLoading ? <div className="loadingDiv"></div> : ""}

                    <Card
                        // className="text-center"
                        style={{
                            height: "fix-layout",
                            border: "none",
                            backgroundColor: "#c0c0c045",
                        }}
                    >
                        <Card.Body style={{ width: "100%" }}>
                            <Card.Text className="question-title">
                                <div>
                                    <h2 className="q-title">{question?.name}</h2>
                                </div>
                                <div className="q-desc">
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
                  onClick={() => {
                    if (!authToken) {
                      setModalShow(true);
                    } else {
                      isFollowedByThisUser ? unfollowQuestion() : followQuestion();
                    }
                  }}
                >
                  <span style={{ color: isFollowedByThisUser ? "white" : "black" }}>
                    {isFollowedByThisUser ? "Following" : "Follow"}
                  </span>
                </Button>

                                <Button
                                    className="question-btn"
                                    onClick={() => {
                                        if (!authToken) {
                                            setModalShow(true);
                                        } else {
                                            upVoteQuestion();
                                        }
                                    }}
                                >
                                    <AiIcons.AiFillLike
                                        size={25}
                                        style={{ color: isUpvotedByThisUser ? "white" : null }}
                                    />
                                </Button>

                                <Button
                                    className="question-btn"
                                    onClick={() => {
                                        if (!authToken) {
                                            setModalShow(true);
                                        } else {
                                            downVoteQuestion();
                                        }
                                    }}
                                >
                                    <AiIcons.AiFillDislike
                                        size={25}
                                        style={{ color: isDownvotedByThisUser ? "white" : null }}
                                    />
                                </Button>

                                {isDelete ? (
                                    <Button
                                        className="question-btn"
                                        onClick={() => {
                                            if (!authToken) {
                                                setModalShow(true);
                                            } else {
                                                deleteQuestion();
                                            }
                                        }}
                                    >
                                        <AiIcons.AiFillDelete size={30} />
                                    </Button>
                                ) : (
                                    ""
                                )}
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
                                                    onClick={() => {
                                                        if (!authToken) {
                                                            setModalShow(true);
                                                        } else {
                                                            upVoteQuestion(answer.data._id);
                                                        }
                                                    }}
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
                                                    onClick={() => {
                                                        if (!authToken) {
                                                            setModalShow(true);
                                                        } else {
                                                            downVoteQuestion(answer.data._id);
                                                        }
                                                    }}
                                                    style={{
                                                        cursor: "pointer",
                                                        marginLeft: "5px",
                                                        marginRight: "5px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="answer-detail">
                                            <div>{answer?.data?.content}</div>
                                            <div className="other-section">
                                                <div className="answer-detail-comment">
                                                    <button
                                                        onClick={() => {
                                                            if (!authToken) {
                                                                setModalShow(true);
                                                            } else {
                                                                setObj(answer);
                                                            }
                                                        }}
                                                        className="answer-detail-commen-button"
                                                    >
                                                        <span>Comment</span>
                                                    </button>
                                                </div>
                                                <div className="comment-userinfo">
                                                    <div className="comment-userinfo-img">
                                                        <div className="question-user-name">
                                                            <img
                                                                class="rounded-circle mt-2"
                                                                src={answer?.data?.userObj?.avatar}
                                                                width="30px"
                                                                height="30px"
                                                            />
                                                            {" " + answer?.data?.userObj?.name}
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
                                                                    <li
                                                                        key={row._id}
                                                                        className="answer-comment-li"
                                                                    >
                                                                        <div className="answer-commnet-li-div">
                                                                            <div className="ant-comment-content-author">
                                                                                <span className="ant-comment-content-author-name">
                                                                                    {row.userName}
                                                                                </span>
                                                                                <span className="ant-comment-content-author-time">
                                                                                    <span>
                                                                                        {moment(
                                                                                            row.createdAt
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
                                                        obj?.data?._id == answer.data._id
                                                            ? "block"
                                                            : "none",
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
                                    <h5 style={{ color: "red" }}>
                                        Please login to post a answer.
                                    </h5>
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
                                                            <div className="error-message">
                                                                {errors.answer}
                                                            </div>
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
                                                            <Button
                                                                className="post-answer"
                                                                variant="secondary"
                                                                onClick={handleSubmit}
                                                            >
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
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Container>
        </>
    );
};

export default QuestionDetail;
