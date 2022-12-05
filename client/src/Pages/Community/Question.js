import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Question.css";
import { Icon } from "@iconify/react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
          <svg style={{ color: "orange" }} viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle"
            width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
            <path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path>
          </svg>
          &nbsp;You need to sign in to perform this operation

          <br />
          <div style={{ float: "right", marginTop: "24px" }}>
            <button type="button" onClick={props.onHide} className='login-cancel-button'><span>Cancel</span></button>
            <button type="button" className='login-do-button'>
              <a href='/login' style={{ color: "white" }}>
                <span>Sign in</span>
              </a></button>
          </div>
        </p>
      </Modal.Body>
    </Modal>
  );
}

const Question = ({ questions }) => {

  const [modalShow, setModalShow] = React.useState(false);

  const authToken = localStorage.getItem("authToken");
  return (
    <Row>
      {questions && questions.length >= 1 ?
        questions?.map((que) => (
          <Col md={4} className="que-wrapper">
            <div className="que-inner-wrapper">
              <div className='question-level-1'>
                <div className="">
                  <h2 className="questions-title" style={{cursor:"pointer"}} onClick={() => {
                    if (!authToken)
                      setModalShow(true)
                  }}>
                    {
                      authToken ? <Link to={`/question/${que._id}`}>{que.name}</Link> :
                        que.name
                    }
                  </h2>
                  <p className="questions-desc" style={{cursor:"pointer"}}  onClick={() => {
                    if (!authToken)
                      setModalShow(true)
                  }}>
                    {
                      authToken ? <Link to={`/question/${que._id}`}>
                        {que?.description.slice(0, 250)}...
                      </Link>
                        : que?.description.slice(0, 250)
                    }
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
                    <span style={{ fontSize: "1.75rem" }} >
                      {que.answers?.length}
                      <br />
                    </span>
                    Answers
                  </div>
                  <div className="question-answer">
                    <span style={{ fontSize: "1.75rem" }}>
                      {que.totalVotes}
                      <br />
                    </span>
                    Votes

                  </div>
                  <div className="question-views">
                    <span style={{ fontSize: "1.75rem" }}>
                      {que.views}
                      <br />
                    </span>
                    Views

                  </div>

                  <div>
                    <div className="user-info float-right" style={{ width: "100%" }}>

                      <div className="question-user-name">
                        <Icon
                          icon="ant-design:user"
                          width="30px"
                          height="30px"
                        />{que?.userObj?.name}</div>
                      <div className="question-user-date" >
                        {moment(que.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </Col>
        )) : <p style={{ textAlign: "center", fontSize: "1.3rem" }}>Data Not Found!</p>}


      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Row>
  )
}

export default Question