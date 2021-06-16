import React from 'react';
import {mount} from "enzyme";
import WishlistButton from "../Wishlist/WishlistButton";

describe('<WishlistButton />', () => {
    it('check wishlist button render with wishlist true', () => {
        const wrapper = mount(<WishlistButton isWishlisted={true} />);
        expect(wrapper.find("i.fa")).toHaveLength(1);
    });

    it('check wishlist button render with wishlist false', () => {
        const wrapper = mount(<WishlistButton isWishlisted={false} />);
        expect(wrapper.find("i.far")).toHaveLength(1);
    });
});
