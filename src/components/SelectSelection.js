import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { stopPropagation } from '../utils/events'


const SelectSelection = ({ clearable, selection = null, placeholder = null, onClearSelection }) => (
  <span className={ classNames('PureReactSelect__selection', {
    'PureReactSelect__selection--placeholder': !selection,
    'PureReactSelect__selection--clearable': clearable,
  })}>
    <span className='PureReactSelect__selection-text'>
      { selection || placeholder }
    </span>
    { clearable && (
      <span className="PureReactSelect__clear-selection"
            role="presentation"
            onClick={ stopPropagation(onClearSelection) }>
        &times;
      </span>
    )}
    <span className="PureReactSelect__selection-arrow" role="presentation">
      <i/>
    </span>
  </span>
)

SelectSelection.propTypes = {
  clearable: PropTypes.bool,
  onClearSelection: PropTypes.func,
  placeholder: PropTypes.string,
  selection: PropTypes.string,
}

export default SelectSelection
