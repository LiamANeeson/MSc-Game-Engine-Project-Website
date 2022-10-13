import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'

import './Navbar.css';

function Navigationbar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="navContainer" variant="dark">
      <Container>
        <Navbar.Brand href="/">Horizon GE</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/tutorial">Tutorial</Nav.Link>
            <Nav.Link href="/docs">Documentation</Nav.Link>
            <Nav.Link href="/community">Community</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Log in</Nav.Link>
            <Nav.Link eventKey={2} href="/register">
              Register
            </Nav.Link>
            <Button href="/download" className='custom-btn'>Download</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Navigationbar;
  // const [clicked, setClicked] = useState(false);
  // const menuList = MenuList.map(({ url, title }, index) => {
  //   return (
  //     <li key={index}>
  //       <NavLink exact to={url} activeClassName="active">
  //         {title}
  //       </NavLink>
  //     </li>
  //   );
  // });



