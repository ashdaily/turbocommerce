import React  from 'react';
import {mount} from "enzyme";
import WishlistButton from './WishlistButton';

describe('<WishlistButton />', () => {
    it('renders wislist button component without wishlisted', () => {
        const wrapper = mount(<WishlistButton isWishlisted={false}></WishlistButton>);
        expect(wrapper.find(".far").length).toEqual(1);
        expect(wrapper.find(".fa").length).toEqual(0);
    });

    it('renders wislist button component when wishlisted', () => {
        const wrapper = mount(<WishlistButton isWishlisted={true}></WishlistButton>);
        expect(wrapper.find(".fa").length).toEqual(1);
        expect(wrapper.find(".far").length).toEqual(0);
    });
});
