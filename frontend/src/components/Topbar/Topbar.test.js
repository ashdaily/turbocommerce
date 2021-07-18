import React  from 'react';
import {mount, shallow} from "enzyme";
import ShopContextProvider, {ShopContext} from "../../context/ShopContext";
import {BrowserRouter as Router} from 'react-router-dom';
import Topbar from "./Topbar";

describe('<Topbar />', () => {
    it('renders top bar', () => {
        const wrapper = mount(<Router><ShopContext.Provider value={{ totalCartItems: 1, storeInfo: { logo: '', title_tag: 'title' } }}><Topbar/></ShopContext.Provider></Router>);
        // expect((wrapper)).toMatchSnapshot();
        expect(wrapper.find("img").prop("alt")).toEqual('title');
        expect(wrapper.find("a#cartLink").text()).toEqual(' Cart (1)');
    });
});
