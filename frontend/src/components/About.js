import React from "react";
import { Link } from "react-router-dom";

import aboutStyles from "../styles/about.module.css";

const About = () => {
  return (
    <div class={aboutStyles.section}>
      <div class={aboutStyles.container + " p-5"}>
        <div class={aboutStyles.content_section}>
          <div class={aboutStyles.title}>
            <h1>About Us</h1>
          </div>
          <div class={aboutStyles.content}>
            <h3>Welcome to SHOP IT</h3>
            <p>
              We draw our inspirations from the diverse global arena and pack it
              under one roof, to share the fact that beauty is universal. We
              constantly strive to challenge the limitations of all the
              possibilities when it comes to weaving, printing, embroidery &amp;
              embellishments. The cloth used is not mere fabric for us, we treat
              it like an artist treats his canvas; with the love, respect and
              dedication that it deserves. Here at SHOP IT, we understand that
              style and fashion are a vital part of your lives and so we strive
              to bring it to your doorstep in the easiest possible way. SHOP IT
              motto has always been to provide excellent quality and service.
            </p>
            <div class={aboutStyles.button}>
              <Link to="/">Shop</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
