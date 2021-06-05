import React from 'react';
import { mount } from "enzyme";
import NoProduct from './NoProduct';

test('No Product Component Test', () => {
    const wrapper = mount(<NoProduct />);
    expect(wrapper.contains('We couldn\'t find any matches!')).toBe(true);
});
