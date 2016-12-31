import React from 'react'
import SelectionClear from '../src/components/SelectionClear'


it('should render a Clear', () => {
    const wrapper = shallow(<SelectionClear onClearSelection={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});
