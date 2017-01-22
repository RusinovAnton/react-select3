import React, { PropTypes } from 'react'

import SelectOptionsList from './SelectOptionsList'
import SelectSearchInput from './SelectSearchInput'


const SelectDropdown = ({
  highlighted, onSelect, optionRenderer, options, searchTerm, showSearch, selected,
  onSearchInputChange, onSearchInputKeyDown
},
  { cssClassNameSelector }) => (
  <span className={`${cssClassNameSelector}__dropdown`}>
    {
      showSearch &&
      (
        <SelectSearchInput value={ searchTerm }
                           onKeyDown={ onSearchInputKeyDown }
                           onChange={ onSearchInputChange }/>
      )
    }
    {
      options.length ?
        <SelectOptionsList {...{
          highlighted,
          onSelect,
          optionRenderer,
          options,
          selected
        }}/>
        : (
        <span className={`${cssClassNameSelector}__status`}>{ 'No options' }</span>
      )
    }
  </span>
)

SelectDropdown.contextTypes = {
  cssClassNameSelector: PropTypes.string,
}

SelectDropdown.propTypes = {
  highlighted: PropTypes.string,
  onSearchInputChange: PropTypes.func.isRequired,
  onSearchInputKeyDown: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  optionRenderer: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string,
  selected: PropTypes.string,
  showSearch: PropTypes.bool,
}

export default SelectDropdown