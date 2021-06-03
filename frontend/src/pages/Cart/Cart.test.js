import React from 'react';
import EmptyCart from "./EmptyCart";
import renderer from "react-test-renderer";

describe('<EmptyCart />', () => {
    it('renders no cart item components', () => {
        const wrapper = renderer.create(
            <EmptyCart />,
        );
        expect(wrapper.find('div').html()).toContain(' Hey, No Product In Cart!');
    });
});
