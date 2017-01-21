import SelectError from '../../src/components/SelectError'


describe('SelectError', () => {
  it('Should return null if error prop weren\'t passed render', () => {
    const component = shallow(<SelectError />, selectComponentContext)

    expect(component).toMatchSnapshot()
  })

  it('Should show placeholder when there is no selection provided', () => {
    const error = 'Test error'
    const component = shallow(<SelectError error={ error }/>, selectComponentContext)

    expect(component).toMatchSnapshot()
    expect(component.find('.PureReactComponent__error').text()).toBe(error)
  })
})
