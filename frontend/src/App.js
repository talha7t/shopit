import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/commons/Header";
import Home from "./components/Home";
import { ProductDetails } from "./components/ProductDetails";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";

function App() {
  return (
    <Router>
      <div className="APP">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/products/:id" component={ProductDetails} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </div>
    </Router>
  );
}
export default App;
