import React, { PropTypes } from 'react'


const SelectStatus = ({ language, isPending }) => {
    if (!isPending) return null

    return (
        <span className='PureReactSelect__status'>
            { language.isPending }
        </span>
    )
}

SelectStatus.propTypes = {
    isPending: PropTypes.bool.isRequired,
    language: PropTypes.object.isRequired,
}

export default SelectStatus
