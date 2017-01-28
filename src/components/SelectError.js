import React, { PropTypes } from 'react'


const SelectError = ({ error }, { cssClassNamePrefix }) => (typeof error === 'string') ?
  (<span className={`${cssClassNamePrefix}__error`}>{ error }</span>)
  : null

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
