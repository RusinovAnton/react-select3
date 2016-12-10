import React from 'react'

const SelectSearchInput = ({ onTermChange, ...inputProps }) => (
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
             {...inputProps}
             onChange={ onTermChange }/>
  </span>
)

SelectSearchInput.propTypes = {
    onTermChange: React.PropTypes.func
}

export default SelectSearchInput
