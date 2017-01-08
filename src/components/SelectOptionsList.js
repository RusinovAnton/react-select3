import React, { PropTypes } from 'react'
import classNames from 'classnames'


const SelectOptionsList = ({ highlighted, selectedOption, options = [], onSelect }) => {
    const optionsList = options.map(({ id, text, isHidden }, i) => {
        if (isHidden) return null
        const isSelected = typeof selectedOption !== 'undefined' && selectedOption !== null && selectedOption.id === id
        const optionClassName = classNames('pure-react-select-results__option', {
            'pure-react-select-results--selected': isSelected,
            'pure-react-select-results__option--highlighted': i === highlighted
        })

        return (
            <li key={ i }
                className={ optionClassName }
                data-id={ id }
                data-index={ i }
                onClick={ isSelected ? null : onSelect }>
                { text }
            </li>
        )
    })

    return (
        <ul className="pure-react-select__results-options">
            { optionsList }
        </ul>
    )
}

SelectOptionsList.propTypes = {
    highlighted: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.object,
}

export default SelectOptionsList
