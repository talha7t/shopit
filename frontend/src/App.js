import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/commons/Header";
import Home from "./components/Home";
import store from "./store";
import { ProductDetails } from "./components/ProductDetails";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import { Profile } from "./components/user/Profile";
import { ProtectedRoute } from "./components/route/ProtectedRoute";

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
        <ProtectedRoute path="/me" component={Profile} exact />
      </div>
    </Router>
  );
}
export default App;
