import React, { PropTypes } from 'react'
import { stopPropagation } from '../utils/events'
import filterKeyDown from '../utils/filterKeyDown'


const SelectSearchInput = ({ onClick, onKeyDown, ...props }, // eslint-disable-line no-unused-vars
  { cssClassNameSelector }) => (
  <span className={`${cssClassNameSelector}__search`}>
      <input className={`${cssClassNameSelector}__search-field`}
             autoFocus
             autoComplete='off'
             autoCorrect='off'
             autoCapitalize='off'
             spellCheck='false'
             onKeyDown={ stopPropagation(filterKeyDown([
               {
                 allowedKeys: ['Escape', 'Enter', 'ArrowUp', 'ArrowDown'],
                 func: onKeyDown
               },
             ])) }
             onClick={ stopPropagation() }
             {...props}/>
    </span>
)


SelectSearchInput.contextTypes = {
  cssClassNameSelector: PropTypes.string,
}

export default SelectSearchInput
