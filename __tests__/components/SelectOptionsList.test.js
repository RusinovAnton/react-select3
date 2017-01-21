import SelectOptionsList from '../../src/components/SelectOptionsList'


describe('SelectOptionsList', () => {
  it('Should render', () => {
    const component = shallow(
      <SelectOptionsList options={ mock.options } onSelect={ jest.fn() }/>,
      selectComponentContext
    )

    expect(component).toMatchSnapshot()
  })
})
