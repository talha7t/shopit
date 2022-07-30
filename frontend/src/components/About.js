import React from "react";
import { Link } from "react-router-dom";

import aboutStyles from "../styles/about.module.css";

const About = () => {
  return (
    <div class={aboutStyles.section}>
      <div class={aboutStyles.container}>
        <div class={aboutStyles.content_section}>
          <div class={aboutStyles.title}>
            <h1>About Us</h1>
          </div>
          <div class={aboutStyles.content}>
            <h3>Welcome to SHOP IT</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div class={aboutStyles.button}>
              <Link to="/">Shop</Link>
            </div>
          </div>
        </div>
        <div class={aboutStyles.image_section}>
          <img src="image/img one.jpg" />
        </div>
      </div>
    </div>
  );
};

export default About;
