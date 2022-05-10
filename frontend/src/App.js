import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/commons/Header";
import Home from "./components/Home";
import store from "./store";
import { ProductDetails } from "./components/user/ProductDetails";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import { Profile } from "./components/user/Profile";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import { UpdateProfile } from "./components/user/UpdateProfile";
import { UpdatePassword } from "./components/user/UpdatePassword";
import { ForgotPassword } from "./components/user/ForgotPassword";
import { NewPassword } from "./components/user/NewPassword";
import { Cart } from "./components/cart/Cart";
import { ShippingInfo } from "./components/cart/ShippingInfo";
import { ConfirmOrder } from "./components/cart/ConfirmOrder";
import axios from "axios";
import { Payment } from "./components/cart/Payment";

// payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/stripeapi");
  //   setStripeApiKey(data.stripeApiKey);
  // }
  return (
    <Router>
      <div className="APP">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/products/:id" component={ProductDetails} exact />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/shipping" component={ShippingInfo} />
        <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute path="/success" component={OrderSuccess} />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" component={Payment} />
          </Elements>
        )}

        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/update/me" component={UpdateProfile} exact />
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />
      </div>
    </Router>
  );
}
export default App;
