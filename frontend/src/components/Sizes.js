import React from "react";
import { Button } from "react-bootstrap";

const Sizes = (props) => {
	return (
		<tr>
			<td>Colors</td>
			<td>
				{props.sizes_available.map(({ name }, index) => (
					<Button
						className={props.size === index ? "active mr-2" : "mr-2"}
						variant="outline-primary"
						key={index}
						size="sm"
						onClick={() =>
							props.onClick(index)
						}
					>
						{name}
					</Button>
				))}
			</td>
		</tr>
	);
};

export default Sizes;
