import makeString from '../../src/utils/makeString'

test('should return string if value is defined and not null', () => {
  expect(makeString(4)).toBe('4')
  expect(makeString(null)).toBe(null)
  expect(makeString(undefined)).toBe(void(0))
})
