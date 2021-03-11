import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import CategoryCard from "../components/CategoryCard";
import axios from "../util/Axios";

export default () => {
	const { grandParentCat } = useParams();
	const [productParentCategory, setProductParentCategory] = useState(null);

	useEffect(() => {
		axios.get("/api/products/categories/").then((response) => {
			if (response.status === 200) {
				let catData = response.data.find(
					(category) => category.slug === grandParentCat
				);
				setProductParentCategory(catData);
			}
		});
	}, [grandParentCat]);

	console.log(productParentCategory);
	if (!productParentCategory) return null;

	return (
		<>
			<Row>
				{productParentCategory.product_parent_categories.map(
					(category, index) =>
						(
							<Col md={4}>
								<CategoryCard
									key={index}
									data={category}
									parentCat={grandParentCat}
								/>
							</Col>
						)
				)}
			</Row>
		</>
	);
};
