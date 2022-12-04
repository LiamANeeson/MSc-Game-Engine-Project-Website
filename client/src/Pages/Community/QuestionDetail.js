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


const QuestionDetail = (props) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState();
  const [loading, setLoading] = useState(false)
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
          setAnswers(ans);
        }
        setAnswers(ans);
        setShowLoading(false);
      }
      if (error) {
        setShowLoading(false);
        console.log(error);
      }
      setLoading(false)
    };
    init();
  }, []);
  //  console.log( "selected" ,obj);

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const onChangeAnswerComment = (e) => {
    setAnswerComment(e.target.value);
  };

  const postAnswerComment = async () => {

    const [postAnswerErr, postAnswerRes] = await Api.createAnswer(obj.data._id, answer_comment, 1);
    if (postAnswerRes) {
      window.location.reload();
      toast.success("Comment Posted!");
    }
  };

  const postAnswer = async () => {

    const [postAnswerErr, postAnswerRes] = await Api.createAnswer(id, answer, 0);
    if (postAnswerRes) {
      window.location.reload();
      toast.success("Answer Posted!");
    }
  };

  const deleteQuestion = async () => {
    try {
      setLoading(true)
      const [deleteErr, deleteRes] = await Api.deleteQuestion(id);
      if (deleteErr) {
        toast.error("Something went wrong.Try again later!");
      }
      if (deleteRes) {
        toast.success("Question deleted!");
        navigate("/community");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  const upVoteQuestion = async (answer_id = "") => {
    try {
      setLoading(true)
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false)

  };

  const downVoteQuestion = async (answer_id = "") => {
    try {
      setLoading(true)
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false)

  };

  const followQuestion = async () => {
    try {
      setLoading(true)
      const [followErr, followRes] = await Api.followQuestion(id);
      if (followErr) {
        toast.error("Something went wrong!");
      }
      if (followRes) {
        toast.success("Followed!");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)

  };
  if (loading) {
    return <p style={{ padding: "10px", textAlign: 'center' }}>
      Loading...
    </p>
  }
  return (
    <>
      <div style={{ padding: "10px" }}>
        {
          showLoading ? <div className="loadingDiv"></div> : ""
        }

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
                <h2 className="question-title">{question?.name}</h2>
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
                  width: "16%",
                  marginLeft: "5px",
                  padding: "12px",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <Button

                  disabled={!localStorage.getItem("authToken") || loading}
                  variant="secondary"
                  onClick={() => followQuestion()}
                >
                  Follow
                </Button>

                <Button
                  disabled={!localStorage.getItem("authToken") || loading}
                  variant="secondary"
                  onClick={() => upVoteQuestion()}
                >
                  <Icon
                    icon="ant-design:like"
                    width="15px"
                    height="15px"
                    style={{ cursor: "pointer" }}
                  />
                </Button>

                <Button
                  disabled={!localStorage.getItem("authToken") || loading}
                  variant="secondary"
                  onClick={() => downVoteQuestion()}
                >
                  <Icon
                    icon="ant-design:dislike"
                    width="15px"
                    height="15px"
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
                  disabled={!localStorage.getItem("authToken") || loading}
                  variant="secondary"
                  onClick={() => deleteQuestion()}
                >
                  <Icon
                    icon="ant-design:delete"
                    width="15px"
                    height="15px"
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
                        style={{ cursor: "pointer", marginLeft: "5px", marginRight: "5px" }}
                      />
                      <div className="count-middle">{answer.data.votes.length}</div>
                      <Icon
                        icon="ant-design:dislike"
                        width="1rem"
                        height="1rem"
                        onClick={() => downVoteQuestion(answer.data._id)}
                        style={{ cursor: "pointer", marginLeft: "5px", marginRight: "5px" }}
                      />
                    </div>
                  </div>
                  <div className="answer-detail">
                    <div>
                      {answer.data.content}
                    </div>
                    <div className="other-section">
                      <div className="answer-detail-comment">
                        <button onClick={() => {
                          setObj(answer);
                        }} className="answer-detail-commen-button">
                          <span>Comment
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
                            />{answer?.data?.userObj?.name}</div>
                          <div className="question-user-date" >
                            {moment(answer.data.createdAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="answer-comment">
                    <div className="answer-commnet-list">
                      <ul className="answer-comment-ul">
                        {
                          answer.data.comment && answer.data.comment.length >= 1 && answer.data.comment.map(row => {
                            return (
                              <>
                                <li key={row._id} className="answer-comment-li">
                                  <div className="answer-commnet-li-div">
                                    <div className="ant-comment-content-author">
                                      <span className="ant-comment-content-author-name">
                                        {row.userObj.name}
                                      </span>
                                      <span className="ant-comment-content-author-time">
                                        <span>{moment(row.userObj.createdAt).fromNow()}</span>
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
                          })
                        }
                      </ul>
                    </div>
                    <div className="answer-comment-text" style={{

                      display: obj?.data?._id == answer.data._id ? 'block' : 'none'

                    }}>
                      <h2 className="question-title">Post your comment</h2>
                      <br />
                      {!localStorage.getItem("authToken") ? (
                        <>
                          <h5 style={{ color: "red" }}>Please login to post a Comment.</h5>
                        </>
                      ) : (
                        <>
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                              as="textarea"
                              rows="3"
                              value={answer_comment}
                              placeholder="Start writing your comment..."
                              onChange={onChangeAnswerComment}
                            />
                          </Form.Group>
                        </>
                      )}
                      {!localStorage.getItem("authToken") ? (
                        <></>
                      ) : (
                        <div style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
                          <Button className="cancel-button" variant="secondary" onClick={() => { setObj({}) }}>
                            Cancel
                          </Button>
                          <Button className="clear-button" variant="secondary" onClick={() => setAnswerComment("")}>
                            Clear
                          </Button>
                          <Button className="post-button" variant="secondary" onClick={() => postAnswerComment()}>
                            Post Comment
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </Card.Body>
        </Card >
        <Card className="text-center" style={{ marginBottom: "5%" }}>
          <Card.Body>
            <Card.Text className="question-title">
              <div style={{ display: "flex" }}>
                <h2 className="question-title">Add your answer
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
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    disabled={loading}
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
            {!localStorage.getItem("authToken") ? (
              <></>
            ) : (
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button disabled={loading} variant="secondary" onClick={postAnswer}>
                  Post answer
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div >
    </>
  );
};

export default QuestionDetail;