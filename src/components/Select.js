import React, { Component, PropTypes } from 'react'

import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import provideClickOutside from 'react-click-outside'

import SelectionArrow from './SelectionArrow'
import SelectDropdown from './SelectDropdown'
import SelectSelection from './SelectSelection'


// TODO: optgroups
// TODO: options & optgroups as children
class Select extends Component {

  static propTypes = {
    /**
     * Array of option items
     */
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      })),
    ]),
    /**
     * Defines whether SelectDropdown should be opened above or below the container.
     * default: 'below'
     */
    // TODO: define position automatically depends on SelectContainer position in the viewport
    dropdownPosition: PropTypes.oneOf(['above', 'below']),
    // TODO: fetch options from server by term query
    ajax: PropTypes.object,
    options: PropTypes.shape({
      placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      width: PropTypes.string,
      minimumResultsForSearch: PropTypes.number,
    }),
    /**
     * You can provide error message to display or just boolean to highlight error
     */
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onSelect: PropTypes.func,
    /**
     * Value can be set by providing option id
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  static defaultProps = {
    options: {}
  }

  constructor(props, context) { // eslint-disable-line consistent-return
    super(props, context)
    const { value, data, disabled } = props

    // Validate data object
    if (!Array.isArray(data)) {
      throw new Error('Provided data prop is invalid. Expected an array of option items')
    }

    // Validate value prop
    if (!!value && !(typeof value !== 'number' || typeof value !== 'string')) {
      throw new Error('Provided value prop is invalid. Expected option id or option text')
    }

    // Keep ref for incoming data array
    this._initialData = data

    // setup initial state object
    this._initialState = {
      value,
      data: this.getOptionsData(data),
      disabled,
      highlighted: null,
      dropdownOpened: false,
      // TODO: make search happen
      searchShow: false,
    }

    /**
     * @type {{
     *   value: *,
     *   data: object,
     *   disabled: boolean,
     *   dropdownOpened: boolean,
     *   searchShow: boolean
     * }}
     */
    this.state = Object.assign({}, this._initialState)

  }

  componentWillReceiveProps({ data, disabled, value }) {
    const state = Object.assign({}, this._initialState, { value: this.state.value })
    let willUpdate = false

    // Set new disabled prop if updated
    if (disabled !== this.state.disabled) {
      state.disabled = disabled

      willUpdate = true
    }

    // Set new data if update
    if (data !== this._initialData) {
      // Set new data as initial
      this._initialData = data
      state.data = this.getOptionsData(data)

      willUpdate = true
    }

    // Set new value if updated
    // null for reseting the value
    if ((!!value || value === null) && value !== this.state.value) {
      state.value = value

      willUpdate = true
    }

    // Rerender if any updates occur
    if (willUpdate) {
      this.setState(state)
    }
  }

  shouldComponentUpdate = ({ data, disabled, value }, nextState) =>
    data !== this._initialData
    || disabled !== this.state.disabled
    || value !== this.state.value
    || !isEqual(nextState, this.state)

  /**
   * Process data which passed through props
   * @param {array} data
   * @return {*}
   */
  getOptionsData = data => {
    if (!data.length) {
      return []
    }

    // If options are objects {id: <id>, text: <optionLabel>}
    if (data.reduce((result, dataItem) =>
        result && (typeof dataItem.id !== 'undefined' && typeof dataItem.text !== 'undefined'),
        true)
    ) {
      return data
    }

    // If options are simply text
    if (data.reduce((result, dataItem) =>
        result && (typeof dataItem === 'number' || typeof dataItem === 'string'),
        true)
    ) {
      return data.map(option => ({
        id: option,
        text: option
      }))
    }

    throw this.exceptions.invalidDataProvided
  }

  getOptionByIndex = index => {
    const { data } = this.state

    if (index > data.length || index < 0) {
      throw new Error('Invalid index provided')
    }

    return data[index]
  }

  focusContainer = () => {
    const x = window.scrollX
    const y = window.scrollY

    this.refs.selectContainer.focus()
    window.scrollTo(x, y)
  }

  onContainerClick = () => {

    if (this.state.disabled) {
      this.setState({ dropdownOpened: false })
      return
    }

    this.setState({ dropdownOpened: !this.state.dropdownOpened })

  }

  /**
   * Set next highlighted option via 'ArrowUp' or 'ArrowDown' key
   * @param {number} direction (can be -1 or 1)
   */
  setHightlightedOption = direction => {
    const { data, highlighted, dropdownOpened } = this.state
    const dataLength = data.length - 1
    const nextHighlighted = highlighted + direction

    // If dropdown not opened or there is no highlighted item yet
    if (!dropdownOpened
      || highlighted === null
      // highlight first option after click 'ArrowDown' on the last one
      || nextHighlighted > dataLength) {
      this.setState({ highlighted: 0, dropdownOpened: true })
      return
    }

    // Highlight last option after click 'ArrowUp' on the first one
    if (nextHighlighted < 0) {
      this.setState({ highlighted: dataLength })
      return
    }

    // Highlight next option
    this.setState({ highlighted: nextHighlighted })
  }

  /**
   * Select current highlighted option via 'Space' or 'Enter' key
   */
  selectHighlighted = () => {
    const { data, highlighted, dropdownOpened } = this.state

    // If dropdown not opened or there is no highlighted item yet
    if (!dropdownOpened || highlighted === null) {

      // Open dropdown and hightlight first item
      this.setState({ dropdownOpened: true, highlighted: 0 })
      return
    }

    // Select highlighted item
    this.onSelect(data[highlighted])
  }

  /**
   * Handle keyboard controls
   * @param {object} event
   */
  onContainerKeyDown = event => {
    const KEYS = {
      ArrowUp: this.setHightlightedOption.bind(null, -1),
      ArrowDown: this.setHightlightedOption.bind(null, 1),
      Enter: this.selectHighlighted,
      // 'Space' key
      ' ': this.selectHighlighted,
      Escape: this.closeDropdown
    }
    // TODO: scroll SelectDropdown block to show highlighted item when overflows
    const key = event.key

    // Do nothing if other key is being clicked
    if (!KEYS[key]) return

    event.preventDefault()
    // Handle key click
    KEYS[key]()
  }

  /**
   * Close SelectDropdown on click outside using 'react-click-outside' library
   */
  handleClickOutside = () => {
    this.closeDropdown()
  }

  closeDropdown = () => {
    this.setState({
      dropdownOpened: false,
      highlighted: null
    })
  }

  /**
   * Setting selected value
   * @param {object} value - option object from data array
   */
  onSelect = value => {
    const { name, onSelect } = this.props

    // Setup structure of selection event
    const selectionEvent = {
      type: 'select',
      target: {
        name,
        value: value.id,
        valueText: value.text
      }
    }

    this.setState({ value: value.id })

    if (isFunction(onSelect)) {
      onSelect(selectionEvent)
    }

    this.closeDropdown()
    this.focusContainer()
  }

  /**
   * Handle option selection via user click
   * @param {number} index - index of option item in the data array
   */
  onSelectOption = ({ target: { dataset: { index } } }) => {

    // Get selected option and pass it into onSelect method for further processing
    const selectedOption = this.getOptionByIndex(index)
    this.onSelect(selectedOption)

  }

  render() {
    const { error, options, dropdownPosition } = this.props
    const { data, disabled, dropdownOpened, highlighted, value } = this.state

    const containerClassName = classNames('select react-select-container react-select-container--default', {
      'react-select-container--open': dropdownOpened,
      'react-select-container--disabled': disabled,
      'react-select-container--error': error,
      'react-select-container--above': dropdownPosition === 'above',
      'react-select-container--below': !dropdownPosition || dropdownPosition === 'below'
    })

    return (
      <span className={ containerClassName }
            style={{ width: options.width || '245px' }}
            disabled={ disabled }>
        <span ref='selectContainer'
              className='react-select__selection react-select-selection--single'
              tabIndex='1'
              disabled={ disabled }
              onClick={ this.onContainerClick }
              onKeyDown={ this.onContainerKeyDown }
              role='combobox'>
          <SelectSelection {...{ data, value, placeholder: options.placeholder }}/>
          <SelectionArrow/>
        </span>
        { dropdownOpened && (
          <SelectDropdown searchShow={ data.length >= options.minimumResultsForSearch || options.ajax }
                          onSelect={ this.onSelectOption }
                          {...{ data, highlighted }}/>
        )}
      </span>
    )
  }

}

export default provideClickOutside(Select)
