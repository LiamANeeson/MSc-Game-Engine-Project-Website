import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./Community.css";
import * as Api from "../../features/APIs/api";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Community() {
    const navigate = useNavigate()
    const [queObj, setQueObj] = useState([]);
    console.log(queObj);
    // const [result, setresult] = useState([]);
    useEffect(() => {
        const init = async () => {
            const authToken = localStorage.getItem("AuthToken");
            console.log({ authToken });
            const [error, response] = await Api.getQuestions(authToken);
            if (response.status === 200) {
                setQueObj(response.data.questions);
            }
            if (error) {
                console.log(error);
            }
        };
        init();
    }, []);

    // const getUser = async (questionId) => {
    //     const [error, response] = await Api.getQuestion(questionId);
    //     if (response) {
    //         const userId = response.data.userObj;
    //         const [err, res] = await Api.getUser(userId);
    //         console.log(res, "created by");
    //     }
    // };
    return (


        <div className="community-container">
            <div className="community-headline">
                <h2 className="community-headline-text">All Questions</h2>
            </div>
            <Container fluid className="que-container">
                <Row>
                    {/*<Col md={3}></Col> */}
                    <Col md={7} style={{ marginTop: "15px" }}>
                        <div className="filter">
                            <button className="Filter-btn">All</button>
                            <button className="Filter-btn">Unanswered</button>
                            <label htmlFor="header-search"></label>
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Search question"
                                name="s"
                            />
                            <button type="submit" class="Filter-btn">
                                Search
                            </button>

                            <label htmlFor="header-sort"></label>
                            <select name="sort" class="mySelect" id="header-sort">
                                <option value="asc">Sort by name(A-Z)</option>
                                <option value="desc">Sort by name(Z-A)</option>
                                <option value="opel">Sort by most votes</option>
                                <option value="opel">Sort by most views</option>
                                <option value="audi">Audi</option>
                            </select>

                            <button type="submit" class="Filter-btn">
                                Sort
                            </button>
                        </div>
                    </Col>
                    <Col md={2} style={{ marginTop: "15px" }}>
                        <button
                            onClick={() => navigate("/ask-question")}
                            className="ask-q-btn"
                        >
                            Ask A Question
                        </button>
                    </Col>
                </Row>
                <Row>
                    {queObj &&
                        queObj.map((que) => (
                            <Col md={4} className="que-wrapper">
                                <div className="que-inner-wrapper">
                                    <div className="">
                                        <h2 className="question-title">
                                            <Link to={`/question/${que._id}`}>{que.title}</Link>
                                        </h2>
                                        <p className="question-desc">
                                            <Link to={`/question/${que._id}`}>
                                                {que.description.slice(0, 80)}...
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
                                                    {que.answers.length}
                                                    <br />
                                                    Answers
                                                </span>
                                            </div>
                                            <div>
                                                <span className="votes">
                                                    {que.Votes.length}
                                                    <br />
                                                    Votes
                                                </span>
                                            </div>
                                            <div>
                                                <span className="views">
                                                    {que.Votes.length}
                                                    <br />
                                                    Views
                                                </span>
                                            </div>
                                            <div>
                                                {/*<div className="user-image float-left">
                      <Image src={que.userObj.userImage} />
                  </div> */}
                                                <div className="user-info float-right">
                                                    <div className="user-name">{ }</div>
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
                <Row>
                    <Col>
                    </Col>
                </Row>
            </Container>
            {/* <AskQuestionModel
      open={showModel}
      onClose={handleCloseModel}
     />*/}
        </div>
    );
}

export default Community;