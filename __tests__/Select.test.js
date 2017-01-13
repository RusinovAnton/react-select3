import React from 'react'
import Select from '../src/components/Select'


const dummyData = [
    { id: 3, text: 'three' },
    { id: 4, text: 'four' },
    { id: 5, text: 'five' },
]


test('<Select/>', () => {
    it('should render a Select', () => {
        const component = shallow(<Select/>);

        expect(component).toMatchSnapshot();
    });

    it('should render a Select container with options', () => {
        const component = shallow(<Select options={ dummyData }/>);

        console.log(component.state())
        console.log(component.debug())
        expect(component).toMatchSnapshot();
    });

    it('should render a Select container with options', () => {
        const component = shallow(<Select placeholder='Select something' options={ dummyData }/>);

        expect(component.find('.pure-react-select__selection--placeholder').text()).to.equal('Select something')
        expect(component).toMatchSnapshot();
    });
});
