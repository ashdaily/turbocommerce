import React  from 'react';
import {mount} from "enzyme";
import ShopContextProvider from "../../context/ShopContext";
import {BrowserRouter as Router} from 'react-router-dom';
import Wishlist from "../Wishlist";

describe('<Wishlist />', () => {
    it('renders wishlist without login', () => {
        const wrapper = mount(<Router><ShopContextProvider><Wishlist/></ShopContextProvider></Router>);
        expect(wrapper.contains('PLEASE LOG IN')).toBe(true);

    });
});
