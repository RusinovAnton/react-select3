import React, { PropTypes } from 'react'


const SelectError = ({ error }, { cssClassNamePrefix }) => {
  if (typeof error !== 'string') return null

  return (
    <span className={`${cssClassNamePrefix}__error`}>{ error }</span>
  )
}

SelectError.contextTypes = {
  cssClassNamePrefix: PropTypes.string,
}

SelectError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ])
}

export default SelectError
