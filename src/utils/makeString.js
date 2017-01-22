import isNil from 'lodash/isNil'

export default val => isNil(val) ? val : String(val) // eslint-disable-line no-confusing-arrow
