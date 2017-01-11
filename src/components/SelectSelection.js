import React, { PropTypes } from 'react'

import { selectPropTypes } from '../shared/selectPropTypes'
import classNames from 'classnames'


const SelectSelection = ({ clearable, selection = null, placeholder = null, onClearSelection }) => (
  <span className='pure-react-select__selection pure-react-select__selection--single'>
      <span className={ classNames('pure-react-select__selection-node', {
          'pure-react-select__selection--placeholder': !selection
      })}>
        { selection || placeholder }
      </span>
      { clearable && (
        <span className="pure-react-select__selection-clear"
              role="presentation"
              onClick={ onClearSelection }>
            &times;
        </span>
      )}
      <span className="pure-react-select__selection-arrow" role="presentation">
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
