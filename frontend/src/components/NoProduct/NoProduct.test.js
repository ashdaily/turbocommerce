import React from 'react';
import renderer from 'react-test-renderer';
import NoProduct from './NoProduct';

test('No Product Component Test', () => {
    const component = renderer.create(
        <NoProduct />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
