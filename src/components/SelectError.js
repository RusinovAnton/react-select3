import React, { PropTypes } from 'react'


const SelectError = ({ error }) => {
    if (typeof error !== 'string') return null

    return (
        <span className='help-block'>{ error }</span>
    )
}

SelectError.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ])
}

export default SelectError
