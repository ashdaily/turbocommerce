import React  from 'react';
import {mount, shallow} from "enzyme";
import ConfirmModal from "./ConfirmModal";

describe('<ConfirmModal />', () => {
    it('renders confirm modal false visible', () => {
        const wrapper = mount(<ConfirmModal visible={false} content={'content test'} title={'Title Test'} />);
        expect(wrapper.contains('Title Test')).toBe(false);
        expect(wrapper.contains('content test')).toBe(false);

    });
    it('renders confirm modal true visible', () => {
        const wrapper = mount(<ConfirmModal visible={true} content={'content test'} title={'Title Test'} />);
        expect(wrapper.contains('Title Test')).toBe(true);
        expect(wrapper.contains('content test')).toBe(true);
        expect(wrapper.find("button").length).toEqual(2);
    });

});
