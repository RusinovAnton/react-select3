import React from 'react'

import renderer from 'react-test-renderer'

import Select from '../src/components/Select'


const dummyData = [
    {id: 3, text: 'three'},
    {id: 4, text: 'four'},
    {id: 5, text: 'five'},
]

test('Open dropdown on container click', () => {
    const component = renderer.create(
        <Select/>
    )

    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()

    // manually trigger the callback
    tree.refs.selectContainer.onClick()

    // re-rendering
    tree = component.toJSON()

    expect(tree).toMatchSnapshot()

    // manually trigger the callback
    tree.refs.selectContainer.onClick()

    // re-rendering
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
