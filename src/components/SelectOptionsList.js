import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import isFunction from 'lodash/isFunction'
import isNil from 'lodash/isNil'
import { stopPropagation } from '../utils/events'


const SelectOptionsList = ({ highlighted, selected, formatter, options = [], onSelect }, { cssClassNamePrefix }) => {
  const optionsList = options.map((option) => {
    const { id, isHidden } = option;

    if (isHidden) {
      return null
    }

    let optionText = option.text;

    if (isFunction(formatter)) {
      optionText = formatter(option)
    }

    const isSelected = !isNil(selected) && selected === id;
    const optionClassName = classNames(`${cssClassNamePrefix}__option`, {
      [`${cssClassNamePrefix}__option--selected`]: isSelected,
      [`${cssClassNamePrefix}__option--highlighted`]: id === highlighted,
    });
    const onOptionSelect = isSelected ? null : onSelect.bind(null, id);

    return (
      <li
        className={optionClassName}
        data-id={id}
        key={id}
        onClick={stopPropagation(onOptionSelect)}
      >
        { optionText }
      </li>
    )
  });

  return (
    <ul className={`${cssClassNamePrefix}__options-list`}>
      { optionsList }
    </ul>
  )
};

SelectOptionsList.contextTypes = {
  cssClassNamePrefix: PropTypes.string,
};

SelectOptionsList.propTypes = {
  formatter: PropTypes.func,
  highlighted: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.string,
};

export default SelectOptionsList
