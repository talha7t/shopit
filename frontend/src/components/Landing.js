import React from "react";
import { Link } from "react-router-dom";

import "../styles/landing.css";

const Landing = () => {
  return (
    <section class="hero-slider">
      <div class="single-slider">
        <div class="container">
          <div class="row no-gutters">
            <div class="col-lg-9">
              <div class="text-inner">
                <div class="row">
                  <div class="col-lg-7 col-12">
                    <div class="hero-text">
                      <h1>
                        <span>Stay Ahead of the Trend</span>SHOP IT
                      </h1>
                      <p>
                        You know you have unlocked a new level of adulthood when
                        shopping for bath linen excites you and when crazy
                        mismatched colors and stiff, smelly towels and bathrobes
                        are simply a no go!
                      </p>
                      <Link to="/" class="btn">
                        Shop Now!
                      </Link>
                      <Link to="/contact" class="btn ms-3">
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
