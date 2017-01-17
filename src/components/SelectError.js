import React, { PropTypes } from 'react'


const SelectError = ({ error }, { cssClassNameSelector }) => {
  if (typeof error !== 'string') return null

  return (
    <span className={`${cssClassNameSelector}__error`}>{ error }</span>
  )
}

SelectError.contextTypes = {
  cssClassNameSelector: PropTypes.string,
}

SelectError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ])
}

export default SelectError
