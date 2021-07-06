import React, {useContext, useEffect, useRef} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist";
import Signup from "./pages/Signup";
import Pay from "./pages/Pay";
import ProductList from "./pages/ProductList";
import ProductCategoryList from "./pages/ProductCategoryList";
import ProductDetails from "./pages/ProductDetails";
import "./App.scss";
import {ShopContext} from "./context/ShopContext";
import Sidebar from "./components/Sidebar/Sidebar";
import NotFound from "./pages/404/NotFound";
import Topbar from "./components/Topbar/Topbar";
import Address from "./pages/Address/Address";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Checkout from "./pages/Checkout/Checkout";

function App() {
    const {updateStoreInfo, syncWishlist} = useContext(ShopContext);
    const mountRef = useRef(false);

    useEffect(() => {
        if (!mountRef.current) {
            updateStoreInfo();
            syncWishlist();
        }
        mountRef.current = true;
    }, [mountRef, updateStoreInfo, syncWishlist]);

    return (
        <Router>
            <Topbar/>
            <Container fluid>
                <ToastContainer/>
                <Sidebar/>
                <div className={'contentArea'}>
                    <Switch>
                        <PrivateRoute exact path="/pay" component={Pay}/>
                        <Route exact path="/" component={ProductList}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/cart" component={Cart}/>
                        <Route exact path="/wishlist" component={Wishlist}/>
                        <PrivateRoute exact path="/addresses" component={Address}/>
                        <PrivateRoute exact path="/change/password" component={ChangePassword}/>
                        <Route
                            exact
                            path={'/checkout'}
                            component={Checkout}
                        />
                        <Route
                            exact
                            path="/:grandParentCategory"
                            component={ProductCategoryList}
                        />
                        <Route
                            exact
                            path="/:grandParentCategory/:parentCategory"
                            component={ProductCategoryList}
                        />
                        <Route
                            exact
                            path="/:grandParentCategory/:parentCategory/:childCategory"
                            component={ProductCategoryList}
                        />
                        <Route
                            exact
                            path="/:grandParentCategory/:parentCategory/:childCategory/:slug"
                            component={ProductDetails}
                        />
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Container>
        </Router>
    );
}

export default App;
