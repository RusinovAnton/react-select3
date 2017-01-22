import React, { PropTypes } from 'react'
import { stopPropagation } from '../utils/events'

const allowedKeysArray = ['Escape']

const SelectSearchInput = ({ onClick, onKeyDown, ...props }, // eslint-disable-line no-unused-vars
  { cssClassNameSelector }) => {
  const filterKeyDown = (e) => {
    if (allowedKeysArray.indexOf(e.key) !== -1) {
      onKeyDown(e)
    }
  }

  return (
    <span className={`${cssClassNameSelector}__search`}>
      <input className={`${cssClassNameSelector}__search-field`}
             autoFocus
             autoComplete='off'
             autoCorrect='off'
             autoCapitalize='off'
             spellCheck='false'
             onKeyDown={ stopPropagation(filterKeyDown) }
             onClick={ stopPropagation() }
             {...props}/>
    </span>
  )
}

SelectSearchInput.contextTypes = {
  cssClassNameSelector: PropTypes.string,
}

export default SelectSearchInput
