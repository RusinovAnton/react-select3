import { Select } from '../src/components/Select'


test('should render a Select with default props', () => {
  const component = shallow(<Select/>);

  // expect(component.props()).toHave('search')
  expect(component).toMatchSnapshot();
});

test('should render a Select with options in the state', () => {
  const component = shallow(<Select options={ dummyData }/>);

  expect(component.state().options).toHaveLength(10);
});

test('should open dropdown on when state.dropdownOpened = true', () => {
  const component = shallow(<Select options={ dummyData }/>);

  expect(component.setState({ dropdownOpened: true })).toMatchSnapshot();
});

test('should render a disabled Select with default option and allow user to clear', () => {
  const component = render(
    <Select placeholder='Select something'
            allowClear={ true }
            defaultValue={ 3 }
            options={ dummyData }/>
  );

  expect(component).toMatchSnapshot();
});


test('should render a disabled Select with choosen option', () => {
  const makeClick = sinon.spy()
  const component = mount(
    <Select placeholder='Select something'
            value={ 3 }
            disabled={ true }
            options={ dummyData }/>
  );

  expect(component).toMatchSnapshot();

  component.find('.PureReactSelect__container').simulate('click')
  expect(makeClick.calledOnce).toBe(false)
});

test('should warn about bug possibility when setting value through props but not setting onSelect callback', () => {
  const component = shallow(
    <Select placeholder='Select something'
            value={ 3 }
            options={ dummyData }/>
  );

  component.setProps({ value: 4 })

  expect(component.state('value')).toThrow();
});

test('should update state.value when new value after props update', () => {
  const component = shallow(
    <Select placeholder='Select something'
            value={ 3 }
            options={ dummyData }
            onSelect={ jest.fn() }/>
  );

  component.setProps({ value: 4 })

  expect(component.state('value')).toBe('4');
});

test('should use optionRenderer if passed to render SelectOptionsList', () => {
  const component = mount(
    <Select placeholder='Select something'
            optionRenderer={ ({ text }) => <span>{ text }</span> }
            options={ dummyData }/>
  )
  component.setState({ dropdownOpened: true })
  expect(component).toMatchSnapshot()
})
