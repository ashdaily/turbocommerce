import React  from 'react';
import {mount} from "enzyme";
import WaitingComponent from "./WaitingComponent";

describe('<WaitingComponent />', () => {
    it('renders waiting component', () => {
        const wrapper = mount(<WaitingComponent></WaitingComponent>);
        expect(wrapper.find(".sr-only").length).toEqual(1);
    });
});
