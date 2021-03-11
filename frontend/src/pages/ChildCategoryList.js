import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import CategoryCard from "../components/CategoryCard";
import axios from "../util/Axios";

export default () => {
	const { grandParentCat, parentCat } = useParams();
	const [productCategory, setProductCategory] = useState(null);

	useEffect(() => {
		axios.get("/api/products/categories/").then((response) => {
			if (response.status === 200) {
				let parentCatData = response.data.find((parentCategory) =>
					(parentCategory.slug === grandParentCat)
				);
                let catData = parentCatData.product_parent_categories.find((category) =>
                (category.slug === parentCat)
            );
				setProductCategory(catData);
			}
		});
	}, [grandParentCat, parentCat]);

	console.log(productCategory);
	if (!productCategory) return null;

	return (
		<>
			<Row>
				{productCategory.product_child_categories.map(
					(category, index) => (
						<Col md={4}>
							<CategoryCard
								key={index}
								data={category}
								parentCat={grandParentCat}
								cat={parentCat}
							/>
						</Col>
					)
				)}
			</Row>
		</>
	);
};
