import React, { PropTypes } from 'react'
import classNames from 'classnames'


const SelectSelection = ({ data, placeholder, value }) => {

  let selection = placeholder || null

  // @fixme: provide custom templating
  if (!value) {
    // ...
  } else if (typeof value === 'string' || typeof value === 'number') {

    // Find selected option by id
    selection = data.find(option => {
      return value.toString() === option.id.toString()
    }).text

  } else {
    throw new Error('Provided value is not valid. Expected to get id of the data object')
  }

  return (
    <span className={ classNames('react-select__selection-node', {
      'react-select__selection--placeholder': !value
    })}>
      { selection }
    </span>
  )

}

SelectSelection.propTypes = {
  data: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default SelectSelection
