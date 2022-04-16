import Header from "./commons/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="APP">
        <Header />
        <Route path="/" component={Home} exact />
      </div>
    </Router>
  );
}
export default App;
