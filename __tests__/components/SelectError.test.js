import SelectError from '../../src/components/SelectError'


describe('SelectError', () => {
  it('Should return empty string if error prop weren\'t passed render', () => {
    const component = shallow(<SelectError />, selectComponentContext);

    expect(component).toMatchSnapshot()
  });

  it('Should show error message when provided', () => {
    const error = 'Test error';
    const component = shallow(<SelectError error={ error }/>, selectComponentContext);

    expect(component).toMatchSnapshot();
    expect(component.text()).toBe(error)
  })
});
