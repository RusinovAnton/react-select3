import React from 'react'
import { stopPropagation } from '../utils/events'


export const inArray = (item, array) => array.indexOf(item) !== -1
const allowedKeysArray = ['Escape']

const SelectSearchInput = ({ onClick, onKeyDown, ...props }, { cssClassNameSelector }) => { // eslint-disable-line no-unused-vars
  const filterKeyDowns = e => {
    if (inArray(e.key, allowedKeysArray)) {
      onKeyDown(e)
    }
  }

  return (
    <span className={`${cssClassNameSelector}__search`}>
      <input className={`${cssClassNameSelector}__search-field`}
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


SelectSearchInput.contextTypes = {
  cssClassNameSelector: React.PropTypes.string
}

export default SelectSearchInput
