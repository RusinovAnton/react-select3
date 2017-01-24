import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { stopPropagation } from '../utils/events'


const SelectSelection = ({ clearable, selection = null, placeholder = null, onClearSelection }, { cssClassNameSelector }) => (
  <span className={ classNames(`${cssClassNameSelector}__selection`, {
    [`${cssClassNameSelector}__selection--placeholder`]: !selection,
    [`${cssClassNameSelector}__selection--clearable`]: clearable,
  })}>
    <span className={`${cssClassNameSelector}__selection-text`}>
      { selection || placeholder }
    </span>
    { clearable && (
      <span className={`${cssClassNameSelector}__clear-selection`}
            role="presentation"
            tabIndex="1"
            onClick={ stopPropagation(onClearSelection) }>
        &times;
      </span>
    )}
    <span className={`${cssClassNameSelector}__selection-arrow`} role="presentation">
      <i/>
    </span>
  </span>
)

SelectSelection.contextTypes = {
  cssClassNameSelector: PropTypes.string,
}

SelectSelection.propTypes = {
  clearable: PropTypes.bool,
  onClearSelection: PropTypes.func,
  placeholder: PropTypes.string,
  selection: PropTypes.string,
}

export default SelectSelection
