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
            <a className="external-links" href="/"><h4>Horizon Game Engine</h4></a>
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
              <a className="external-links" href="/docs"><li>Documentation</li></a>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Get In Touch</h4>
            <ui className="list-unstyled">
              <li>
              <a className="external-links" href="https://github.com/TejasJD/HorizonEngine2D"
              target={"_blank"}><FaGithub /> GitHub</a>
              </li>
              <li>
              <a className="external-links" href="https://discord.gg/g5S9s23Q"
              target={"_blank"}><FaDiscord /> Discord</a>
              </li>
              <li>
              <a className="external-links" href="mailto:horizonengineteam@gmail.com"><FaEnvelope /> Email </a>
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
