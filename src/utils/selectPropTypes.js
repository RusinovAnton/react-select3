import { PropTypes } from 'react'

export default {
  optionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  selection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}
