import React, { PropTypes } from 'react'
import classNames from 'classnames'


const SelectOptionsList = ({ highlighted, selectedOption, options = [], onSelect }) => {
    const optionsList = options.map(({ id, text, isHidden }, i) => {
        if (isHidden) return null
        const isSelected = typeof selectedOption !== 'undefined' && selectedOption !== null && selectedOption.id === id
        const optionClassName = classNames('react-select-results__option', {
            'react-select-results--selected': isSelected,
            'react-select-results__option--highlighted': i === highlighted
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
        <span className="react-select-results">
            <ul className="react-select-results__options">{ optionsList }</ul>
        </span>
    )
}

SelectOptionsList.propTypes = {
    highlighted: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.object,
}

export default SelectOptionsList
