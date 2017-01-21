import React, { Children, Component, PropTypes } from 'react'

import classNames from 'classnames'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import isNil from 'lodash/isNil'
import keys from 'lodash/keys'
import path from 'path'
import provideClickOutside from 'react-click-outside'
import qs from 'qs'
import uniqueId from 'lodash/uniqueId'

import fetchJson from '../utils/fetch'
import makeString from '../utils/makeString'
import selectPropTypes from '../utils/selectPropTypes'
import { DEFAULT_LANG } from  '../consts'

import SelectError from './SelectError'
import SelectOptionsList from './SelectOptionsList'
import SelectSearchInput from './SelectSearchInput'
import SelectSelection from './SelectSelection'


// TODO: styles
// TODO: multiselect
// TODO: label
// TODO: optgroups
// TODO: make separate modules for simple, fetch once, fetch on search, multiselect etc
export class Select extends Component {
  static childContextTypes = {
    cssClassNameSelector: PropTypes.string,
  }

  static propTypes = {
    /**
     * Whether to allow user to clear select
     */
    allowClear: PropTypes.bool,
    cssClassNameSelector: PropTypes.string,
    /**
     * Whether to focus itself on mount
     */
    autoFocus: PropTypes.bool,
    defaultValue: selectPropTypes.optionId,
    disabled: PropTypes.bool,
    /**
     * Provide error message to display or just boolean to highlight select container with error styles
     */
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /**
     * Provide custom messages
     */
    language: PropTypes.object,
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
      dropdownHorizontalPosition: PropTypes.oneOf(['left', 'right'])
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
      id: selectPropTypes.optionId.isRequired,
      isHidden: PropTypes.bool,
      text: PropTypes.string.isRequired,
    })),
    /**
     * Provide needed options to fetch data from server by term query
     */
    request: PropTypes.shape({
      /**
       * Delays between requests
       */
      delay: PropTypes.number, // default: 500
      endpoint: PropTypes.string.isRequired,
      /**
       * Whenever to fetch options once at mount or on searchTermChange
       */
      once: PropTypes.bool,
      /**
       * Additional query params
       */
      params: PropTypes.object,
      /**
       * You can provide custom ajaxClient instead of built-in fetchJson
       * which invokes on termChange or once at component mount with endpoint
       * and query params as string argument
       */
      ajaxClient: PropTypes.func,
      /**
       * Pass in function that will used to map response data array
       * `{ id: number|string, text: string|element }`
       */
      responseDataFormatter: PropTypes.func,
      /**
       * Name of the key of searchTerm query param
       * `{ [termQuery]: 'search term' }`
       */
      termQuery: PropTypes.string,
    }),
    onSelect: PropTypes.func,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    search: PropTypes.shape({
      /**
       * Minimum results amount before showing search input
       */
      minimumResults: PropTypes.number,
      /**
       * Minimum characters before sending request
       */
      minLength: PropTypes.number, // default: 3
    }),
    /**
     * Search input change callback
     */
    onSearchTermChange: PropTypes.func,
    /**
     * Value can be set by providing option id
     */
    value: selectPropTypes.optionId,
  }

  static defaultProps = {
    allowClear: false,
    cssClassNameSelector: 'PureReactSelect',
    disabled: false,
    layout: {
      dropdownHorizontalPosition: 'left',
      dropdownVerticalPosition: 'below',
      width: '245px',
    },
    name: uniqueId('reactSelect_'),
    options: null,
    search: {
      minimumResults: 20,
      minLength: 3,
    },
  }

  static initialState = () => ({
    disabled: false,
    dropdownOpened: false,
    error: null,
    highlighted: null,
    isPending: false,
    options: [],
    fetched: false,
    requestSearch: false,
    searchTerm: '',
    value: null,
  })

  // @fixme: getChildrenTextContent function is not perfect tbh
  static getChildrenTextContent = element => {
    if (typeof element === 'string') {
      return element
    }

    return Select.getChildrenTextContent(Children.toArray(element)[0].props.children)
  }

  set options(options) {
    if (Array.isArray(options)) {
      this.setState({
        options: this._setOptions(options),
        value: null,
      })
    }
  }

  get selectNode() {
    return this.refs.selectContainer
  }

  get value() {
    const { selectedOption } = this.state

    return selectedOption ? selectedOption.id : null
  }

  get options() {
    return this.state.options
  }

  clear() {
    this._onClearSelection()
  }

  constructor(props, context) { // eslint-disable-line consistent-return
    super(props, context)

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
      Escape: this._closeDropdown,
      27: this._closeDropdown,
    }
    this.state = {}

    const {
      children,
      disabled,
      error,
      options,
      request,
    } = props

    if (request && typeof request.endpoint !== 'string') {
      throw new Error('Request endpoint must be a string.')
    }

    /**
     * @var {boolean} does select need to send request for options on searchTermChange
     */
    const requestSearch = request && !request.once

    if (requestSearch) {
      const requestDelay = (request && request.delay) ? request.delay : 500

      this._requestOptions = debounce(this._request, requestDelay)
    } else {
      this._requestOptions = this._request
    }

    /**
     * @type {{
         *  dropdownOpened: boolean,
         *  error: string|boolean,
         *  highlighted: {id, index},
         *  isPending: boolean,
         *  options: array,
         *  requestSearch: boolean
         *  searchTerm: string,
         *  value: string,
         * }}
     */
    this.state = Object.assign(Select.initialState(), {
      disabled,
      error,
      options: this._setOptions(options, children),
      requestSearch,
      value: this._setValue(),
    })

    this.language = this._composeLanguageObject()
  }

  getChildContext = () => ({
    cssClassNameSelector: this.props.cssClassNameSelector
  })

  componentWillReceiveProps(newProps) {
    const { disabled, error, options, children, value } = newProps
    const isValueValid = this._isValidValue(value)

    if (isValueValid && typeof newProps.onSelect === 'undefined' && typeof this.props.onSelect === 'undefined') {
      /* eslint-disable */
      console.warn(`Warning: You're setting value for Select component throught props
                but not passing onSelect callback which can lead to unforeseen consequences(bugs).
                Please consider using onSelect callback or defaultValue instead of value`)
      /* eslint-enable */
    }

    if (disabled) {
      this._closeDropdown()
    }

    this.setState(state => {
      let newValue = state.value

      if (isValueValid) {
        newValue = makeString(value)
      }

      return {
        disabled,
        options: this._setOptions(options, children),
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
    const { autoFocus, request } = this.props

    if (autoFocus) this._focusContainer()
    if (request && request.once) this._requestOptions()
  }

  componentWillUnmount = () => {
    if (this.state.requestSearch) {
      this._requestOptions.cancel()
    }
  }

  /**
   * Close SelectDropdown on click outside using 'react-click-outside' library
   */
  handleClickOutside = () => {
    this._closeDropdown()
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

  _composeLanguageObject = () => {
    const { language, search } = this.props
    const minLength = (search && search.minLength) || 3

    const lang = Object.assign({}, DEFAULT_LANG, language)

    lang.minLength = lang.minLength.replace(/\$\{minLength\}/, minLength)

    return lang
  }

  _request = searchTerm => {
    const {
      request: {
        ajaxClient,
        endpoint,
        params,
        responseDataFormatter,
        termQuery,
      }
    } = this.props

    function composeFetchPath(endpoint, params = {}, { searchTerm, termQuery }) {
      let fetchPath
      let fetchParams = Object.assign({}, params)

      if (searchTerm) {
        if (!termQuery) throw new Error('Provide request.termQuery prop')
        fetchParams = Object.assign(fetchParams, {
          [termQuery]: searchTerm
        })
      }

      if (keys(fetchParams)) {
        fetchPath = path.join(endpoint, `?${qs.stringify(fetchParams)}`)
      }

      return fetchPath
    }

    const fetchClient = ajaxClient || fetchJson
    const fetchPath = composeFetchPath(endpoint, params, { searchTerm, termQuery })

    this.setState({
      error: this.props.error || null,
      fetched: true,
      isPending: true,
    })

    fetchClient(fetchPath)
      .then(data => {
        let options = data
        if (isFunction(responseDataFormatter)) {
          options = data.map(responseDataFormatter)
        }

        this.setState({
          options: this._setOptions(options),
          fetchError: false,
          isPending: false,
        })
      })
      .catch(() => {
        this.setState({
          fetchError: true,
          isPending: false,
        })
      })
  }

  _openDropdown = () => {
    this.setState({ dropdownOpened: true })
  }

  _closeDropdown = () => {
    this.setState({
      dropdownOpened: false,
      highlighted: null,
    })
  }

  _focusContainer = () => {
    const x = window.scrollX
    const y = window.scrollY

    window.scrollTo(x, y)
    if (this.refs.selectContainer) {
      this.refs.selectContainer.focus()
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

  _setOptions = (options, children) => {
    let stateOptions = this.state.options || []

    if (Array.isArray(options) && options.length) {
      stateOptions = options.map(({ id, text }) => this._makeOption(id, text))
    } else if (Children.count(children)) {
      stateOptions = Children.toArray(children)
        .filter(({ type }) => type === 'option')
        .map(({ props: { children: text, value: id } }) => this._makeOption(id, text))
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
      this._closeDropdown()
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
    // Dont clear when disabled && dont fire extra event when value is already cleared
    if (!this.state.disabled && this.state.value !== null) {
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

    this._closeDropdown()
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

  static makeHighlightedObject = (index, options) => ({ id: options[index].id, index })

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
      disabled,
      layout: {
        dropdownHorizontalPosition,
        dropdownVerticalPosition,
      },
      cssClassNameSelector,
      error,
    } = this.props
    const {
      dropdownOpened,
      isPending,
      value,
    } = this.state

    return classNames(`${cssClassNameSelector}__container ${className || ''}`, {
      [`${cssClassNameSelector}--above`]: dropdownVerticalPosition === 'above',
      [`${cssClassNameSelector}--below`]: dropdownVerticalPosition !== 'above',
      [`${cssClassNameSelector}--disabled`]: disabled,
      [`${cssClassNameSelector}--error`]: !!error || !!this.state.error,
      [`${cssClassNameSelector}--left`]: dropdownHorizontalPosition !== 'right',
      [`${cssClassNameSelector}--open`]: dropdownOpened,
      [`${cssClassNameSelector}--pending`]: isPending,
      [`${cssClassNameSelector}--right`]: dropdownHorizontalPosition === 'right',
      [`${cssClassNameSelector}--selected`]: !isNil(value),
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
      const searchRegExp = new RegExp(searchTerm, 'gi')

      optionsList = options.filter(({ text }) => searchRegExp.test(text))
    }

    return optionsList
  }

  _onSearchTermChange = e => {
    const { target: { value: term } } = e
    const { search: { minLength = 3 }, onSearchTermChange } = this.props
    const { requestSearch } = this.state

    // If size of text is increases
    // const isTextIncreasing = term && (!stateSearchTerm || term.length > stateSearchTerm.length)
    const searchTerm = term || ''

    // if callback were passed in props
    if (isFunction(onSearchTermChange)) {
      onSearchTermChange(e)
    }

    // If requestSearch enabled
    if (searchTerm && searchTerm.length >= minLength && requestSearch) {
      this._requestOptions(searchTerm)
    }

    this.setState({ searchTerm })
  }

  // TODO: separate component?
  _renderSelectDropdown = () => {
    const { search, optionRenderer, cssClassNameSelector } = this.props
    const { fetched, highlighted, isPending, options, requestSearch, searchTerm, value, fetchError } = this.state
    const showSearch = requestSearch || (options.length && search.minimumResults <= options.length)
    let status = null

    if (!options.length) {
      if (!fetched) {
        status = this.language.minLength
      } else if (isPending) {
        status = this.language.isPending
      } else if (fetchError) {
        status = this.language.serverError
      } else {
        status = this.language.isEmpty
      }
    }

    return (
      <span className={`${cssClassNameSelector}__dropdown`}>
        {
          showSearch && <SelectSearchInput value={ searchTerm }
                                           isPending={ isPending }
                                           onKeyDown={ this._onContainerKeyDown }
                                           onChange={ this._onSearchTermChange }/>
        }
        {
          options.length ?
            <SelectOptionsList {...{
              highlighted: highlighted && highlighted.id,
              onSelect: this._onSelectOption,
              optionRenderer,
              options: this._getOptionsList(),
              value
            }}/>
            : (
            <span className={`${cssClassNameSelector}__status`}>
              { status }
            </span>
          )
        }
      </span>
    )
  }

  render() {
    const { layout: { width }, placeholder } = this.props
    const { disabled, dropdownOpened, error, value } = this.state
    const selectedOption = this._getOptionById(value)

    return (
      <span ref='selectContainer'
            className={ this._getSelectContainerClassName() }
            style={{ width }}
            disabled={ disabled }
            tabIndex='1'
            role='combobox'
            onClick={ this._onContainerClick }
            onKeyDown={ this._onContainerKeyDown }>
            <SelectSelection {...{
              clearable: this._isClearable(),
              onClearSelection: this._onClearSelection,
              placeholder,
              selection: selectedOption && selectedOption.text,
            }}/>
        { dropdownOpened && this._renderSelectDropdown() }
        <SelectError error={ error }/>
      </span>
    )
  }
}

export default provideClickOutside(Select)
