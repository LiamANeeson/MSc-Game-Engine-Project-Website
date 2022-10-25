import React, { useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./Community.css";
import * as Api from "../../features/APIs/api";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Search from "./Search/Search";
import Sort from "./Sort/Sort";
import Question from "./Question";
import Pagination from "./Pagination/Pagination";

function Community() {
    const navigate = useNavigate()
    const [obj, setObj] = useState({});
    const [search, setSearch] = useState();
    const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
    const [page, setPage] = useState(1);
    console.log(queObj);
    // const [result, setresult] = useState([]);
    useEffect(() => {
        const init = async () => {
            const authToken = localStorage.getItem("AuthToken");
            console.log({ authToken, page, search });
            const [error, response] = await Api.getQuestions(
                authToken,
                page,
                sort.sort,
                sort.order,
                search
            );
            if (error) {
                console.log(error);
            }
            if (response.status === 200) {
                setObj(response.data);
                console.log(response.data);
            }
            if (error) {
                console.log(error);
            }
        };
        init();
    }, [sort, page, search]);
    return (
        <div className="community-container">
            <div className="community-headline">
                <h2 className="community-headline-text">All Questions</h2>
            </div>
            <Container fluid className="que-container">
                <Row>
                    <Row
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItem: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                width: "80%",
                                padding: "10px",
                                marginTop: "2%",
                                justifyContent: "space-around",
                            }}
                        >
                            <div>
                                <Button variant="primary">All</Button>{" "}
                                <Button variant="primary">UnAnswered</Button>{" "}
                            </div>
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
            </Container>
            {/* <AskQuestionModel
      open={showModel}
      onClose={handleCloseModel}
     />*/}
        </div>
    );
}

export default Community;