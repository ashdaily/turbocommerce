import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import axios from "../util/Axios";
import "../css/SideBar.scss";

export default () => {
	const [
		productGrandParentCategory,
		setProductGrandParentCategory,
	] = useState(null);

	useEffect(() => {
		axios.get("/api/products/categories/").then((response) => {
			if (response.status === 200) {
				setProductGrandParentCategory(response.data);
			}
		});
	}, []);

	let categoryNames;
	let history = useHistory();

	if (productGrandParentCategory) {
		categoryNames = productGrandParentCategory.map((category, index) => (
			<ListGroup.Item
				as="li"
				key={index}
				className="dropdown custom-list"
			>
				{category.category_name}
					<ListGroup as="ul" className="dropdown-menu">
				{category.product_parent_categories.map((parentCategory, i) => (
					<>
						<ListGroup.Item as="li">
							<h6>{parentCategory.category_name}</h6>
						</ListGroup.Item>
						{parentCategory.product_child_categories.map(
							(childCategory, index) => (
								<ListGroup.Item
									action
									as="li"
                  style={{ cursor: "pointer" }}
									key={index}
									onClick={() => {
										history.push(`/${category.slug}/${parentCategory.slug}/${childCategory.slug}`);
									}}
								>
									{childCategory.category_name}
								</ListGroup.Item>
							)
						)}
					</>
				))}
				</ListGroup>
			</ListGroup.Item>
		));
	}

	return <>{categoryNames}</>;
};
