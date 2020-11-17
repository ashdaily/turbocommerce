import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";


function App() {
  return (
      <Router>
          <Switch>
            <PrivateRoute exact path="/shop" component={Shop} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
      </Router>
  )
}

export default App;
