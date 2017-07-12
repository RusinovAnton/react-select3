import React from 'react'
import PropTypes from 'prop-types'
import filterKeyDown from '../utils/filterKeyDown'
import { stopPropagation } from '../utils/events'


const SelectSearchInput = ({ onClick, onKeyDown, ...props }, // eslint-disable-line no-unused-vars
  { cssClassNamePrefix }) => (
  <span className={`${cssClassNamePrefix}__search`}>
    <input
      className={`${cssClassNamePrefix}__search-field`}
      autoFocus
      autoComplete='off'
      autoCorrect='off'
      autoCapitalize='off'
      spellCheck='false'
      onKeyDown={stopPropagation(filterKeyDown([
        {
          allowedKeys: ['Escape', 'Enter', 'ArrowUp', 'ArrowDown'],
          func: onKeyDown,
        },
      ]))}
      onClick={stopPropagation()}
      {...props}
    />
  </span>
);


SelectSearchInput.contextTypes = {
  cssClassNamePrefix: PropTypes.string,
};

export default SelectSearchInput
