import React from 'react'
import SFD from '../src/components/SelectFetchDropdown'
import stub from 'react-stub-context'


it('should render a FetchDropdown', () => {
    const SelectFetchDropdown = stub(SFD, { lang: selectContext.lang })
    const wrapper = shallow(<SelectFetchDropdown request={{ delay: 3000, endpoint: '/' }}/>);
    expect(wrapper).toMatchSnapshot();
});
