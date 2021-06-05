import React from 'react';
import EmptyCart from "./EmptyCart";
import { shallow, mount } from "enzyme";
import Cart from './Cart';
import ShopContextProvider from "../../context/ShopContext";
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Cart />', () => {
    it('renders cart components', () => {
        // const contextValue = { a: '1' };
        // jest.spyOn(ShopContext, 'useShopContext').mockImplementation(() => contextValue);
        const wrapper = mount(<Router><ShopContextProvider><Cart/></ShopContextProvider></Router>);

        // expect((wrapper)).toMatchSnapshot();

        expect(wrapper.contains(EmptyCart)).toBe(true);

    });
});
