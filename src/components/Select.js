import React, { Component, PropTypes } from 'react'

import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import provideClickOutside from 'react-click-outside'
import uniqueId from 'lodash/uniqueId'

import SelectDropdown from './SelectDropdown'
import SelectError from './SelectError'
import SelectSelection from './SelectSelection'


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

// @fixme TODO: uncontrollable value
// TODO: optgroups
// TODO: options & optgroups as children
// TODO: dissmissable
// TODO: lang module
class Select extends Component {
    static propTypes = {
        /**
         * Whether allow user to clear select or not
         */
        allowClear: PropTypes.bool,
        /**
         * Whether to focus itself on mount
         */
        autoFocus: PropTypes.bool,
        defaultValue: selectPropTypes.optionId,
        disabled: PropTypes.bool,
        /**
         * You can provide error message to display or just boolean to highlight select container with error styles
         */
        error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        lang: PropTypes.object,
        layout: PropTypes.shape({
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
         * Provide needed options to fetch data from server by term query
         */
        /**
         * Array of option items
         */
        options: PropTypes.arrayOf(PropTypes.shape({
            id: selectPropTypes.optionId.isRequired,
            text: selectPropTypes.selection.isRequired,
        })),
        // TODO: validate request object
        request: PropTypes.shape({
            delay: PropTypes.number, // default 3000
            endpoint: PropTypes.string,
            once: PropTypes.bool,
            params: PropTypes.object,
            // function that creates standart shaped object { id: number|string, text: string|element } from response data
            responseDataFormatter: PropTypes.func,
            termQuery: PropTypes.string,
        }),
        onSelect: PropTypes.func,
        placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        search: PropTypes.shape({
            minimumResults: PropTypes.number,
        }),
        /**
         * Value can be set by providing option id
         */
        value: selectPropTypes.optionId,
    }

    static defaultProps = {
        allowClear: false,
        disabled: false,
        lang: {},
        layout: {
            dropdownHorizontalPosition: 'left',
            dropdownVerticalPosition: 'below',
            width: '245px',
        },
        name: uniqueId('reactSelect_'),
        options: [],
        search: {
            minimumResults: 20,
        },
    }

    static initialState = () => ({
        dropdownOpened: false,
        highlighted: null,
        isPending: false,
        options: [],
        searchShow: false,
        selectedOption: null,
    })

    constructor(props, context) { // eslint-disable-line consistent-return
        super(props, context)

        const { value, defaultValue, options } = props

        // Error if no options and no fetching provided 
        // if (!options.length) {
        //     throw new Error('There was no options provided.')
        // }

        // Validate value prop if defined
        if (typeof value !== 'undefined' && !this._isValidValue(value)) {
            throw new Error('Provided value prop is invalid. Expected option\'s id')
        }

        /**
         * @type {{
         *   dropdownOpened: boolean,
         *   highlight: *,
         *   isPending: boolean,
         *   searchShow: boolean,
         *   options: array,
         *   value: *,
         * }}
         */
        this.state = Object.assign(Select.initialState(), { selectedOption: this._getOptionById(value || defaultValue), options })
    }

    componentWillReceiveProps({ disabled, options, value }) {
        if (disabled) {
            this._closeDropdown()
        }

        this.setState({ disabled, options, value })
    }

    shouldComponentUpdate = ({ error, disabled, options, value }, nextState) =>
        !isEqual(options, this.state.options) || error !== this.props.error || disabled !== this.state.disabled || value !== this.state.value || !isEqual(nextState, this.state)

    componentDidMount = () => {
        if (this.props.autoFocus) {
            this._focusContainer()
        }
    }

    /**
     * Close SelectDropdown on click outside using 'react-click-outside' library
     */
    handleClickOutside = () => {
        this._closeDropdown()
    }

    _closeDropdown = () => {
        this.setState({
            dropdownOpened: false,
            highlighted: null
        })
    }

    _focusContainer = () => {
        const x = window.scrollX
        const y = window.scrollY

        this.refs.selectContainer.focus()
        window.scrollTo(x, y)
    }

    // value must be one of option's id
    _isValidValue = value => this.props.options.some(({ id }) => value === id)

    _getOptionByIndex = optionIndex => {
        const { options } = this.state
        const index = parseInt(optionIndex, 10)

        if (index > options.length || index < 0) {
            throw new Error('Invalid index provided')
        }

        return options[index]
    }

    _getOptionById = value => {
        return this.props.options.find(({ id }) => id === value) || null
    }

    _onContainerClick = () => {
        this.setState(state => {
            const { dropdownOpened, disabled } = state

            return disabled ? state : ({ dropdownOpened: !dropdownOpened })
        })
    }

    /**
     * Handle keyboard controls
     * @param {object} event
     */
    _onContainerKeyDown = event => {
        if (this.props.disabled) return

        const KEY_FUNTIONS = {
            ArrowUp: this._setHightlightedOption.bind(null, -1),
            ArrowDown: this._setHightlightedOption.bind(null, 1),
            Enter: this._selectHighlighted,
            // 'Space' key
            ' ': this._selectHighlighted,
            Escape: this._closeDropdown
        }

        const { key } = event

        if (!KEY_FUNTIONS[key]) return

        event.preventDefault()
            // Handle key click 
        KEY_FUNTIONS[key]()
    }

    _onClearSelection = (e) => {
        e.stopPropagation()
        this._onSelect(null)
    }

    _onSearchTermChange = term => {
        // TODO: request options from server
        // const { request } = this.props

        console.log(term)
    }

    /**
     * Setting selected value
     * @param {object} value - option object from data array
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

        this.setState({ value })

        if (isFunction(onSelect)) {
            onSelect(selectionEvent)
        }

        this._closeDropdown()
        this._focusContainer()
    }

    /**
     * Handle option selection via user click
     * @param {number} index - index of option item in the data array
     */
    _onSelectOption = index => {
        // Get selected option and pass it into onSelect method for further processing
        const selectedOption = this._getOptionByIndex(index)

        this._onSelect(selectedOption)
    }


    /**
     * Set next highlighted option via 'ArrowUp' or 'ArrowDown' key
     * @param {number} direction (can be -1 or 1)
     */
    _setHightlightedOption = direction => {
        const { options, disabled, highlighted, dropdownOpened } = this.state

        // do nothing if disabled or there are no options
        if (disabled || !options || !options.length) return

        const optionsLength = options.length - 1
        const nextHighlighted = highlighted ? highlighted + direction : 0

        // TODO: scroll SelectDropdown block to show highlighted item when overflows
        // If dropdown not opened or there is no highlighted item yet
        if (!dropdownOpened || highlighted === null
            // highlight first option after click 'ArrowDown' on the last one
            || nextHighlighted > optionsLength) {
            this.setState({ highlighted: 0, dropdownOpened: true })
        } else if (nextHighlighted < 0) {
            // Highlight last option after click 'ArrowUp' on the first one
            this.setState({ highlighted: optionsLength })
        } else {
            // Highlight next option
            this.setState({ highlighted: nextHighlighted })
        }
    }

    /**
     * Select current highlighted option
     */
    _selectHighlighted = () => {
        const { options, highlighted, dropdownOpened } = this.state

        // If dropdown not opened or there is no highlighted item yet
        if (!dropdownOpened || highlighted === null) {

            // Open dropdown and hightlight first item
            this.setState({ dropdownOpened: true, highlighted: 0 })
        } else {
            // Select highlighted item
            this._onSelect(options[highlighted])
        }
    }

    render() {
        const {
            allowClear,
            error,
            disabled,
            placeholder,
            search,
            lang,
            layout: { width, dropdownHorizontalPosition, dropdownVerticalPosition },
            request,
        } = this.props
        const { dropdownOpened, highlighted, isPending, options, selectedOption } = this.state
        const clearable = (allowClear && typeof selectedValue !== 'undefined' && selectedValue !== null)
        const selectContainerClassName = classNames('select react-select-container react-select-container--default', {
            'react-select-container--above': dropdownVerticalPosition === 'above',
            'react-select-container--below': !dropdownVerticalPosition || dropdownVerticalPosition === 'below',
            'react-select-container--disabled': disabled,
            'react-select-container--error has-error': error,
            'react-select-container--open': dropdownOpened,
            'react-select-container--right': dropdownHorizontalPosition === 'right',
        })
        const isSearchOnRequest = request && !request.once

        return ( 
            <span ref='selectContainer'
                  className={ selectContainerClassName }
                  style={{ width }}
                  disabled={ disabled }
                  tabIndex='1'
                  role='combobox'
                  onClick={ this._onContainerClick }
                  onKeyDown={ this._onContainerKeyDown }>
                <SelectSelection {... { clearable, selection: selectedOption.text, placeholder, onClearSelection: this._onClearSelection } } /> 
                {
                    dropdownOpened ?
                        <SelectDropdown {... {
                            highlighted,
                            lang,
                            isPending,
                            onSearch: isSearchOnRequest ? this._onSearchTermChange : null,
                            onSelect: this._onSelectOption,
                            options,
                            search,
                            selectedOption,
                        }} />
                        : <SelectError error={ error } />
                }
             </span>
        )
    }
}

export default provideClickOutside(Select)
