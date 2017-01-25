import React, { PropTypes } from 'react'

import classNames from 'classnames'
import isFunction from 'lodash/isFunction'

import filterKeyDown from '../utils/filterKeyDown'
import { stopPropagation } from '../utils/events'


const SelectSelection = ({ clearable, formatter, selection = null, placeholder = null, onClearSelection, onKeyDown },
  { cssClassNameSelector }) => {
  let selectionText = null

  if (selection) {
    selectionText = isFunction(formatter) ? formatter(selection) : selection.text
  } else if (placeholder) {
    selectionText = placeholder
  }

  return (
    <span className={ classNames(`${cssClassNameSelector}__selection`, {
      [`${cssClassNameSelector}__selection--placeholder`]: !selection,
      [`${cssClassNameSelector}__selection--clearable`]: clearable,
    })}>
    <span className={`${cssClassNameSelector}__selection-text`}>
      { selectionText }
    </span>
      { clearable && (
        <span className={`${cssClassNameSelector}__clear-selection`}
              role="presentation"
              tabIndex="0"
              onKeyDown={stopPropagation(filterKeyDown([
                { allowedKeys: ['ArrowUp', 'ArrowDown', 'Escape'], func: onKeyDown },
                { allowedKeys: ['Enter', ' '], func: onClearSelection },
              ]))}
              onClick={ stopPropagation(onClearSelection) }>
        &times;
      </span>
      )}
      <span className={`${cssClassNameSelector}__selection-arrow`} role="presentation">
      <i/>
    </span>
  </span>
  )
}

SelectSelection.contextTypes = {
  cssClassNameSelector: PropTypes.string,
}

SelectSelection.propTypes = {
  clearable: PropTypes.bool,
  onClearSelection: PropTypes.func,
  placeholder: PropTypes.string,
  selection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  formatter: PropTypes.func,
}

export default SelectSelection
