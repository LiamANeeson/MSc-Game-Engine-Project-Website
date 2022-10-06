import React from 'react';
import { Container, Image } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { queObj } from './data';
import './Community.css';

function Community() {

  return (
        <div className='community-container'>
            <div className='community-headline'>
                <h2 className='community-headline-text'>All Questions</h2>
            </div>



            <Container fluid className='que-container'>
                <Row>
                    <Col md={3}>

                    </Col>
                    <Col md={7}>
                        <div className='filter'>
                            <button className='Filter-btn'>All</button>          
                            <button className='Filter-btn'>Unanswered</button>
                            <label htmlFor="header-search">
                            </label>
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Search question"
                                name="s"
                            />
                            <button type="submit" class="Filter-btn">Search</button>

                            <label htmlFor="header-sort">
                            </label>
                            
                            <select name="sort"  class="mySelect" id="header-sort">
                                
                                <option value="asc">Sort by name(A-Z)</option>
                                <option value="desc">Sort by name(Z-A)</option>
                                <option value="opel">Sort by most votes</option>
                                <option value="opel">Sort by most views</option>
                                <option value="audi">Audi</option>
                            </select>
                        
                            <button type="submit" class="Filter-btn">Sort</button>
                            <div class="pagination">
                                <a href="#">&laquo;</a>
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                                <a href="#">&raquo;</a>
                            </div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <button className='ask-q-btn'>Ask A Question</button>
                    </Col>
                </Row>
                <Row>
                    {
                        queObj.map((que) => (
                            <Col md={4} className='que-wrapper'>
                                <div className='que-inner-wrapper'>
                                    <div className=''>
                                        <h2 className='question-title'>
                                            <Link to={`/question/${que.id}`}>{que.title}</Link>
                                        </h2>
                                        <p className="question-desc">
                                            <Link to={`/question/${que.id}`}>
                                                {que.description()}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className='que-tags'>
                                    {
                                        que.tags.map((tag) => (
                                        <span className='tag'>{tag}</span>
                                        ))
                                    }
                                    </div>
                                    <Row className='que-user-wrapper'>
                                        <Col md={6} className='que-rating'>
                                            <span className='answers'>{que.answers}<br/>Answers</span>
                                            <span className='votes'>{que.votes}<br/>Votes</span>
                                            <span className='views'>{que.views}<br/>Views</span>
                                        </Col>
                                        <Col md={6} className='user-detail'>
                                            <div className='user-image float-left'>
                                                <Image src={que.userObj.userImage} />
                                            </div>
                                            <div className='user-info float-right'>
                                                <div className='user-name'>{que.userObj.user_name}</div>
                                                <div className='created-at'>{que.userObj.created_at}</div>

                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
                <Row>
                    <Col>
                        <div class="pagination">
                            <a href="#">&laquo;</a>
                            <a href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#">4</a>
                            <a href="#">&raquo;</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
  )
}
export default Community