import React  from 'react';
import {mount, shallow} from "enzyme";
import AddressModal from "./AddressModal";
import {ShopContext} from "../../context/ShopContext";
import {BrowserRouter as Router} from "react-router-dom";

describe('<AddressModal />', () => {
    it('renders address modal show false', () => {
        const wrapper = mount(<Router>
            <ShopContext.Provider
                value={{actionCreateAddress: () => {}}}>
                <AddressModal show={false} />
            </ShopContext.Provider>
        </Router>);
        expect(wrapper.contains('Add New Address')).toBe(false);

    });


    it('renders address modal show true', () => {
        const wrapper = mount(<Router>
            <ShopContext.Provider
                value={{actionCreateAddress: () => {}}}>
                <AddressModal show={true} />
            </ShopContext.Provider>
        </Router>);
        expect(wrapper.contains('Add New Address')).toBe(true);

    });

});
