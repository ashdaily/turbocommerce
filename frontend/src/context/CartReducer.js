import axios from "../util/Axios";

const Storage = (Items) => {
	let cart_ids = Items.map((product) => product.id);
	if (cart_ids) {
		axios.get(`/api/products/in-ids/?id=${cart_ids}`).then((response) => {
			if (response.status === 200) {
				let new_CartData = Items.map((item) => {
					let found = response.data.results.find(
						(product) => product.id === item.id
					);
					if (found) {
						let variant = found.product_variants.find(
							(variant) => variant.id === item.variant_id
						);
						if (
							variant &&
							item.quantity > variant.stock_keeping_unit
						) {
							item.out_of_stock = "yes";
						} else {
							item.out_of_stock = "no";
						}
					} else {
						item.out_of_stock = "yes";
					}
					return item;
				});
				localStorage.setItem(
					"cartItems",
					JSON.stringify(new_CartData.length > 0 ? new_CartData : [])
				);
			}
		});
	}
};

export const sumItems = (Items) => {
	Storage(Items);
	let totalCartItems =
		Items.length > 0
			? Items.reduce((total, product) => total + product.quantity, 0)
			: 0;
	let total =
		Items.length > 0
			? Items.reduce(
					(total, product) =>
						total + product.price * product.quantity,
					0
			  ).toFixed(2)
			: 0;
	return { totalCartItems, total };
};

export const CartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM":
			if (
				!state.cartItems.find(
					(item) =>
						item.id === action.payload.id &&
						item.variant_id === action.variant.id
				)
			) {
				state.cartItems.push({
					id: action.payload.id,
					variant_id: action.variant.id,
					name: action.payload.product_name,
					price: action.variant.price,
					out_of_stock: "no",
					quantity: 1,
				});
			}

			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [...state.cartItems],
			};
		case "REMOVE_ITEM":
			return {
				...state,
				...sumItems(
					state.cartItems.filter((item) => item.id !== action.p_id)
				),
				cartItems: [
					...state.cartItems.filter(
						(item) => item.id !== action.p_id
					),
				],
			};
		case "INCREASE":
			state.cartItems[
				state.cartItems.findIndex(
					(item) =>
						item.id === action.payload.id &&
						item.variant_id === action.variant.id
				)
			].quantity++;
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [...state.cartItems],
			};
		case "DECREASE":
			state.cartItems[
				state.cartItems.findIndex(
					(item) => item.id === action.payload.id
				)
			].quantity--;
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [...state.cartItems],
			};
		case "CHECKOUT":
			return {
				cartItems: [],
				checkout: true,
				...sumItems([]),
			};
		case "CLEAR":
			return {
				cartItems: [],
				...sumItems([]),
			};
		default:
			return state;
	}
};
