import React, { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { saveTokens } from "../util/Auth";
import axios from "../util/Axios";
import SocialButton from "../components/SocialButton";
import "../css/login.scss";

export default () => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [redirect, setRedirect] = useState(false);
	const [validated, setValidated] = useState(false);

	const handleSocialLogin = (user) => {
		console.log(user);
	};

	const handleSocialLoginFailure = (err) => {
		console.error(err);
	};

	function handleForm(e) {
		const form = e.currentTarget;
		e.preventDefault();
		if (form.checkValidity() === false) {
			e.stopPropagation();
			setValidated(true);
			return;
		}

		const payload = {
			username: email,
			password: password,
		};
		axios
			.post("api/core/auth/token/", payload)
			.then((response) => {
				if (response.status === 200) {
					const accessToken = response.data.access;
					const refreshToken = response.data.refresh;
					saveTokens(accessToken, refreshToken);
					setRedirect(true);
					// FIXME: confirm is there is a better way to do this
					window.location.reload();
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const form = (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card title="Login" className="p-3 mt-5 text-center">
					<Form
						noValidate
						validated={validated}
						onSubmit={handleForm}
					>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								required
								type="email"
								placeholder="Enter email"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid">
								Please choose a email.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								required
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid">
								Please choose a password.
							</Form.Control.Feedback>
						</Form.Group>

						<Button variant="primary" type="submit" block>
							Login
						</Button>
					</Form>
					<center className="center-line">
						<span>OR</span>
					</center>
					<SocialButton
						className="gmail-btn mt-2"
						provider="google"
						appId="427421314489-kd63pc8k47enqeuauctb5dtu3c6hhi6f.apps.googleusercontent.com"
						onLoginSuccess={handleSocialLogin}
						onLoginFailure={handleSocialLoginFailure}
					>
						<img src="/google.svg" alt="Google Icon"/> Login with Google
					</SocialButton>
					<SocialButton
						variant="primary"
						className="facebook-btn mt-2"
						provider="facebook"
						appId="1762595890586028"
						onLoginSuccess={handleSocialLogin}
						onLoginFailure={handleSocialLoginFailure}
					>
						<i className="fa fa-facebook-square"></i> Login with
						Facebook
					</SocialButton>
				</Card>
			</Col>
		</Row>
	);

	if (redirect) return <Redirect to="/" />;

	return form;
};
