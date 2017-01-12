import React from 'react'
import { stopPropagation } from '../utils/events'


export const inArray = (item, array) => array.indexOf(item) !== -1
const allowedKeysArray = ['ArrowUp', 'ArrowDown', 'Escape']

const SelectSearchInput = props => {
    // TODO: close dropdown on esc click when SearchInput focused
    const filterKeyDowns = e => {
        if (inArray(e.key, allowedKeysArray)) {
            props.onKeyDown(e)
        }
    }

    return (
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
                   onKeyDown={ filterKeyDowns }
                   onClick={ stopPropagation() }
                   {...props}/>
        </span>
    )
}

export default SelectSearchInput
