import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pay from "./pages/Pay";
import SideBar from "./components/SideBar";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import "./App.scss";

function App() {
  return (
      <Router>
        <Container fluid>
          <ToastContainer />
          <Row>
              <Col md={2}>
                  <SideBar />
              </Col>
              <Col md={10}>
                <Switch>
                  <PrivateRoute exact path="/pay" component={Pay} />
                  <Route exact path="/" component={ProductList} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/:id" component={ProductDetails} />
                </Switch>
              </Col>
          </Row>
        </Container>
          
      </Router>
  )
}

export default App;
