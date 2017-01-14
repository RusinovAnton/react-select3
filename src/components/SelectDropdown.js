import React, { PropTypes } from 'react'

import SelectOptionsList from './SelectOptionsList'
import SelectSearchInput from './SelectSearchInput'


const SelectDropdown = ({
    highlighted,
    isPending,
    language,
    onSearchTermChange,
    onSelect,
    options,
    showSearch,
    searchTerm,
    value,
}) => (
    <span className="pure-react-select__dropdown">
        { showSearch &&
            <SelectSearchInput value={ searchTerm } onChange={ onSearchTermChange }/> }
        { isPending && !options.length ?
            language.isPending
            : <SelectOptionsList {...{ options, value, highlighted, onSelect }} />
        }
    </span>
)

SelectDropdown.propTypes = {
    highlighted: PropTypes.number,
    isPending: PropTypes.bool,
    language: PropTypes.object.isRequired,
    onSearchTermChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    searchTerm: PropTypes.string,
    showSearch: PropTypes.bool.isRequired,
    value: PropTypes.string,
}

export default SelectDropdown
