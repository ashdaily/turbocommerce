import React from 'react';
import { mount } from "enzyme";
import { BrowserRouter as Router } from 'react-router-dom';
import ChangePassword from "./ChangePassword";
import FormText from "../../components/FormText/FormText";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

describe('<ChangePassword />', () => {
    it('renders change password', () => {
        const wrapper = mount(<Router><ChangePassword/></Router>);
        expect(wrapper.contains(FormText)).toBe(true);
        expect(wrapper.find('input').prop('name')).toEqual('password');
        expect(wrapper.find('button').text()).toEqual('Change Password');
        expect(wrapper.contains(ConfirmModal)).toBe(true);
        expect(wrapper.find('h1').text()).toEqual('Change Password');

    });
});
