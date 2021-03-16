import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "../util/Axios";
import { useHistory } from "react-router-dom";
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
				{category.product_parent_categories.map((parentCat, i) => (
					<ListGroup as="ul" key={i} className="dropdown-menu">
						<ListGroup.Item as="li">
							{parentCat.category_name}
						</ListGroup.Item>
						{parentCat.product_child_categories.map(
							(childCategoey, cKey) => (
								<ListGroup.Item
									action
									as="li"
                  style={{ cursor: "pointer" }}
									key={cKey}
									onClick={() => {
										history.push(`/${category.slug}/${parentCat.slug}/${childCategoey.slug}`);
									}}
								>
									{childCategoey.category_name}
								</ListGroup.Item>
							)
						)}
					</ListGroup>
				))}
			</ListGroup.Item>
		));
	}

	return <>{categoryNames}</>;
};
