import React  from 'react';
import {mount, shallow} from "enzyme";
import FormText from "./FormText";

describe('<FormText />', () => {
    it('renders form text', () => {
        const wrapper = mount(<FormText onChange={()=>{}} label={'Test Label'} value={'value test'} />);
        expect(wrapper.find('label').text()).toEqual('Test Label');
        expect(wrapper.find('input').length).toEqual(1);
        const input = wrapper.find('input');

        input.simulate('focus');
        input.simulate('change', { target: { value: 'Changed' } });
        input.simulate('keyDown', {
            which: 27,
            target: {
                blur() {
                    // Needed since <EditableText /> calls target.blur()
                    input.simulate('blur');
                },
            },
        });
        expect(input.instance() .value).toEqual('value test');
    });


    it('renders form text with textarea', () => {
        const wrapper = mount(<FormText onChange={()=>{}} multiline={true} label={'Test Label'} value={'value test'} />);
        expect(wrapper.find('label').text()).toEqual('Test Label');
        expect(wrapper.find('textarea').length).toEqual(1);
        const input = wrapper.find('textarea');

        input.simulate('focus');
        input.simulate('change', { target: { value: 'Changed' } });
        input.simulate('keyDown', {
            which: 27,
            target: {
                blur() {
                    // Needed since <EditableText /> calls target.blur()
                    input.simulate('blur');
                },
            },
        });
        expect(input.instance() .value).toEqual('value test');


    });


});
