import React from 'react';
import {mount, shallow} from "enzyme";
import QtyItem from "./QtyItem";

describe('<QuantityModal />', () => {
    it('quantity item', () => {
        const wrapper = mount(<QtyItem title={'qtyText'} isSelected={true}/>);
        // expect((wrapper)).toMatchSnapshot();
        expect(wrapper.find("button.itemSelected").length).toBe(1);
        expect(wrapper.find("button").text()).toEqual('qtyText');
    });

    it('quantity item unselected', () => {
        const wrapper = mount(<QtyItem title={'qtyTextUnSelected'} isSelected={false}/>);
        expect(wrapper.find("button.itemSelected").length).toBe(0);
        expect(wrapper.find("button").text()).toEqual('qtyTextUnSelected');
    });
});
