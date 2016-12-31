import React from 'react'
import SelectOptionsList from '../src/components/SelectOptionsList'


it('should render a OptionsList', () => {
    const wrapper = shallow(<SelectOptionsList/>);
    expect(wrapper).toMatchSnapshot();
});
