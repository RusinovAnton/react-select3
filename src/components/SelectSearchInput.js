import React from 'react'


const SelectSearchInput = props => (
    // TODO: close dropdown on esc click when SearchInput focused
    <span className='pure-react-select__search'>
      <input className='pure-react-select__search-field'
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
