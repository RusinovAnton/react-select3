import React from 'react'
import Select from '../src/components/Select'


const dummyData = [
    { id: 3, text: 'three' },
    { id: 4, text: 'four' },
    { id: 5, text: 'five' },
    { id: 6, text: 'six' },
    { id: 7, text: 'seven' },
    { id: 8, text: 'eight' },
    { id: 9, text: 'nine' },
    { id: 10, text: 'ten' },
    { id: 11, text: 'eleven' },
    { id: 12, text: (<span>twelve</span>) },
]

test('<Select/>', function() {
    it('should render a Select with default props', () => {
    const component = shallow(<Select/>);

        // expect(component.props()).toHave('search')
        expect(component).toMatchSnapshot();
    });

    it('should render a Select with options in the state', () => {
        const component = shallow(<Select options={ dummyData }/>);

        // expect(component.state().options.length).toEqual(10);
        expect(component).toMatchSnapshot();
    });

    it('should render a disabled Select with default option and allow user to clear', () => {
        const component = shallow(
            <Select placeholder='Select something'
                    allowClear={ true }
                    defaultValue={ 3 }
                    options={ dummyData }/>
        );

        // expect(component.find('.pure-react-select__selection--placeholder').text()).to.equal('Select something');
        expect(component).toMatchSnapshot();
    });


    it('should render a disabled Select with choosen option', () => {
        const component = shallow(
            <Select placeholder='Select something'
                    value={ 3 }
                    disabled={ true }
                    options={ dummyData }/>
        );

        // expect(component.find('.pure-react-select__selection--placeholder').text()).to.equal('Select something');
        expect(component).toMatchSnapshot();
    });
});

