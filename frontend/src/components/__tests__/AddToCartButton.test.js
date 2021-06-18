import React from 'react';
import {mount} from "enzyme";
import {BrowserRouter as Router} from 'react-router-dom';
import AddToCartButton from "../AddToCartButton";
import {ShopContext} from "../../context/ShopContext";

const cartItems = [
    {
        id: 1,
        variant_id: 2,
        quantity: 4,
    },
];

const product = {id: 1};
const variant = {id: 2};
const secondVariant = {id: 3};

describe('<AddToCartButton />', () => {
    it('renders AddToCartButton button with quantity', () => {
        const wrapper = mount(<Router>
            <ShopContext.Provider value={{cartItems: cartItems}}>
                <AddToCartButton data={product} variant={variant}/>
            </ShopContext.Provider>
        </Router>);
        expect(wrapper.find("span").text()).toEqual('4');
    });

    it('renders AddToCartButton button with no quantity', () => {
        const wrapper = mount(<Router>
            <ShopContext.Provider value={{cartItems: cartItems}}>
                <AddToCartButton data={product} variant={secondVariant}/>
            </ShopContext.Provider>
        </Router>);
        expect(wrapper.find("button").text()).toEqual('Add to cart ');
    });
});
