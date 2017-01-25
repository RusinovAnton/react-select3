import { FetchSelect as Select } from '../../src'


describe('<FetchSelect>', () => {
  it('should be rendered', () => {
    const component = shallow(<Select />)

    expect(component).toMatchSnapshot()
  })

  it('should fetch options once on mount', () => {
    const clientSpy = sinon.spy(mock, 'ajaxClient')
    const component = mount(
      <Select fetch={{
        ajaxClient: mock.ajaxClient,
        once: true }}/>)

    expect(component).toMatchSnapshot()
    expect(clientSpy.called).toBe(true)
  })
})
