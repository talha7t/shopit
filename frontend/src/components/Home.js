import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./commons/Card";
import { MetaData } from "./commons/MetaData";
import { getProducts } from "../actions/productsAction";
import Loader from "./commons/Loader";
import { useAlert } from "react-alert";
import "../styles/Home.css";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, alert, error]);

  return (
    <section className="section-products">
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Home"} />
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-md-8 col-lg-6 justify-self-center">
                <div className="header">
                  <h3>Featured Product</h3>
                  <h2>Popular Products</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {products &&
                products.map((product) => {
                  return <Card key={product._id} product={product} />;
                })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     products: state.products,
//     loading: state.loading,
//     productCount: state.products.productCount,
//   };
// };

export default Home;
// export default connect(mapStateToProps, { getProducts })(Home);
