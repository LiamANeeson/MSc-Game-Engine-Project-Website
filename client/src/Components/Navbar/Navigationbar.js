import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuList } from "./MenuList";
import {Nav, Navbar, NavLink} from 'react-bootstrap'
import "./Navbar.css";

function Navigationbar() {
    return (
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <NavLink eventKey = "1" as={Link} to="/">Home</NavLink>
          <NavLink eventKey = "2" as={Link} to="/about">About</NavLink>
          <NavLink eventKey = "3" as={Link} to="/tutorial">Tutorial</NavLink>
          <NavLink eventKey = "4" as={Link} to="/docs">Documentation</NavLink>
          <NavLink eventKey = "5" as={Link} to="/community">Community</NavLink>
          <NavLink eventKey = "6" as={Link} to="/download">Download</NavLink>
          <NavLink eventKey = "7" as={Link} to="/login">Login</NavLink>
          <NavLink eventKey = "7" as={Link} to="/register">Register</NavLink>          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
}
export default Navigationbar
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


