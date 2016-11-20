import React from 'react'

const SelectSearchInput = () => (
  <span className="react-select-search react-select-search--dropdown react-select-search--hide">
      <input
        className="react-select-search__field"
        type="search"
        tabIndex="0"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        role="textbox"/>
  </span>
)

export default SelectSearchInput
