import React from "react";
import { Redirect, Route } from "react-router-dom";

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("accessToken") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            // state={from: props.location}
          }}
        />
      )
    }
  ></Route>
);
