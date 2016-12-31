import React from 'react'
import SelectSearchInput from '../src/components/SelectSearchInput'


it('should render a SearchInput', () => {
    const wrapper = shallow(<SelectSearchInput/>);
    expect(wrapper).toMatchSnapshot();
});
