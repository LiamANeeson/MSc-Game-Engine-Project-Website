import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Question.css";
import { Icon } from "@iconify/react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Question = ({ questions }) => {
  const authToken = localStorage.getItem("authToken");
  return (
    <Row>
      {questions && questions.length >= 1 ? (
        questions?.map((que) => (
          <Col md={4} className="que-wrapper">
            <div className="que-inner-wrapper">
              <div className="question-level-1">
                <div className="questions-desc-and-title">
                  <h2 className="questions-title" style={{ cursor: "pointer" }}>
                    <Link to={`/question/${que._id}`}>{que.name}</Link>
                  </h2>
                  <p className="questions-desc" style={{ cursor: "pointer" }}>
                    <Link to={`/question/${que._id}`}>
                      {que?.description.slice(0, 75)}...
                    </Link>
                  </p>
                </div>
                <div className="que-tags">
                  {que.tags.map((tag) => (
                    <span className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <Row className="questions-action-block">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div className="question-answer">
                    <span style={{ fontSize: "1.75rem" }}>
                      {que.answers?.length}
                      <br />
                    </span>
                    Answers
                  </div>
                  <div className="question-answer">
                    <span style={{ fontSize: "1.75rem" }}>
                      {que.votes}
                      <br />
                    </span>
                    Votes
                  </div>
                  <div className="question-views">
                    <span style={{ fontSize: "1.75rem" }}>
                      {que.viewCount}
                      <br />
                    </span>
                    Views
                  </div>

                  <div>
                    <div
                      className="user-info float-right"
                      style={{ width: "100%" }}
                    >
                      <div className="question-user-name">
                        <img
                          class="rounded-circle mt-2"
                          src={que?.userObj?.avatar}
                          width="30px"
                          height="30px"
                        />
                        {" " + que?.userObj?.name}
                      </div>
                      <div className="question-user-date">
                        {moment(que.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </Col>
        ))
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
          Data Not Found!
        </p>
      )}
    </Row>
  );
};

export default Question;
