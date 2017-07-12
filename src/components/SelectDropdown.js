import React from 'react'
import PropTypes from 'prop-types'
import SelectOptionsList from './SelectOptionsList'
import SelectSearchInput from './SelectSearchInput'


const SelectDropdown = (
  {
    highlighted, onSelect, formatter, options, searchTerm, showSearch, status, selected, emptyOptionsLabel,
    onSearchInputChange, onSearchInputKeyDown,
  },
  { cssClassNamePrefix },
) => (
  <span className={`${cssClassNamePrefix}__dropdown`}>
    {
      showSearch && (
        <SelectSearchInput
          value={searchTerm}
          onKeyDown={onSearchInputKeyDown}
          onChange={onSearchInputChange}
        />
      )
    }
    {
      options.length ?
        <SelectOptionsList {...{ formatter, highlighted, onSelect, options, selected }}/>
        : <span className={`${cssClassNamePrefix}__status`}>{ status || emptyOptionsLabel || 'No options' }</span>
    }
  </span>
);

SelectDropdown.contextTypes = {
  cssClassNamePrefix: PropTypes.string,
};

SelectDropdown.propTypes = {
  formatter: PropTypes.func,
  highlighted: PropTypes.string,
  onSearchInputChange: PropTypes.func.isRequired,
  onSearchInputKeyDown: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  emptyOptionsLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string,
  selected: PropTypes.string,
  showSearch: PropTypes.bool,
  status: PropTypes.string,
};

export default SelectDropdown
