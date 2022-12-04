import React from "react";
import "./Footer.css";

import { FaDiscord, FaGithub, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Horizon Game Engine</h4>
            <h1 className="list-unstyled">
              <li></li>
              <li></li>
              <li></li>
            </h1>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>About</h4>
            <ui className="list-unstyled">
              <li>2D Game Engine</li>
              <li>Documentation</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Get In Touch</h4>
            <ui className="list-unstyled">
              <li>
                  <FaGithub /> GitHub
              </li>
              <li>
                <FaDiscord /> Discord
              </li>
              <li>
                <FaEnvelope /> Email
              </li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Technological University Dublin |
            MSc Computer Science |
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
