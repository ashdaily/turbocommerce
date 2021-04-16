import React from "react";
import SocialLogin from "react-social-login";
import { Button } from "react-bootstrap";

class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <Button onClick={triggerLogin} {...props}>
        {children}
      </Button>
    );
  }
}

export default SocialLogin(SocialButton);
