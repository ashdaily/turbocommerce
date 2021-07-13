import React  from 'react';
import {mount, shallow} from "enzyme";
import Stepper from "./Stepper";

describe('<Stepper />', () => {
    it('renders stepper', () => {
        const wrapper = mount(<Stepper steps={[{title: 'STEP 1'}, {title: "STEP 2"}]}/>);
        expect(wrapper.contains('STEP 1')).toBe(true);
        expect(wrapper.find(".line").length).toEqual(1);
    });
});
