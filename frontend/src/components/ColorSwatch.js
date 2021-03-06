import React from "react";

const ColorSwatch = (props) => {

    const SwatchProduct = (index) => {
        props.onClick(index)
    }

	return (
		<tr>
			<td>Colors</td>
			<td>
				<ul
                className="color-variant"
					style={{
						padding: "0px",
						marginBottom: "10px",
					}}
				>
					{props.variants.map(({ color, id }, index) => (
						<li
							className={props.active === index ? 'active mr-2' : 'mr-2'}
							variant="outline-primary"
							key={id}
							size="sm"
							style={{
								background: color,
								display: "inline-block",
								height: "30px",
								width: "30px",
								pointer: "cursor",
								borderRadius: "100%",
								marginRight: "5px",
								marginBottom: "5px",
								transition: "all 0.1s ease",
								verticalAlign: "middle",
							}}
							onClick={() =>
								SwatchProduct(index)
							}
						></li>
					))}
				</ul>
			</td>
		</tr>
	);
};

export default ColorSwatch