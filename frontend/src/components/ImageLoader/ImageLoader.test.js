import React from 'react';
import {mount, shallow} from "enzyme";
import ImageLoader from "./ImageLoader";

describe('<ImageLoader />', () => {
    it('image loader', () => {
        const wrapper = mount(<ImageLoader src={'http://google.com'}/>);
        // expect(wrapper.state('loading')).toBe(true);
        expect(wrapper.find("img").prop("src")).toEqual('http://google.com');
    });
});
