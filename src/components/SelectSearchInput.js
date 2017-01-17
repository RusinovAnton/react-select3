import React, { PropTypes } from 'react'
import { stopPropagation } from '../utils/events'


export const inArray = (item, array) => array.indexOf(item) !== -1
const allowedKeysArray = ['Escape']

const SelectSearchInput = ({ onClick, onKeyDown, isPending, ...props }, // eslint-disable-line no-unused-vars
  { cssClassNameSelector }) => {
  const filterKeyDowns = e => {
    if (inArray(e.key, allowedKeysArray)) {
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
             onKeyDown={ filterKeyDowns }
             onClick={ stopPropagation() }
             {...props}/>
      {/* { isPending && <span className={`${cssClassNameSelector}__loader`}/> } */}
    </span>
  )
}

SelectSearchInput.propTypes = {
  isPending: PropTypes.bool.isRequired,
}

SelectSearchInput.contextTypes = {
  cssClassNameSelector: PropTypes.string,
}

export default SelectSearchInput
