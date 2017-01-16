import isNil from 'lodash/isNil'

export default val => {
  if (!isNil(val)) {
    return String(val)
  }

  return val
}
