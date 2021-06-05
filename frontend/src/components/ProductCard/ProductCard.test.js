import React from 'react';
import {mount, shallow} from "enzyme";
import ProductCard from './ProductCard';
import {withContext} from 'shallow-with-context';
import {BrowserRouter as Router} from "react-router-dom";
import ShopContextProvider from "../../context/ShopContext";

const productData = {
    "id": 2,
    "child_category": {
        "id": 2,
        "category_name": "wedding",
        "slug": "wedding",
        "parent_category": {
            "id": 2,
            "category_name": "tops",
            "slug": "tops",
            "grand_parent_category": {"id": 2, "category_name": "women", "slug": "women"}
        }
    },
    "brand": {"id": 1, "brand_name": "tommy", "slug": "tommy"},
    "product_name": "wedding dress",
    "product_description": "wedding dress",
    "product_variants": [{
        "id": 2,
        "stock_keeping_unit": 5456468464,
        "size": {
            "name": "S",
            "measurement": [{
                "id": 1,
                "measurement_name": "LENGTH",
                "measurement_value": 45,
                "measurement_unit": "AMPERE"
            }],
            "comment": "size"
        },
        "discount": 5,
        "published": true,
        "price": 2000,
        "weight_in_grams": 10,
        "color": "#FF0E2E",
        "images": ["/media/wedding/p2.jpeg", "/media/wedding/p1_o8mHRMj.jpeg"],
        "quantity": 0,
        "product_variant_specifications": [],
        "in_stock": false
    }],
    "slug": "wedding-dress",
    "returnable": false,
    "country_of_origin": "India"
};

describe('Product Card Test', () => {
    test('Product Card Test Without Any Data', () => {
        const context = {storeInfo: {default_currency: 'Rs.'}};
        const ComponentWithContext = withContext(ProductCard, context);
        const wrapper = shallow(<ComponentWithContext/>);

        // expect((wrapper)).toMatchSnapshot();
        expect(wrapper).toEqual({});

    });

    it('Product Card Test With Data', () => {
        const wrapper = mount(<Router><ProductCard data={productData}/></Router>);
        expect((wrapper).contains(<p className={"product-name mb-0 card-text"}>wedding dress</p>)).toEqual(true);
        expect((wrapper).contains('2000')).toEqual(true);
    })

    it('Product Card Test With Mouse Hover', () => {
        const wrapper = mount(<Router><ProductCard data={productData}/></Router>);

        // expect(wrapper.instance().state).toEqual(false);
        // "click" it once and see if value increase
        wrapper.find(".product-card").at(0).simulate("mouseenter");
        expect(wrapper.find('.image-slider')).toHaveLength(1);
        wrapper.find(".product-card").at(0).simulate("mouseleave");
        expect(wrapper.find('.image-slider')).toHaveLength(0);
    })
});
