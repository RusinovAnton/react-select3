import React, { PropTypes } from 'react'

import classNames from 'classnames'
import isFunction from 'lodash/isFunction'

import isNil from 'lodash/isNil'
import { stopPropagation } from '../utils/events'


const SelectOptionsList = ({ highlighted, value, optionRenderer, options = [], onSelect }, { cssClassNameSelector }) => {
  const optionsList = options.map(({ id, text, isHidden }) => {
    let optionText = text

    if (isFunction(optionRenderer)) {
      optionText = optionRenderer({ id, text, isHidden })
    } else if (isHidden) {
      return null
    }

    const isSelected = !isNil(value) && value === id
    const optionClassName = classNames(`${cssClassNameSelector}__option`, {
      [`${cssClassNameSelector}__option--selected`]: isSelected,
      [`${cssClassNameSelector}__option--highlighted`]: id === highlighted
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
    <ul className={`${cssClassNameSelector}__options-list`}>
      { optionsList }
    </ul>
  )
}

SelectOptionsList.contextTypes = {
  cssClassNameSelector: PropTypes.string,
}

SelectOptionsList.propTypes = {
  highlighted: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  optionRenderer: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
}

export default SelectOptionsList
