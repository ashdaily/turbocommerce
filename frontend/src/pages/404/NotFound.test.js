import React from 'react';
import { mount } from "enzyme";
import NotFound from './NotFound';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<NotFound />', () => {
    it('renders cart components', () => {
        const wrapper = mount(<Router><NotFound/></Router>);
        expect(wrapper.contains('The page you are looking for can\'t be found.')).toBe(true);
    });
});
