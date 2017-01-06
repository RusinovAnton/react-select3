import React from 'react'


const SelectSearchInput = (props) => (
  // TODO: close dropdown on esc click when SearchInput focused
  <span className='react-select-search react-select-search--dropdown'>
      <input className='react-select-search__field'
             type='search'
             tabIndex='0'
             autoFocus
             autoComplete='off'
             autoCorrect='off'
             autoCapitalize='off'
             spellCheck='false'
             role='textbox'
             {...props}/>
  </span>
)

export default SelectSearchInput
