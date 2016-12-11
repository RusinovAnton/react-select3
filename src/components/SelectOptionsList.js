import React, { PropTypes } from 'react'

import classNames from 'classnames'


const SelectOptionsList = ({ data = [], highlighted, value, onSelect }) => {
  const optionsData = data.map(({ id, text, unselectable }, i) => {
    if (unselectable) return null
    if (typeof id === 'undefined' || typeof text === 'undefined') {
      throw new Error('Data formatting is invalid')
    }

    const isSelected = value && (value === id || value.id === id)

    return (
      <li key={ i }
          className={ classNames('react-select-results__option', {
            'react-select-results--selected': isSelected,
            'react-select-results__option--highlighted': i === highlighted
          })}
          data-id={ id }
          data-index={ i }
          onClick={ isSelected ? null : onSelect }>
        { text }
      </li>
    )
  })


  return (
    <span className="react-select-results">
        <ul className="react-select-results__options">
          { optionsData }
        </ul>
      </span>
  )
}

SelectOptionsList.propTypes = {
  data: PropTypes.array,
  formatter: PropTypes.func,
  highlighted: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ]),
  onSelect: PropTypes.func,
}

export default SelectOptionsList
