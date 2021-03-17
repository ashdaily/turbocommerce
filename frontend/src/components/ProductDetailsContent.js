import React, { useReducer } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import ColorSwatch from './ColorSwatch';
import Sizes from './Sizes';
import AddToCartButton from './AddToCartButton'

const ProductDetailsContent = ({ data }) => {

	const initvariant = 0;

	const reducer = (variant, action) => {
		variant = action.index;
		return variant;
	};
    
    const initsize = 0;

	const changeSize = (size, action) => {
		size = action.index;
		return size;
	};

	const [variant, dispatchSwatch] = useReducer(reducer, initvariant);
	const [size, dispatchSize] = useReducer(changeSize, initsize);

	const product_specification = data.product_variants[
		variant
	].product_variant_specifications.map(
		({ specification_name, specification_value }, index) => {
			return (
				<tr key={index}>
					<td>{specification_name}</td>
					<td>{specification_value}</td>
				</tr>
			);
		}
	);

    const handleSwatch = (index) => {
        dispatchSwatch({
            index: index
        })
        dispatchSize({
            index: 0
        })
    }

	return (
		<Row className="product-details-content">
			<Col>
				<h5>{data.product_name}</h5>
				<div className="table-responsive">
					<Table size="lg">
						<tbody>
							<tr>
								<td>Brand</td>
								<td>{data.brand.brand_name}</td>
							</tr>
							<tr>
								<td>Description</td>
								<td>{data.product_description}</td>
							</tr>
							<tr>
								<td>Price</td>
								<td>
									Rs. {data.product_variants[variant].price}
								</td>
							</tr>
							<tr>
								<td>Weight</td>
								<td>
									{
										data.product_variants[variant]
											.weight_in_grams
									}{" "}
									g
								</td>
							</tr>
							<tr>
								<td>Returnable</td>
								<td>
									{data.returnable ? (
										'Yes'
									) : (
										'No'
									)}
								</td>
							</tr>
                            <ColorSwatch variants={data.product_variants} onClick={(index) => handleSwatch(index)} active={variant}/>
                            <Sizes sizes_available={data.product_variants[variant].sizes_available} onClick={(index) => dispatchSize({
                                index: index
                            })} size={size} />
						</tbody>
					</Table>
				</div>
                <AddToCartButton data={data} variant={data.product_variants[variant]} size={size} />
				<Button variant="danger" className="w-100 mt-3">
					Add to wishlist <i className="fa fa-heart"></i>
				</Button>

				<h5 className="mt-5">Product Specifications</h5>
				<div className="table-responsive">
					<Table size="lg">
						<tbody>{product_specification}</tbody>
					</Table>
				</div>
			</Col>
		</Row>
	);
};

export default ProductDetailsContent;
