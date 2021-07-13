import React, {useContext, useEffect} from 'react';
import {shallow, mount} from "enzyme";
import ShopContextProvider, {ShopContext} from "../../context/ShopContext";
import {BrowserRouter as Router} from 'react-router-dom';
import Address from "./Address";
import AddressTile from "./component/AddressTile";

const address = [{
    address: "1st floor somewhere in chandigarh",
    address_type: "HOME",
    alternate_phone_number: "",
    city: "Chandigarh",
    country: "India",
    country_code_alternate_phone_number: "+91",
    country_code_primary_phone_number: "+91",
    customer: 4,
    default_address: false,
    id: 55,
    postal_code: "160002",
    primary_phone_number: "+918146666618",
    province: "Chandigarh",
}];

describe('<Address />', () => {
    it('renders address page without any address', () => {
        const wrapper = mount(<Router><ShopContextProvider><Address/></ShopContextProvider></Router>);
        expect(wrapper.contains('Add New Address')).toBe(true);
    });

    it('renders address page with address', () => {
        const wrapper = mount(<Router>
            <ShopContext.Provider
                value={{addresses: address,actionGetAddresses: () => {}}}>
                <Address/>
            </ShopContext.Provider>
        </Router>);
        expect(wrapper.contains(AddressTile)).toBe(true);

    });

});
