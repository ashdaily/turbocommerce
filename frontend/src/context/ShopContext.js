import React, { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "./CartReducer";
import { WishlistReducer, sumWishlistItems } from "./WishListReducer";

export const ShopContext = createContext();

const storage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: storage,
  ...sumItems(storage),
  checkout: false,
};

const wishlistStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];

const inittialWishlistState = {
  wishlistItems: wishlistStorage,
  ...sumWishlistItems(wishlistStorage),
};

const ShopContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const [wishlistState, wishlistDispatch] = useReducer(
    WishlistReducer,
    inittialWishlistState
  );

  const increase = (productId, variantId) => {
    dispatch({ type: "INCREASE", productId, variantId });
  };

  const decrease = (productId, variantId) => {
    dispatch({ type: "DECREASE", productId, variantId });
  };

  const addProduct = (payload, variant) => {
    dispatch({ type: "ADD_ITEM", payload, variant });
  };

  const removeProduct = (productId, variantId) => {
    dispatch({ type: "REMOVE_ITEM", productId, variantId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    console.log("CHECKOUT", state);
    dispatch({ type: "CHECKOUT" });
  };

  const addProductToWishlist = (payload, variant) => {
    wishlistDispatch({ type: "ADD_ITEM_TO_WISHLIST", payload, variant });
  };

  const removeProductFromWishlist = (productId, variantId) => {
    wishlistDispatch({
      type: "REMOVE_ITEM_FROM_WISHLIST",
      productId,
      variantId,
    });
  };

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    addProductToWishlist,
    removeProductFromWishlist,
    ...state,
    ...wishlistState,
  };

  return (
    <ShopContext.Provider value={contextValues}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
