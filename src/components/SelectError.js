import React from 'react'
import PropTypes from 'prop-types'


const SelectError = ({ error }, { cssClassNamePrefix }) => {
  return (typeof error === 'string') ?
    (<span className={`${cssClassNamePrefix}__error`}>{ error }</span>)
    : null;
};

SelectError.contextTypes = {
  cssClassNamePrefix: PropTypes.string,
};

SelectError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export default SelectError
