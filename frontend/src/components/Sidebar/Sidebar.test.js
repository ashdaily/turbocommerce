import React from 'react';
import {mount, shallow} from "enzyme";
import ShopContextProvider, {ShopContext} from "../../context/ShopContext";
import {BrowserRouter as Router} from 'react-router-dom';
import Cart from "./Cart";
import Logo from "./Logo";
import LoginSignup from "./LoginSignup";
import Wishlist from "./Wishlist";

describe('<Sidebar />', () => {
    it('sidebar cart', () => {
        const wrapper = mount(<Router>
            <ShopContext.Provider value={{totalCartItems: 15}}>
                <Cart/>
            </ShopContext.Provider>
        </Router>);
        // expect((wrapper)).toMatchSnapshot();
        expect(wrapper.find("a#sidebarCartLink").text()).toEqual('Cart 15');
    });

    it('sidebar logo', () => {
        const wrapper = mount(<Router>
            <ShopContext.Provider value={{storeInfo: {logo: '', title_tag: 'title'}}}>
                <Logo/>
            </ShopContext.Provider>
        </Router>);
        expect(wrapper.find("img").prop("alt")).toEqual('title');
    });

    it('sidebar login', () => {
        const wrapper = mount(<Router>
            <LoginSignup/>
        </Router>);
        expect(wrapper.find("a#sidebarLoginLink").text()).toEqual('Login');
        expect(wrapper.find("a#sidebarSignupLink").text()).toEqual('Signup');
    });

    it('sidebar cart', () => {
        const wrapper = mount(<Router>
            <ShopContext.Provider value={{totalWishlistItems: 20}}>
                <Wishlist/>
            </ShopContext.Provider>
        </Router>);
        expect(wrapper.find("a").text()).toEqual('Wishlist 20');
    });
});
