import React, { PropTypes } from 'react'

import SelectOptionsList from './SelectOptionsList'
import SelectSearchInput from './SelectSearchInput'
import SelectStatus from './SelectStatus'


const SelectDropdown = ({
  highlighted,
  isPending,
  language,
  onKeyDown,
  onSearchTermChange,
  onSelect,
  optionRenderer,
  options,
  searchTerm,
  showSearch,
  value,
}) => (
  <span className="PureReactSelect__dropdown">
    { showSearch &&
    <SelectSearchInput value={ searchTerm } onKeyDown={ onKeyDown } onChange={ onSearchTermChange }/> }
    <SelectStatus {...{ isPending, language }}/>
    { !!options.length && <SelectOptionsList {...{ highlighted, onSelect, optionRenderer, options, value }}/> }
  </span>
)

SelectDropdown.propTypes = {
  highlighted: PropTypes.number,
  isPending: PropTypes.bool,
  language: PropTypes.object.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  searchTerm: PropTypes.string,
  showSearch: PropTypes.bool.isRequired,
  value: PropTypes.string,
}

export default SelectDropdown
