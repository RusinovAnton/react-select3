import React from 'react'
import SelectionArrow from '../src/components/SelectionArrow'


it('should render a Arrow', () => {
    const wrapper = shallow(<SelectionArrow/>);
    expect(wrapper).toMatchSnapshot();
});
