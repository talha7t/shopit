import React from "react";
import Card from "../commons/Card";

import { MetaData } from "../commons/MetaData";
import "../styles/Home.css";

export default function Home() {
  return (
    <section className="section-products">
      <MetaData title={"Home"} />
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h3>Featured Product</h3>
              <h2>Popular Products</h2>
            </div>
          </div>
        </div>
        <Card />
      </div>
    </section>
  );
}
