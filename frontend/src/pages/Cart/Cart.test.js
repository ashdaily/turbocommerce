import React, {useContext, useEffect} from 'react';
import EmptyCart from "./EmptyCart";
import {shallow, mount} from "enzyme";
import Cart from './Cart';
import ShopContextProvider, {ShopContext} from "../../context/ShopContext";
import {BrowserRouter as Router} from 'react-router-dom';
import CartItem from "./CartItem";

const cartItems = [{
    "id": 4,
    "variant_id": 6,
    "name": "sleeve product",
    "price": 1200,
    "in_stock": true,
    "size": "m",
    "color": "#FF0F36",
    "image": "/static/media/logo.eb741475.jpg",
    "brand": "tommy",
    "quantity": 1,
    "product_url": "/men/tshirts/sleeves/sleeve-product"
}]

describe('<Cart />', () => {
    it('renders cart components without any item', () => {
        const wrapper = mount(<Router><ShopContextProvider><Cart/></ShopContextProvider></Router>);
        expect(wrapper.contains(EmptyCart)).toBe(true);

    });

    it('renders cart components with cart items', () => {
        // const contextValue = { a: '1' };
        // jest.spyOn(ShopContext, 'useShopContext').mockImplementation(() => contextValue);
        const wrapper = mount(<Router>
            <ShopContext.Provider
                value={{cartItems: cartItems, storeInfo: {default_currency: 'RS'}}}>
                <Cart/>
            </ShopContext.Provider>
        </Router>);
        // expect((wrapper)).toMatchSnapshot();
        expect(wrapper.contains(CartItem)).toBe(true);

    });
});
