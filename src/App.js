import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Incode from "./Incode";
import "./index.css";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/incode">Incode</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <div>
              <p>Home</p>
            </div>
          </Route>
          <Route path="/about">
            <div>
              <p>About</p>
            </div>
          </Route>
          <Route path="/dashboard">
            <div>
              <p>Dashboard</p>
            </div>
          </Route>

          <Route path="/incode">
            <Incode />
          </Route>
        </Switch>
        <Link to="/incode">
          <button type="button">Start On Boarding!</button>
        </Link>
      </div>
    </Router>
  );
}
