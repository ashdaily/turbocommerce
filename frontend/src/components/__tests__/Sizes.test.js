import React from 'react';
import {mount} from "enzyme";
import Sizes from "../Sizes";

const sizes = [{size: {name: 's'}}, {size: {name: 'l'}}, {size: {name: 'm'}}]

describe('<Sizes />', () => {
    it('check size render rows', () => {
        const wrapper = mount(<table><tbody><Sizes size={'l'} sizes={sizes} /></tbody></table>);
        expect(wrapper.find("ul").children()).toHaveLength(3);
        expect(wrapper.find("ul").children('li.active')).toHaveLength(1);
    });

    it('check size render rows without selected size', () => {
        const wrapper = mount(<table><tbody><Sizes size={'xxl'} sizes={sizes} /></tbody></table>);
        expect(wrapper.find("ul").children('li.active')).toHaveLength(0);
    });
});
