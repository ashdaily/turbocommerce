import React from 'react';
import {mount} from "enzyme";
import WishlistHeart from "../Wishlist/WishlistHeart";

describe('<WishlistHeart />', () => {
    it('check wishlist button render with wishlist heart true', () => {
        const wrapper = mount(<WishlistHeart isWishlisted={true} />);
        expect(wrapper.find("i.fa")).toHaveLength(1);
    });

    it('check wishlist button render with wishlist heart false', () => {
        const wrapper = mount(<WishlistHeart isWishlisted={false} />);
        expect(wrapper.find("i.far")).toHaveLength(1);
    });
});
