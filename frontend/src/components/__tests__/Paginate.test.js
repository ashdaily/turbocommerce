import React  from 'react';
import {mount, shallow} from "enzyme";
import {BrowserRouter as Router} from 'react-router-dom';
import Paginate from "../Paginate";

describe('<Paginate />', () => {
    it('renders paginate when enabled', () => {
        const wrapper = mount(<Paginate hasNext={true} ></Paginate>);
        expect(wrapper.find("button").prop("disabled")).toEqual(false);
    });

    it('renders paginate when disabled', () => {
        const wrapper = mount(<Paginate hasNext={false} ></Paginate>);
        expect(wrapper.find("button").prop("disabled")).toEqual(true);
    });
});
