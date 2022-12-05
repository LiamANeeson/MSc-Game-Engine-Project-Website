import React, { useEffect, useState } from "react";
import { Container, Button, Row, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./Community.css";
import * as Api from "../../features/APIs/api";
import { useNavigate } from "react-router-dom";
import Search from "./Search/Search";
import Sort from "./Sort/Sort";
import Pagination from "./Pagination/Pagination";
import Question from "./Question";

import { createPostSchema } from "../../validation/postValidation";
import { Formik } from "formik";

function Community() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [isAll, setIsAll] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showLoading, setShowLoading] = useState(true);

  const authToken = localStorage.getItem("authToken");
  const { user } = useSelector((state) => state.auth);

  let error, response;

  useEffect(() => {
    const init = async () => {
      setShowLoading(true);
      const authToken = localStorage.getItem("authToken");
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
        console.log(response.data);
        setShowLoading(false);
      }
      if (error) {
        setShowLoading(false);
        console.log(error);
      }
    };
    init();
  }, [sort, page, search, authToken, user, error, response, isAll]);

  const askQuestionOnClickHandler = async (data) => {
    const [err, res] = await Api.createQuestion(
      data.title,
      data.description,
      data.tags
    );
    if (err) {
      toast.error("Something went wrong.Please try again later!");
    }
    if (res) {
      //   console.log(res);
      toast.success("Question Created!");
      navigate("/community");
    }
  };

  const createPostandClose = (data) => {
    handleClose();
    askQuestionOnClickHandler(data);
    window.location.reload();
  };
  return (
    <>
      {showLoading ? <div className="loadingDiv"></div> : ""}
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
                {isAll == true ? (
                  <>
                    <Button
                      variant="primary"
                      disabled={false}
                      onClick={() => {
                        setIsAll(!isAll);
                      }}
                    >
                      All
                    </Button>{" "}
                    <Button
                      variant="primary"
                      disabled={true}
                      onClick={() => {
                        setIsAll(!isAll);
                      }}
                    >
                      UnAnswered
                    </Button>{" "}
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      disabled={true}
                      onClick={() => {
                        setIsAll(!isAll);
                      }}
                    >
                      All
                    </Button>{" "}
                    <Button
                      variant="primary"
                      disabled={false}
                      onClick={() => {
                        setIsAll(!isAll);
                      }}
                    >
                      UnAnswered
                    </Button>{" "}
                  </>
                )}
              </div>

              <div style={{ display: "flex", marginTop: "-19px" }}>
                <Search setSearch={(search) => setSearch(search)} />{" "}
                <Sort sort={sort} setSort={(sort) => setSort(sort)} />
              </div>
              <div>
                <Button
                  variant="primary"
                  onClick={handleShow}
                  disabled={!authToken}
                >
                  Create a Post
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Formik
                      initialValues={{
                        title: "",
                        description: "",
                        tags: "",
                      }}
                      validationSchema={createPostSchema}
                      onSubmit={createPostandClose}
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
                          <Form onSubmit={handleSubmit} className="mb-3">
                            <Form.Group>
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                type="title"
                                placeholder="Enter title"
                                name="title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                              />
                              {errors.title && touched.title ? (
                                <div className="error-message">
                                  {errors.title}
                                </div>
                              ) : null}
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Post Body</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                              />
                              {errors.description && touched.description ? (
                                <div className="error-message">
                                  {errors.description}
                                </div>
                              ) : null}
                            </Form.Group>

                            <Form.Group>
                              <Form.Label>Tags</Form.Label>
                              <Form.Control
                                placeholder="Separated by Comma"
                                name="tags"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.tags}
                              />
                              {errors.tags && touched.tags ? (
                                <div className="error-message">
                                  {errors.tags}
                                </div>
                              ) : null}
                            </Form.Group>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleSubmit}>
                                Create Post
                              </Button>
                            </Modal.Footer>
                          </Form>
                        );
                      }}
                    </Formik>
                  </Modal.Body>
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
    </>
  );
}
export default Community;
