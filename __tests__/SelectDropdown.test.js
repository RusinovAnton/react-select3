import React from 'react'
import SelectDropdown from '../src/components/SelectDropdown'


it('should render a Dropdown', () => {
    const wrapper = shallow(<SelectDropdown/>);
    expect(wrapper).toMatchSnapshot();
});
