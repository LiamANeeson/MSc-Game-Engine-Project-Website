import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Button,
  Row,
  Col,
  Modal, 
  Form 
} from "react-bootstrap";
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


import "./Community.css";
import * as Api from "../../features/APIs/api";
import { useNavigate } from "react-router-dom";
import Search from "./Search/Search";
import Sort from "./Sort/Sort";
import Pagination from "./Pagination/Pagination";
import Question from "./Question";

function Community() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
  const [page, setPage] = useState(1);


  const [authToken, setAuth] = useState(localStorage.getItem("authToken"));
  const logedInUser = localStorage.getItem("authToken");
  const { user } = useSelector((state) => state.auth)
  const [isAll, setIsAll] = useState(true);
  // console.log("tole,",authToken);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let error, response;

  useEffect(() => {
    const init = async () => {
      setAuth(localStorage.getItem("authToken"));
      [error, response] = await Api.getQuestions(
        authToken,
        page,
        sort.sort,
        sort.order,
        search,
        isAll
      );
      if (error) {
        console.log(error);
      }
      if (response.status === 200) {
        setObj(response.data);
        //console.log(response.data);
      }
      if (error) {
        //console.log(error);
      }
    };
    init();

  }, [sort, page, search, logedInUser, user, error, response, isAll]);

    //onChange Handler
    const onChangeTitle = (e) => {
      setTitle(e.target.value);
    };
    const onChangeDescription = (e) => {
      setDescription(e.target.value);
    };
    const onChangeTags = (e) => {
      setTags(e.target.value);
    };
  
    const askQuestionOnClickHandler = async () => {
      const [err, res] = await Api.createQuestion(title, description, tags);
      if (err) {
        toast.error("Something went wrong.Please try again later!");
      }
      if (res) {
        //   console.log(res);
        toast.success("Question Created!");
        navigate("/community");
      }
    };

    function createPostandClose() {
      handleClose()
      askQuestionOnClickHandler()
    }

  return (
    <div className="community-container">
      <Container fluid className="que-container">
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
              {
                isAll == true ?
                  <>
                    <Button
                      variant="primary" disabled={false} onClick={() => { setIsAll(!isAll) }}>All</Button>{" "}
                    <Button variant="primary" disabled={true} onClick={() => { setIsAll(!isAll) }}>UnAnswered</Button>{" "}
                  </> :
                  <>
                    <Button
                      variant="primary" disabled={true} onClick={() => { setIsAll(!isAll) }}>All</Button>{" "}
                    <Button variant="primary" disabled={false} onClick={() => { setIsAll(!isAll) }}>UnAnswered</Button>{" "}
                  </>
              }

            </div>

            <div style={{ display: "flex", marginTop: "-19px" }}>
              <Search setSearch={(search) => setSearch(search)} />{" "}
              <Sort sort={sort} setSort={(sort) => setSort(sort)} />
            </div>
            <div>
              {
                authToken ?
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    disabled={false}
                  >
                    Ask a question 
                  </Button>
                  :
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    disabled={true}
                  >
                    Ask a question 
                  </Button>
              }
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="title"
                        placeholder="Title"
                        autoFocus
                        onChange={onChangeTitle}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Post Body</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3}
                        onChange = {onChangeDescription} 
                      />
                    </Form.Group>
                  </Form>
                  <Form.Group>
                    <Form.Label>Tags</Form.Label>
                    <Form.Control 
                      placeholder="Separated by Comma"
                      onChange={onChangeTags} 
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={createPostandClose}
                  >
                    Create Post
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </Row>

        <Question questions={obj.questions ? obj.questions : []} />
        <Pagination
          page={page}
          limit={obj.limit ? obj.limit : 0}
          total={obj.total ? obj.total : 0}
          setPage={(page) => setPage(page)}
        />
      </Container>
    </div>
  );
}
export default Community;
