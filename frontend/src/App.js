import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/commons/Header";
import Home from "./components/Home";
import { ProductDetails } from "./components/ProductDetails";

function App() {
  return (
    <Router>
      <div className="APP">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/product/:id" componenent={ProductDetails} exact />
      </div>
    </Router>
  );
}
export default App;
