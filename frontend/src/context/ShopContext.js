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

	const increase = (payload, variant) => {
		dispatch({ type: "INCREASE", payload, variant });
	};

	const decrease = (payload) => {
		dispatch({ type: "DECREASE", payload });
	};

	const addProduct = (payload, variant) => {
		dispatch({ type: "ADD_ITEM", payload, variant });
	};

	const removeProduct = (p_id) => {
		dispatch({ type: "REMOVE_ITEM", p_id });
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