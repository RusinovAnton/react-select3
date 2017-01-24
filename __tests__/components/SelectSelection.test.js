import SelectSelection from '../../src/components/SelectSelection'


describe('SelectSelection', () => {
  it('Should render', () => {
    const component = shallow(<SelectSelection />, selectComponentContext)

    expect(component).toMatchSnapshot()
  })

  it('Should show placeholder when there is no selection provided', () => {
    const placeholder = 'Test placeholder'
    const component = shallow(<SelectSelection placeholder={ placeholder }/>, selectComponentContext)

    expect(component).toMatchSnapshot()
    expect(component.find(`${cssName}__selection-text`).text()).toBe(placeholder)
  })
})
