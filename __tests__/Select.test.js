import React from 'react'
import Select from '../src/components/Select'
import renderer from 'react-test-renderer'



const dummyData = [
    { id: 3, text: 'three' },
    { id: 4, text: 'four' },
    { id: 5, text: 'five' },
]

it('should render a Select container', () => {
    const component = shallow(<Select/>);
    expect(component).toMatchSnapshot();
});

test('Open dropdown on container click', () => {
    const component = shallow(<Select/>)
    expect(component).toMatchSnapshot()

    component.find('[class="react-select__selection"]').simulate('click');

    expect(component).toMatchSnapshot();
})
