import React, { PropTypes } from 'react'

import classNames from 'classnames'
import isFunction from 'lodash/isFunction'

import hasValue from '../utils/hasValue'
import { stopPropagation } from '../utils/events'


const SelectOptionsList = ({ highlighted, value, optionRenderer, options = [], onSelect }) => {
  const optionsList = options.map(({ id, text, isHidden }, i) => {
    let optionText = text

    if (isFunction(optionRenderer)) {
      optionText = optionRenderer({ id, text, isHidden })
    } else if (isHidden) {
      return null
    }

    const isSelected = hasValue(value) && value === id
    const optionClassName = classNames('PureReactSelect__option', {
      'PureReactSelect__option--selected': isSelected,
      'PureReactSelect__option--highlighted': i === highlighted
    })

    const onOptionSelect = isSelected ? null : onSelect.bind(null, id)

    return (
      <li key={ id }
          data-id={ id }
          className={ optionClassName }
          onClick={ stopPropagation(onOptionSelect) }>
        { optionText }
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
