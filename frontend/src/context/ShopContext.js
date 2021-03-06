import React, { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "./CartReducer";

export const ShopContext = createContext();

const storage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];
const initialState = {
	cartItems: storage,
	...sumItems(storage),
	checkout: false,
};

const ShopContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CartReducer, initialState);

	const increase = (payload, variant, size) => {
		dispatch({ type: "INCREASE", payload, variant, size });
	};

	const decrease = (payload, variant, size) => {
		dispatch({ type: "DECREASE", payload, variant, size });
	};

	const addProduct = (payload, variant, size) => {
		dispatch({ type: "ADD_ITEM", payload, variant, size });
	};

	const removeProduct = (p_id, variant_id, size) => {
		dispatch({ type: "REMOVE_ITEM", p_id, variant_id, size });
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR" });
	};

	const handleCheckout = () => {
		console.log("CHECKOUT", state);
		dispatch({ type: "CHECKOUT" });
	};

	const contextValues = {
		removeProduct,
		addProduct,
		increase,
		decrease,
		clearCart,
		handleCheckout,
		...state,
	};

	return (
		<ShopContext.Provider value={contextValues}>
			{children}
		</ShopContext.Provider>
	);
};

export default ShopContextProvider;