import { createContext } from "react";

const ShopContext = createContext({
    addToCart : () => {},
    removeToCart : (id) => {
        let cartData = localStorage.getItem('cartItems');
    
        let cart = [];
        if (cartData && cartData.length > 0) {
            cart = JSON.parse(cartData);
            cart = cart.filter((cartItem) => cartItem.id !== id);
        }
        let count = 0;
        cart.forEach((item, i) => {
            count = count + item.qty
        })
    
        localStorage.setItem("cartItems", JSON.stringify(cart));
        localStorage.setItem("totalCartItems", count);
    },
    cartItems : '',
    totalCartItems : localStorage.getItem('totalCartItems'),
});

export default ShopContext;