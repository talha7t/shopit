import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
// import Header from "./components/commons/Header";
import Home from "./components/Home";
import store from "./store";
import { ProductDetails } from "./components/user/ProductDetails";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile.js";
// import { Profile } from "./components/user/Profile";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import { UpdateProfile } from "./components/user/UpdateProfile";
import { UpdatePassword } from "./components/user/UpdatePassword";
import { ForgotPassword } from "./components/user/ForgotPassword";
import { NewPassword } from "./components/user/NewPassword";
import { Cart } from "./components/cart/Cart";
import { ShippingInfo } from "./components/cart/ShippingInfo";
import { ConfirmOrder } from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Pay";
// import { Payment } from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/order/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

import Contact from "./components/Contact";

// Admin Imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ConfirmEmail from "./components/user/ConfirmEmail";
import Navbar from "./components/commons/Navbar";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapi");
    setStripeApiKey(data.stripeApiKey);
  }
  return (
    <Router>
      <div className="APP">
        {/* <Header /> */}
        <Navbar />
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/products/:id" component={ProductDetails} exact />
        <Route path="/contact" component={Contact} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/confirmation/:email/:token" component={ConfirmEmail} />

        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/shipping" component={ShippingInfo} />
        <ProtectedRoute path="/confirm" component={ConfirmOrder} />
        <ProtectedRoute path="/success" component={OrderSuccess} />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" component={Payment} />
          </Elements>
        )}
        <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        <ProtectedRoute path="/order/:id" component={OrderDetails} exact />

        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
          exact
        />
        <ProtectedRoute
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
          exact
        />

        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          component={OrdersList}
          exact
        />

        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
          exact
        />

        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/update/me" component={UpdateProfile} exact />
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />

        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
          exact
        />

        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />
      </div>
    </Router>
  );
}
export default App;
