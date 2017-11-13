import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isFunction from 'lodash/isFunction'
import filterKeyDown from '../utils/filterKeyDown'
import { stopPropagation } from '../utils/events'


const SelectSelection = (
  {
    clearable, formatter, selection = null, placeholder = null, onClearSelection, onKeyDown,
  },
  { cssClassNamePrefix },
) => {
  let selectionText = null;

  if (selection) {
    selectionText = isFunction(formatter) ? formatter(selection) : selection.text
  } else if (placeholder) {
    selectionText = placeholder
  }

  return (
    <span
      className={classNames(`${cssClassNamePrefix}__selection`, {
        [`${cssClassNamePrefix}__selection--placeholder`]: !selection,
        [`${cssClassNamePrefix}__selection--clearable`]: clearable,
      })}
    >
      <span className={`${cssClassNamePrefix}__selection-text`}>{ selectionText }</span>
      { clearable && (
        <span
          className={`${cssClassNamePrefix}__clear-selection`}
          role="presentation"
          tabIndex="0"
          onKeyDown={stopPropagation(filterKeyDown([
            { allowedKeys: ['ArrowUp', 'ArrowDown', 'Escape'], func: onKeyDown },
            { allowedKeys: ['Enter', ' '], func: onClearSelection },
          ]))}
          onClick={stopPropagation(onClearSelection)}
        >
          &times;
        </span>
      )}
      <span
        className={`${cssClassNamePrefix}__selection-arrow`}
        role="presentation"
      >
        <i/>
      </span>
    </span>
  )
};

SelectSelection.contextTypes = {
  cssClassNamePrefix: PropTypes.string,
};

SelectSelection.propTypes = {
  clearable: PropTypes.bool,
  onClearSelection: PropTypes.func,
  placeholder: PropTypes.string,
  selection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  formatter: PropTypes.func,
};

export default SelectSelection
