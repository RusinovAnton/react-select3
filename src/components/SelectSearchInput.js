import React from 'react'
import { stopPropagation } from '../utils/events'


export const inArray = (item, array) => array.indexOf(item) !== -1
const allowedKeysArray = ['Escape']

const SelectSearchInput = ({ onClick, onKeyDown, ...props }) => { // eslint-disable-line no-unused-vars
  // TODO: close dropdown on esc click when SearchInput focused
  const filterKeyDowns = e => {
    if (inArray(e.key, allowedKeysArray)) {
      onKeyDown(e)
    }
  }

  return (
    <span className='PureReactSelect__search'>
      <input className='PureReactSelect__search-field'
             type='search'
             tabIndex='0'
             autoFocus
             autoComplete='off'
             autoCorrect='off'
             autoCapitalize='off'
             spellCheck='false'
             role='textbox'
             onKeyDown={ filterKeyDowns }
             onClick={ stopPropagation() }
             {...props}/>
    </span>
  )
}

export default SelectSearchInput
