import React, { Component, PropTypes } from 'react'

import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import isNil from 'lodash/isNil'
import uniqueId from 'lodash/uniqueId'

import makeString from '../utils/makeString'

import SelectDropdown from './SelectDropdown'
import SelectError from './SelectError'
import SelectSelection from './SelectSelection'


// TODO: multiselect
// TODO: label
// TODO: optgroups
// TODO: make slim version
// TODO: optimize isFunction calls
export class Select extends Component {
  static childContextTypes = {
    cssClassNamePrefix: PropTypes.string,
  }

  static propTypes = {
    /**
     * Whether to allow user to reset selected option
     */
    allowClear: PropTypes.bool,
    cssClassNamePrefix: PropTypes.string,
    /**
     * Whether to focus itself on mount
     */
    autoFocus: PropTypes.bool,
    closeOnClickOutside: PropTypes.bool, // Default: true
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    /**
     * Provide error message to display or just boolean to highlight select container with error styles
     */
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    layout: PropTypes.shape({
      /**
       * Container's width
       */
      width: PropTypes.string,
      /**
       * Defines whether SelectDropdown should be opened above or below the container.
       * default: 'below'
       */
      // TODO: define position automatically depends on SelectContainer position in the viewport
      dropdownVerticalPosition: PropTypes.oneOf(['above', 'below']),
    }),
    name: PropTypes.string,
    /**
     * Function to transform options' 'text' to display in the SelectDropdown if needed
     * @param {object} option
     * @returns React element
     */
    optionRenderer: PropTypes.func,
    /**
     * Array of option items
     */
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      isHidden: PropTypes.bool,
      text: PropTypes.string.isRequired,
    })),
    onSelect: PropTypes.func,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    search: PropTypes.shape({
      /**
       * Minimum results amount before showing search input
       */
      minimumResults: PropTypes.number,
      show: PropTypes.bool,
      status: PropTypes.string,
    }),
    /**
     * Search input change callback
     */
    onSearchTermChange: PropTypes.func,
    /**
     * Value can be set by providing option id
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    allowClear: false,
    closeOnClickOutside: true,
    cssClassNamePrefix: 'rs3',
    disabled: false,
    layout: { dropdownVerticalPosition: 'below', width: '245px' },
    name: uniqueId('reactSelect_'),
    options: null,
    search: { minimumResults: 20 },
  }


  static initialState = () => ({
    disabled: false,
    dropdownOpened: false,
    error: null,
    highlighted: null,
    options: [],
    searchTerm: '',
    value: null,
  })

  /**
   * Ref Interface methods
   */
  set options(options) {
    if (!Array.isArray(options)) {
      throw new Error('Invalid options were provided. Options must be an array.')
    }

    this.setState({
      options: this._setOptions(options, true),
      value: null,
    })
  }

  get value() {
    return this.state.value
  }

  get options() {
    return [].concat(this.state.options)
  }

  clear() {
    this._onClearSelection()
  }


  constructor(props) { // eslint-disable-line consistent-return
    super(props)

    const onArrowUp = this._setHighlightedOption.bind(null, -1)
    const onArrowDown = this._setHighlightedOption.bind(null, 1)

    this.KEY_FUNCTIONS = {
      ArrowUp: onArrowUp,
      38: onArrowUp,
      ArrowDown: onArrowDown,
      40: onArrowDown,
      Enter: this._selectHighlighted,
      13: this._selectHighlighted,
      ' ': this._selectHighlighted, // 'Space' key
      32: this._selectHighlighted, // 'Space' key
      Escape: this._closeDropdown.bind(this, true),
      27: this._closeDropdown.bind(this, true),
    }

    this.state = Select.initialState()
    const { disabled, error, options } = props

    /**
     * @type {{
     *  dropdownOpened: boolean,
     *  error: string|boolean,
     *  highlighted: {id, index},
     *  options: array,
     *  searchTerm: string,
     *  value: string,
     * }}
     */
    this.state = Object.assign(this.state, {
      disabled,
      error,
      options: this._setOptions(options),
      value: this._setValue(),
    })
  }

  getChildContext = () => ({
    cssClassNamePrefix: this.props.cssClassNamePrefix,
  })

  componentWillReceiveProps(newProps) {
    const { disabled, error, options, value } = newProps
    const isValueValid = this._isValidValue(value)

    if (isValueValid && typeof newProps.onSelect === 'undefined' && typeof this.props.onSelect === 'undefined') {
      /* eslint-disable */
      console.warn(`Warning: You're setting value for Select component throught props
                but not passing onSelect callback which can lead to unforeseen consequences(bugs).
                Please consider using onSelect callback or defaultValue instead of value`)
      /* eslint-enable */
    }

    if (disabled) {
      this._closeDropdown(true)
    }

    this.setState(state => {
      let newValue = state.value

      if (isValueValid) {
        newValue = makeString(value)
      }

      return {
        disabled,
        options: this._setOptions(options),
        value: newValue,
        error: typeof error !== 'undefined' ? error : state.error
      }
    })
  }

  shouldComponentUpdate = ({ error, disabled, value, children }, nextState) => (
    (error !== this.props.error && error !== this.state.error)
    || disabled !== this.props.disabled
    || value !== this.state.value
    || !isEqual(children, this.props.children)
    || !isEqual(nextState, this.state)
  )

  componentDidMount = () => {
    const { autoFocus, closeOnClickOutside } = this.props

    // Autofocus on mount if enabled
    if (autoFocus) this._focusContainer()

    // Add listener for click outside if enabled
    if (closeOnClickOutside) document.addEventListener('click', this._handleClickOutside, true)
    this.selectContainer.addEventListener('blur', this._handleContainerBlur, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutside, true);
    this.selectContainer.removeEventListener('blur', this._handleContainerBlur, true);
  }

  /**
   * Close SelectDropdown on click outside
   */
  _handleClickOutside = (e) => {
    if (this.state.dropdownOpened && !this.selectContainer.contains(e.target)) {
      this._closeDropdown(false)
    }
  }

  _handleContainerBlur = (e) => {
    if (!this.selectContainer.contains(e.relatedTarget)) {
      this._closeDropdown(false)
    }
  }

  _isValidValue = value => {
    const { options } = this.state
    let isValid = false

    if (typeof value === 'undefined') {
      isValid = false
    } else if (value === null) {
      isValid = true
    } else if (options && options.length) {
      isValid = options.some(({ id }) => id === String(value))
    }

    return isValid
  }

  _openDropdown = () => {
    this.setState({ dropdownOpened: true })
  }

  _closeDropdown = (focus) => {
    this.setState({
      dropdownOpened: false,
      highlighted: null,
    })

    if (focus) {
      this._focusContainer()
    }
  }

  _focusContainer = () => {
    const x = window.scrollX
    const y = window.scrollY

    window.scrollTo(x, y)
    if (this.selectContainer) {
      this.selectContainer.focus()
    }
  }

  _setValue = () => {
    const { value, defaultValue } = this.props

    if (value === null) {
      return null
    }

    return makeString(value || defaultValue)
  }

  _makeOption = (id, text) => {
    if (!((typeof id === 'string' || typeof id === 'number') && (typeof text === 'string' || typeof text === 'number'))) {
      throw new Error('Options array is not formatted properly, option object must have "id" and "text"')
    }

    return { id: String(id), text }
  }

  _setOptions = (options, isNotFromProps) => {
    if (!isNotFromProps) {
      if (options === this.initialOptions) {
        return this.state.options
      }

      this.initialOptions = options
    }

    let stateOptions = this.state.options || []

    if (Array.isArray(options) && options.length) {
      stateOptions = options.map(({ id, text }) => this._makeOption(id, text))
    }

    return stateOptions
  }

  _getOptionById = value => {
    const { options } = this.state

    if (options && options.length) {
      return options.find(({ id }) => id === value) // eslint-disable-line eqeqeq
    }

    return null
  }

  _onContainerClick = () => {
    if (this.state.disabled) {
      return
    }

    if (this.state.dropdownOpened) {
      this._closeDropdown(true)
    } else {
      this._openDropdown()
    }
  }

  /**
   * Handle keyboard controls
   * @param {object} event
   */
  _onContainerKeyDown = event => {
    if (this.props.disabled) return

    const key = event.key || event.keyCode
    if (!this.KEY_FUNCTIONS[key]) return

    event.preventDefault()
    // Handle key click
    this.KEY_FUNCTIONS[key]()
  }

  _onClearSelection = () => {
    const { disabled, value } = this.state

    // Dont clear when disabled && dont fire extra event when value is already cleared
    if (!disabled && value) {
      this._onSelect(null)
    }
  }

  /**
   * Setting selected value
   * @param {object} option - option object from data array
   */
  _onSelect = option => {
    const { name, onSelect } = this.props
    // Setup structure of selection event
    const value = option ? option.id : null
    const selectionEvent = {
      type: 'select',
      isClear: option === null,  // indicates that value being cleared by onClearSelection
      target: {
        name,
        option,
        value,
      }
    }

    this.setState({ value, searchTerm: '' }, () => {
      if (isFunction(onSelect)) {
        onSelect(selectionEvent)
      }
    })

    this._closeDropdown(true)
    this._focusContainer()
  }

  /**
   * Handle option selection via user click
   * @param {number} id - options id
   */
  _onSelectOption = id => {
    // Get selected option and pass it into onSelect method for further processing
    const selectedOption = this._getOptionById(id)

    this._onSelect(selectedOption)
  }

  static makeHighlightedObject = (index, options) => {
    if (!options.length) {
      return null
    }

    return ({ id: options[index].id, index })
  }

  _hasHighlighted = () => {
    const { highlighted } = this.state

    return !!highlighted && typeof highlighted.index !== 'undefined'
  }
  /**
   * Set next highlighted option via 'ArrowUp' or 'ArrowDown' key
   * @param {number} direction (can be -1 or 1)
   */
  _setHighlightedOption = direction => {
    this.setState(({ disabled, highlighted, dropdownOpened }) => {
      const options = this._getOptionsList()

      // do nothing if disabled or there are no options
      if (disabled || !options || !options.length) return

      const optionsLength = options.length - 1
      const hasHighlighted = this._hasHighlighted()
      const nextHighlighted = (hasHighlighted) ? highlighted.index + direction : 0
      let highlightIndex

      // TODO: scroll SelectDropdown block to show highlighted item when overflows
      // If dropdown not opened or there is no highlighted item yet
      if (!dropdownOpened || !(hasHighlighted)
        // highlight first option after click 'ArrowDown' on the last one
        || nextHighlighted > optionsLength) {
        highlightIndex = 0
      } else if (nextHighlighted < 0) {
        // Highlight last option after click 'ArrowUp' on the first one
        highlightIndex = optionsLength
      } else {
        // Highlight next option
        highlightIndex = nextHighlighted
      }

      return ({ // eslint-disable-line consistent-return
        dropdownOpened: true,
        highlighted: Select.makeHighlightedObject(highlightIndex, options)
      })
    })
  }

  /**
   * Select current highlighted option
   */
    // @fixme: selects invalid option when options list filtered by searchTerm
  _selectHighlighted = () => {
    const { options, highlighted, dropdownOpened } = this.state

    // If dropdown not opened or there is no highlighted item yet
    if (!dropdownOpened || !this._hasHighlighted()) {
      // Open dropdown and hightlight first item
      this.setState({
        dropdownOpened: true,
        highlighted: Select.makeHighlightedObject(0, this._getOptionsList()),
      })
    } else {
      // Select highlighted item
      this._onSelect(options.find(({ id }) => id === highlighted.id))
    }
  }

  _getSelectContainerClassName = () => {
    const {
      className,
      cssClassNamePrefix,
      disabled,
      error,
      layout: { dropdownVerticalPosition },
    } = this.props
    const { dropdownOpened, value } = this.state

    return classNames(`${cssClassNamePrefix}__container ${className || ''}`, {
      [`${cssClassNamePrefix}--above`]: dropdownVerticalPosition === 'above',
      [`${cssClassNamePrefix}--below`]: dropdownVerticalPosition !== 'above',
      [`${cssClassNamePrefix}--disabled`]: disabled,
      [`${cssClassNamePrefix}--error`]: !!error || !!this.state.error,
      [`${cssClassNamePrefix}--open`]: dropdownOpened,
      [`${cssClassNamePrefix}--selected`]: !isNil(value),
    })
  }

  _isClearable = () => {
    const { allowClear } = this.props
    const { value, disabled } = this.state

    return (allowClear && !disabled && !isNil(value))
  }

  _getOptionsList = () => {
    const { options, searchTerm } = this.state
    let optionsList = options || []

    if (searchTerm && optionsList.length) {
      optionsList = options.filter(({ text }) => new RegExp(searchTerm, 'gi').test(text))
    }

    return optionsList
  }

  _onSearchTermChange = e => {
    const { target: { value: term } } = e
    const { onSearchTermChange } = this.props

    // If size of text is increases
    // const isTextIncreasing = term && (!stateSearchTerm || term.length > stateSearchTerm.length)
    const searchTerm = term || ''

    // if callback were passed in props
    if (isFunction(onSearchTermChange)) {
      onSearchTermChange(e)
    }

    this.setState({ searchTerm })
  }

  _isShowSearch = () => {
    const { options } = this.state
    const { search: { show, minimumResults = 20 } } = this.props

    return show || (!!options.length && (minimumResults <= options.length))
  }

  _setContainerRef = (node) => {
    this.selectContainer = node
  }

  render() {
    const { cssClassNamePrefix, optionRenderer, layout: { width }, placeholder, search: { status }, name } = this.props
    const { disabled, dropdownOpened, error, highlighted, searchTerm, value } = this.state
    const selectedOption = this._getOptionById(value)

    return (
      <span ref={ this._setContainerRef }
            className={ this._getSelectContainerClassName() }
            style={{ width }}
            disabled={ disabled }
            tabIndex='0'
            role='combobox'
            onClick={ this._onContainerClick }
            onKeyDown={ this._onContainerKeyDown }>
      <select tabIndex='-1'
              name={ name }
              value={ !isNil(value) ? value : '' }
              readOnly
              className={`${cssClassNamePrefix}__select-node`}>
        { !isNil(value) && <option value={value}/> }
      </select>
      <SelectSelection clearable={ this._isClearable() }
                       onClearSelection={ this._onClearSelection }
                       placeholder={ placeholder }
                       formatter={ optionRenderer }
                       selection={ selectedOption }
                       onKeyDown={ this._onContainerKeyDown }/>
        { dropdownOpened && (
          <SelectDropdown options={ this._getOptionsList() }
                          status={ status }
                          showSearch={ this._isShowSearch() }
                          highlighted={ highlighted ? highlighted.id : null }
                          searchTerm={ searchTerm }
                          formatter={ optionRenderer }
                          onSelect={ this._onSelectOption }
                          onSearchInputChange={ this._onSearchTermChange }
                          onSearchInputKeyDown={ this._onContainerKeyDown }
                          selected={ value }/>
        ) }
        <SelectError error={ error }/>
      </span>
    )
  }
}

export default Select
