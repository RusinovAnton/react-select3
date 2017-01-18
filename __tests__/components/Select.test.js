import SelectWrapped, { Select } from '../../src/components/Select'


describe('Shallow <Select/>', () => {
  it('should render with options in the state', () => {
    const component = shallow(<Select options={ mock.options }/>)

    expect(component.state('options')).toHaveLength(10)
  })

  it('should warn about bug possibility when setting value through props but not setting onSelect callback', () => {
    const component = shallow(
      <Select placeholder='Select something'
              value={ 3 }
              options={ mock.options }/>
    )

    component.setProps({ value: 4 })
    expect(component.state('value')).toThrow()
  })

  it('should update state.value when new value after props update', () => {
    const component = shallow(
      <Select value={ 3 }
              options={ mock.options }
              onSelect={ jest.fn() }/>
    )

    component.setProps({ value: 4 })
    expect(component.state('value')).toBe('4')
  })
})

describe('Render <Select/>', () => {
  it('should render Select with handleClickOutside wrapper', () => {
    const component = render(<SelectWrapped/>)

    expect(component).toMatchSnapshot()
  })

  it('should render a Select with default props', () => {
    const component = render(<Select/>)

    expect(component).toMatchSnapshot()
  })
})

describe('Mount <Select/>', () => {
  it('should not render a Select clear button without choosen option and should render it on option select', () => {
    const component = mount(
      <Select allowClear
              defaultValue={ 3 }
              options={ mock.options }
              onSelect={ jest.fn() }/>
    )

    expect(component.find('.PureReactSelect__clear-selection').length).toBe(1)

    component.setProps({ value: null })
    expect(component.find('.PureReactSelect__clear-selection').length).toBe(0)
  })

  it('should open dropdown on when state.dropdownOpened = true', () => {
    const component = mount(<Select options={ mock.options }/>)

    expect(component.setState({ dropdownOpened: true })).toMatchSnapshot()
  })

  it('should render Select with default option and show placeholder after reseting value', () => {
    const component = mount(
      <Select placeholder='Select something'
              defaultValue={ 3 }
              options={ mock.options }/>
    )

    const selection = component.find('.PureReactSelect__selection-text')
    expect(selection.text()).toBe('three')

    component.node._onClearSelection()
    expect(selection.text()).toBe('Select something');
  })


  it('should render a disabled unclickable Select with choosen option', () => {
    const makeClick = sinon.spy()
    const component = mount(
      <Select value={ 3 }
              disabled={ true }
              options={ mock.options }/>
    )

    expect(component).toMatchSnapshot()

    component.find('.PureReactSelect__container').simulate('click')
    expect(makeClick.calledOnce).toBe(false)
  })

  it('should use optionRenderer if passed to render SelectOptionsList', () => {
    const spy = sinon.spy(mock, 'renderer')
    const component = mount(<Select optionRenderer={ mock.renderer } options={ mock.options }/>)

    component.setState({ dropdownOpened: true })
    expect(spy.callCount).toBe(mock.options.length)
  })


  it('should render SelectDropdown with SelectSearchInput', () => {
    const component = mount(
      <Select search={{ minimumResults: 5 }}
              optionRenderer={ mock.renderer }
              options={ mock.options }/>
    )

    component.setState({ dropdownOpened: true })
    expect(component).toMatchSnapshot()
  })

  it('should filter options on SelectSearchInput change value', () => {
    const component = mount(
      <Select search={{ minLength: 1, minimumResults: 5 }}
              optionRenderer={ mock.renderer }
              options={ mock.options }/>
    )

    component.setState({ dropdownOpened: true })
    const searchField = component.find('.PureReactSelect__search-field')

    searchField.node.value = 't'
    searchField.simulate('change', searchField)

    expect(component.find('.PureReactSelect__option').length).toBe(4)
  })
})

describe('onKeyDown <Select/>', () => {
  const component = mount(<Select options={ mock.options }/>)
  const selectContainer = component.find('.PureReactSelect__container')

  it('should open dropdown onKeyDown with key ArrowUp, ArrowDown, Space, Enter', () => {
    selectContainer.simulate('keyDown', { keyCode: 32 })
    expect(component.state('dropdownOpened')).toBe(true)

    selectContainer.simulate('keyDown', { keyCode: 27 })
    expect(component.state('dropdownOpened')).toBe(false)

    selectContainer.simulate('keyDown', { keyCode: 38 })
    expect(component.state('dropdownOpened')).toBe(true)

    selectContainer.simulate('keyDown', { keyCode: 27 })
    expect(component.state('dropdownOpened')).toBe(false)

    selectContainer.simulate('keyDown', { keyCode: 13 })
    expect(component.state('dropdownOpened')).toBe(true)

    selectContainer.simulate('keyDown', { keyCode: 27 })
    expect(component.state('dropdownOpened')).toBe(false)
  })

  it('should highlight option with ArrowUp, ArrowDown and select on Enter or Space', () => {
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 38 })
    expect(component.find('.PureReactSelect__option--highlighted').text()).toBe('four')

    selectContainer.simulate('keyDown', { keyCode: 13 })
    expect(component.state('value')).toBe('4')

    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 38 })
    expect(component.find('.PureReactSelect__option--highlighted').text()).toBe('five')

    selectContainer.simulate('keyDown', { keyCode: 32 })
    expect(component.state('value')).toBe('5')

    component.setState({ searchTerm: 't' })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 38 })
    expect(component.find('.PureReactSelect__option--highlighted').text()).toBe('eight')

    selectContainer.simulate('keyDown', { keyCode: 13 })
    expect(component.state('value')).toBe('8')

    component.setState({ searchTerm: 'ee' })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    selectContainer.simulate('keyDown', { keyCode: 38 })
    selectContainer.simulate('keyDown', { keyCode: 38 })
    selectContainer.simulate('keyDown', { keyCode: 40 })
    expect(component.find('.PureReactSelect__option--highlighted').text()).toBe('three')

    selectContainer.simulate('keyDown', { keyCode: 13 })
    expect(component.state('value')).toBe('3')
  })
})

describe('Select error', () => {
  const component = mount(<Select/>)

  it('should render error node if error were passed with props', () => {
    component.setProps({error: 'Test error'})

    expect(component.find('.PureReactSelect__error').length).toBe(1)
  })

  it('should update error node - remove when null passed into error prop', () => {
    component.setProps({ error: null })

    expect(component.find('.PureReactSelect__error').length).toBe(0)
  })
})
