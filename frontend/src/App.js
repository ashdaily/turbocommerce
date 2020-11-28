import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pay from "./pages/Pay";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";


function App() {
  return (
      <Router>
          <Switch>
            <PrivateRoute exact path="/pay" component={Pay} />
            <Route exact path="/" component={ProductList} />
            <Route exact path="/:id" component={ProductDetails} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
      </Router>
  )
}

export default App;
