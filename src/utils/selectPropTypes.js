import { PropTypes } from 'react'


export const selectPropTypes = {
    optionId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
}
