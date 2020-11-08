import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";
import 'antd/dist/antd.css';
import Login from "./pages/Login";
import Shop from "./pages/Shop";


function App() {
  return (
      <Router>
          <Switch>
            <Route exact path="/" exact>
                {localStorage.getItem("accessToken") === null ? <Login /> : <Redirect to="/shop" />}
            </Route>
            <Route exact path="/shop">
              <Shop />
            </Route>
          </Switch>
      </Router>
  )
}

export default App;
