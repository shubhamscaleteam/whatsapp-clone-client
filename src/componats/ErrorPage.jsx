import React from "react";
import "../css/error.css";
import media from "../assets/images/Mediamodifier-Design-Template.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <img src={media} alt="error" />

      <div class="message-box">
        <h1>404</h1>
        <p>Page not found</p>
        <div class="buttons-con">
          <div class="action-link-wrap">
            <Link to="/chat" className="link-button">
              Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
