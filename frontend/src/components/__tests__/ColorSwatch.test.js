import React from 'react';
import {mount} from "enzyme";
import ColorSwatch from "../ColorSwatch";

const colors = [{color: 'red'}, {color: 'blue'}, {color: 'pink'}]

describe('<ColorSwatch />', () => {
    it('check color render rows', () => {
        const wrapper = mount(<table><tbody><ColorSwatch active={'pink'} colors={colors} /></tbody></table>);
        expect(wrapper.find("ul").children()).toHaveLength(3);
        expect(wrapper.find("ul").children('li.active')).toHaveLength(1);
    });

    it('check color render rows without selected color', () => {
        const wrapper = mount(<table><tbody><ColorSwatch size={'black'} colors={colors} /></tbody></table>);
        expect(wrapper.find("ul").children('li.active')).toHaveLength(0);
    });
});
