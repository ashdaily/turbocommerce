import React from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";


export default (props) => {

	let history = useHistory();
	return (
		<ListGroup.Item
			as="li"
			activeKey="/"
			style={{ cursor: "pointer" }}
			onClick={() => {
				history.push("/cart");
			}}
			key={100}
		>
			<i className="fa fa-shopping-cart"></i> Cart &nbsp;
			<Badge variant="primary" size="md">
				{props.countItems}
			</Badge>
		</ListGroup.Item>
	);
};
