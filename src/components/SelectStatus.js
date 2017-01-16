import React, { PropTypes } from 'react'


const SelectStatus = ({ language, isPending }, { cssClassNameSelector }) => {
  if (isPending) {
    return (
      <span className={`${cssClassNameSelector}__status`}>
        { language.isPending }
      </span>
    )
  }

  return null
}

SelectStatus.contextTypes = {
  cssClassNameSelector: PropTypes.string,
}

SelectStatus.propTypes = {
  isPending: PropTypes.bool.isRequired,
  language: PropTypes.object.isRequired,
}

export default SelectStatus
