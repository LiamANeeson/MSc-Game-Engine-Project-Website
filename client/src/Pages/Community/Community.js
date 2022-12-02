import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Button,
  Row,
  Col
} from "react-bootstrap";
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { Link } from "react-router-dom";
import "./Community.css";
import * as Api from "../../features/APIs/api";
import { useNavigate } from "react-router-dom";
import Search from "./Search/Search";
import Sort from "./Sort/Sort";
import Pagination from "./Pagination/Pagination";
import Question from "./Question";

function Community() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [obj, setObj] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
  const [page, setPage] = useState(1);


  const authToken = localStorage.getItem("AuthToken");
  const logedInUser = localStorage.getItem("authToken");
  const { user } = useSelector((state) => state.auth)

  const [isAll, setIsAll] = useState(true);

  let error, response;

  useEffect(() => {
    const init = async () => {
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
        //console.log(response.data);
      }
      if (error) {
        //console.log(error);
      }
    };
    init();
  }, [sort, page, search, logedInUser, user, error, response, isAll]);

  return (
    <div className="community-container">
      <div className="community-headline">
        <h2 className="community-headline-text">All Questions</h2>
      </div>
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
              <Button
                variant="primary"
                onClick={() => navigate("/ask-question")}
                disabled={!authToken}
              >
                Ask a question
              </Button>{" "}
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