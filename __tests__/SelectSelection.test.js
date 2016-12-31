import React from 'react'
import SelectSelection from '../src/components/SelectSelection'

it('should render a Selection', () => {
    const wrapper = shallow(<SelectSelection/>);
    expect(wrapper).toMatchSnapshot();
});
