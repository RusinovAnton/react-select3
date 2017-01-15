import React, { PropTypes } from 'react'

import { selectPropTypes } from '../utils/selectPropTypes'
import classNames from 'classnames'


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
              onClick={ onClearSelection }>
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
    placeholder: selectPropTypes.selection,
    selection: selectPropTypes.selection,
}

export default SelectSelection
