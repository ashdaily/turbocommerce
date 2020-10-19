import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./App.css";
import 'antd/dist/antd.css';
import Login from "./pages/Login";
import Shop from "./pages/Shop";


function App() {
  return (
      <Router>
        

          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/shop">
              <Shop />
            </Route>
          </Switch>
       
       
      </Router>
  )
}

export default App;
