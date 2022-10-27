import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import moment from "moment";
const Question = ({questions}) => {
  return (
    <Row>
    {questions &&
      questions?.map((que) => (
        <Col md={4} className="que-wrapper">
          <div className="que-inner-wrapper">
            <div className="">
              <h2 className="question-title">
                <Link to={`/question/${que._id}`}>{que.name}</Link>
              </h2>
              <p className="question-desc">
                <Link to={`/question/${que._id}`}>
                  {que?.description.slice(0, 80)}...
                </Link>
              </p>
            </div>
            <div className="que-tags">
              {que.tags.map((tag) => (
                <span className="tag">{tag}</span>
              ))}
            </div>
            <Row className="que-user-wrapper">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <span className="answers">
                    {que.answers?.length}
                    <br />
                    Answers
                  </span>
                </div>
                <div>
                  <span className="views">
                    {que.Votes?.length}
                    <br />
                    Views
                  </span>
                </div>
                <div>
                  <div className="user-info float-right">
                    <div className="user-name">{que?.userObj?.name}</div>
                    <div className="created-at">
                      {moment(que.createdAt).format("DD-MM-YYYY,h:mm a")}
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </Col>
      ))}
  </Row>
  )
}

export default Question