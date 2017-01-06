import React, { PropTypes } from 'react'
import { selectPropTypes } from './Select'
import classNames from 'classnames'


const SelectSelection = ({ clearable, selection = null, placeholder = null, onClearSelection }) => (
  <span className='react-select__selection react-select-selection--single'>
      <span className={ classNames('react-select__selection-node', {
          'react-select__selection--placeholder': !selection
        })}>
        { selection || placeholder }
      </span>
      { clearable && (
        <span className="react-select-selection__clear"
              role="presentation"
              onClick={ onClearSelection }>
            &times;
        </span>
      )}
      <span className="react-select-selection__arrow" role="presentation"><b/></span>
  </span>
) 

SelectSelection.propTypes = {
    clearable: PropTypes.bool,
    onClearSelection: PropTypes.func,
    placeholder: selectPropTypes.selection,
    selection: selectPropTypes.selection,
}

export default SelectSelection
