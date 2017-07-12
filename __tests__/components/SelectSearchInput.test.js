import SelectSearchInput from '../../src/components/SelectSearchInput'


describe('SelectSearchInput', () => {
  it('Should render', () => {
    const component = shallow(
      <SelectSearchInput isPending/>,
      selectComponentContext
    );

    expect(component).toMatchSnapshot()
  })
});
