import { useEffect } from "react";
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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="APP">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/products/:id" component={ProductDetails} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/cart" component={Cart} exact />
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
