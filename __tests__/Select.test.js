import { Select } from '../src/components/Select'


test('should render a Select with default props', () => {
  const component = render(<Select/>);

  expect(component).toMatchSnapshot();
});

test('should render a Select with options in the state', () => {
  const component = shallow(<Select options={ mock.options }/>);

  expect(component.state('options')).toHaveLength(10);
});

test('should open dropdown on when state.dropdownOpened = true', () => {
  const component = mount(<Select options={ mock.options }/>);

  expect(component.setState({ dropdownOpened: true })).toMatchSnapshot();
});

test('should render Select with default option and show placeholder after reseting value', () => {
  const component = mount(
    <Select placeholder='Select something'
            defaultValue={ 3 }
            options={ mock.options }/>
  );

  const selection = component.find('.PureReactSelect__selection-text')
  expect(selection.text()).toBe('three');

  component.node._onClearSelection()
  expect(selection.text()).toBe('Select something');
});


test('should render a disabled unclickable Select with choosen option', () => {
  const makeClick = sinon.spy()
  const component = mount(
    <Select value={ 3 }
            disabled={ true }
            options={ mock.options }/>
  );

  expect(component).toMatchSnapshot();

  component.find('.PureReactSelect__container').simulate('click')
  expect(makeClick.calledOnce).toBe(false)
});

test('should warn about bug possibility when setting value through props but not setting onSelect callback', () => {
  const component = shallow(
    <Select placeholder='Select something'
            value={ 3 }
            options={ mock.options }/>
  );

  component.setProps({ value: 4 });
  expect(component.state('value')).toThrow();
});

test('should update state.value when new value after props update', () => {
  const component = shallow(
    <Select value={ 3 }
            options={ mock.options }
            onSelect={ jest.fn() }/>
  );

  component.setProps({ value: 4 })
  expect(component.state('value')).toBe('4');
});

test('should use optionRenderer if passed to render SelectOptionsList', () => {
  const spy = sinon.spy(mock, 'renderer');
  const component = mount(<Select optionRenderer={ mock.renderer } options={ mock.options }/>);

  component.setState({ dropdownOpened: true });
  expect(spy.callCount).toBe(mock.options.length);
});


test('should render SelectDropdown with SelectSearchInput', () => {
  const component = mount(
    <Select search={{ minimumResults: 5 }}
            optionRenderer={ mock.renderer }
            options={ mock.options }/>
  );

  component.setState({ dropdownOpened: true });
  expect(component).toMatchSnapshot()
})
