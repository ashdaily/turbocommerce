import React, {useContext, useMemo} from 'react';
import {ShopContext} from "../../context/ShopContext";
import {isLoggedIn} from "../../util/Auth";
import {toast} from "react-toastify";
import axios from "../../util/Axios";
import WishlistButton from "./WishlistButton";

const Wishlist = ({data, component}) =>  {
    const {
        addProductToWishlist,
        removeProductFromWishlist,
        wishlistItems,
    } = useContext(ShopContext);

    const isInWishlist = useMemo(() => {
        return wishlistItems.find((item) => item.id === data.id);
    }, [data, wishlistItems]);

    const addToWishlisht = () => {
        if (!isLoggedIn) {
            toast.error("Please login first before adding product to wishlist!");
            return;
        }
        axios
            .post("api/customer/wishlist/", {
                product: data.id,
            })
            .then((response) => {
                if (response.status === 201) {
                    addProductToWishlist(data);
                    toast.success("Product added to wishlist!");
                } else {
                    toast.error("Something went wrong Please try again!");
                }
            });
    };

    const removeFromWishlisht = () => {
        axios.delete(`api/customer/wishlist/${data.id}/`).then((response) => {
            if (response.status === 204) {
                removeProductFromWishlist(data);
                toast.success("Product removed to wishlist!");
            } else {
                toast.error("Something went wrong Please try again!");
            }
        });
    };

    if (component) {
        const Component = component;
        return (
            <Component
                remove={removeFromWishlisht}
                add={addToWishlisht}
                data={data}
                isWishlisted={isInWishlist}
            />
        )
    }
    return (
        <WishlistButton
            remove={removeFromWishlisht}
            add={addToWishlisht}
            data={data}
            isWishlisted={isInWishlist}
        />
    )
};

export default Wishlist;
