import React, { PropTypes } from 'react'

import classNames from 'classnames'
import isFunction from 'lodash/isFunction'


const SelectSelection = ({ formatter, placeholder = null, value, data = [] }) => {

  let selection = null

  const getSelection = value => {
    const valueObj = Object.assign({}, value)

    const selection = isFunction(formatter) ?
      formatter(valueObj)
      : valueObj.text

    if (typeof selection === 'undefined') {
      throw new Error('Invalid value were provided')
    }

    return selection
  }

  if (data.length) {
    if (typeof value === 'object' && value !== null) {

      // If value object were provided
      selection = getSelection(value)

    } else if (typeof value === 'number' || typeof value === 'string') {

      // If id of value was given, find option object in the data array and get text from it
      selection = getSelection(data.find(({ id }) => value.toString() === id.toString()))

    }
  }

  return (
    <span className={ classNames('react-select__selection-node', {
      'react-select__selection--placeholder': !value
    })}>
      { selection !== null ? selection : placeholder }
    </span>
  )
}

SelectSelection.propTypes = {
  data: PropTypes.array,
  formatter: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  value: PropTypes.any,
}

export default SelectSelection
