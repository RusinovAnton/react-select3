import React, { PropTypes } from 'react'

import classNames from 'classnames'
import hasValue from '../utils/hasValue'
import { stopPropagation } from '../utils/events'


const SelectOptionsList = ({ highlighted, value, options = [], onSelect }) => {
  const optionsList = options.map(({ id, text, isHidden }, i) => {
    if (isHidden) return null

    const isSelected = hasValue(value) && value === id
    const optionClassName = classNames('PureReactSelect__option', {
      'PureReactSelect__option--selected': isSelected,
      'PureReactSelect__option--highlighted': i === highlighted
    })

    const onOptionSelect = isSelected ? null : onSelect.bind(null, id)

    return (
      <li key={ id }
          className={ optionClassName }
          onClick={ stopPropagation(onOptionSelect) }>
        { text }
      </li>
    )
  })

  return (
    <ul className="PureReactSelect__options-list">
      { optionsList }
    </ul>
  )
}

SelectOptionsList.propTypes = {
  highlighted: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
}

export default SelectOptionsList
