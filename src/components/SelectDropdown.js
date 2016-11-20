import React, { PropTypes } from 'react'
import classNames from 'classnames'

import SelectSearchInput from './SelectSearchInput'


const SelectDropdown = (props) => {
  const {
    data,
    value,
    highlighted,
    searchShow,
    onSelect
  } = props

  // @fixme: provide templating
  const optionsList = data
    .map(({ id, text }, i) =>
      (
        <li key={ i }
            className={ classNames('react-select-results__option', {
              'react-select-results--selected': !!value && value.id === id,
              'react-select-results__option--highlighted': i === highlighted
            })}
            data-id={ id }
            data-index={ i }
            onClick={ onSelect }>
          { text }
        </li>
      ))

  return (
    <span className="dropdown-wrapper">
        <span className="react-select-dropdown">
          { searchShow && <SelectSearchInput/> }
          <span className="react-select-results">
            <ul className="react-select-results__options">
              { optionsList }
            </ul>
          </span>
        </span>
      </span>
  )
}

SelectDropdown.propTypes = {
  data: PropTypes.array,
  value: PropTypes.object,
  highlighted: PropTypes.number,
  searchShow: PropTypes.bool,
  onSelect: PropTypes.func,
}

export default SelectDropdown
