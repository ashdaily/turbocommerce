import React, {createContext, useReducer, useContext} from "react";
import {CartReducer, sumItems} from "./CartReducer";
import {WishlistReducer, sumWishlistItems} from "./WishListReducer";
import {AppSettingsReducer} from "./AppSettingsReducer";
import {serviceGetStoreInformation} from "../services/AppSettings.service";
import {toast} from "react-toastify";
import ToastUtils from "../util/ToastUtils";
import {isLoggedIn} from "../util/Auth";
import {serviceGetWishlistData} from "../services/Wishlist.service";

export const ShopContext = createContext({
    cartItems: [],
    checkout: false,
    storeInfo: {
        default_currency: "",
        logo: "",
        store_name: "",
        title_tag: "",
    },
    total: 0,
    totalCartItems: 0,
    totalWishlistItems: 0,
    wishlistItems: [],
});

export const useShopContext = () => useContext(ShopContext);

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

const initialStoreInfo = localStorage.getItem('storeInfo') ? JSON.parse(localStorage.getItem('storeInfo')) : {
    title_tag: '',
    logo: '',
    store_name: '',
};

const initialWishlistState = {
    wishlistItems: wishlistStorage,
    ...sumWishlistItems(wishlistStorage),
};

const appSettingsInitialValue = {
    storeInfo: initialStoreInfo,
};


const ShopContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);
    const [wishlistState, wishlistDispatch] = useReducer(
        WishlistReducer,
        initialWishlistState
    );
    const [appSettingState, appSettingDispatch] = useReducer(AppSettingsReducer, appSettingsInitialValue);

    const syncWishlist = () => {
        if (isLoggedIn) {
            const req = serviceGetWishlistData();
            req.then((res) => {
                if (!res.error) {
                    const wishlistIds = res.data.results.map(item => {
                        return {id: item.id}
                    });
                    wishlistDispatch({type: 'SYNC_WISHLIST', payload: wishlistIds});
                } else {
                    wishlistDispatch({type: 'SYNC_WISHLIST', payload: []});
                }
            });
        }
    }

    const updateStoreInfo = (data) => {
        if (initialStoreInfo.title_tag != '') {
            appSettingDispatch({type: 'UPDATE_STORE_INFO', payload: initialStoreInfo});
        }
        const req = serviceGetStoreInformation();
        req.then((res) => {
            if (!res.error) {
                const data = res.data.length > 0 ? res.data[0] : null;
                if (data) {
                    appSettingDispatch({type: 'UPDATE_STORE_INFO', payload: data});
                }
            }
        });

    };

    const increase = (productId, variantId) => {
        dispatch({type: "INCREASE", productId, variantId});
    };

    const decrease = (productId, variantId) => {
        dispatch({type: "DECREASE", productId, variantId});
    };

    const addProduct = (payload, variant) => {
        ToastUtils.showInfo('Product Added');
        dispatch({type: "ADD_ITEM", payload, variant});
    };

    const removeProduct = (productId, variantId) => {
        ToastUtils.showInfo('Product Removed');
        dispatch({type: "REMOVE_ITEM", productId, variantId});
    };

    const changeCartQty = (productId, variantId, qty) => {
        dispatch({type: 'CHANGE_CART_QTY', payload: {productId, variantId, qty}});
    };

    const clearCart = () => {
        dispatch({type: "CLEAR"});
    };

    const handleCheckout = () => {
        console.log("CHECKOUT", state);
        dispatch({type: "CHECKOUT"});
    };

    const addProductToWishlist = (payload) => {
        wishlistDispatch({type: "ADD_ITEM_TO_WISHLIST", payload});
    };

    const removeProductFromWishlist = (payload) => {
        wishlistDispatch({type: "REMOVE_ITEM_FROM_WISHLIST", payload});
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
        updateStoreInfo,
        syncWishlist,
        changeCartQty,
        ...state,
        ...wishlistState,
        ...appSettingState,
    };

    return (
        <ShopContext.Provider value={contextValues}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
