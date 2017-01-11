import React, { Children, Component, PropTypes } from 'react'

import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import provideClickOutside from 'react-click-outside'
import uniqueId from 'lodash/uniqueId'
import { selectPropTypes } from '../shared/selectPropTypes'

import SelectDropdown from './SelectDropdown'
import SelectError from './SelectError'
import SelectSelection from './SelectSelection'


// @fixme TODO: uncontrollable value
// TODO: multiselect
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
            onSearchTermChange: PropTypes.func,
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
        options: null,
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
        value: null,
    })

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

        const { value, defaultValue, children, options } = props

        /**
         * @type {{
         *   dropdownOpened: boolean,
         *   highlight: *,
         *   isPending: boolean,
         *   options: array,
         *   searchShow: boolean,
         *   value: *,
         * }}
         */
        this.state = Object.assign(Select.initialState(), {
            options: this._setOptions(children, options),
            value: value || defaultValue,
        })
    }

    componentWillReceiveProps(newProps) {
        const { disabled, options, children, value } = newProps
        const isValueDefined = typeof value !== 'undefined'

        if (isValueDefined && typeof newProps.onSelect === 'undefined' && typeof this.props.onSelect === 'undefined') {
            console.error(`Warning: You\'re setting value for Select component throught props
                but not passing onSelect callback which can lead to unforeseen consequences(bugs).
                Please consider using onSelect callback or defaultValue instead of value`)
        }

        if (disabled) {
            this._closeDropdown()
        }

        this.setState((state) => ({
            disabled,
            options: this._setOptions(children, options),
            value: isValueDefined ? String(value) : state.value,
        }))
    }

    shouldComponentUpdate = ({ error, disabled, value, children }, nextState) => (
        error !== this.props.error
        || disabled !== this.props.disabled
        || value !== this.state.value
        || !isEqual(children, this.props.children)
        || !isEqual(nextState, this.state)
    )

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

        window.scrollTo(x, y)
        if (this.refs.selectContainer) {
            this.refs.selectContainer.focus()
        }
    }

    _setOptions = (children, options) => {
        let stateOptions = []

        if (Array.isArray(options) && options.length) {
            stateOptions = options.map(({ id, text }) => {
                if (typeof id === 'undefined' || typeof text === 'undefined') {
                    throw new Error('options array is not formatted properly, option object must have "id" and "text"');
                }

                return {
                    id: String(id),
                    text
                }
            })
        } else if (Children.count(children)) {
            stateOptions = Children.toArray(children)
                .filter(({ type }) => type === 'option')
                .map(({ props: { children: text, value: id } }) => ({ id: String(id), text }))
        }

        return stateOptions
    }

    /**
     * Returns option object from options array by given index
     * @param {number} index
     * @return {object} <option>
     * @private
     */
    _getOptionByIndex = index => {
        const { options } = this.state

        if (index > options.length || index < 0) {
            throw new Error('Invalid index provided')
        }

        return options[index]
    }

    _getOptionById = value => {
        const { options } = this.state

        if (options && options.length) {
            return options.find(({ id }) => id === value) // eslint-disable-line eqeqeq
        }

        return null
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
            ArrowUp: this._setHighlightedOption.bind(null, -1),
            ArrowDown: this._setHighlightedOption.bind(null, 1),
            Enter: this._selectHighlighted,
            ' ': this._selectHighlighted, // 'Space' key
            Escape: this._closeDropdown
        }

        const { key } = event

        if (!KEY_FUNTIONS[key]) return

        event.preventDefault()
        // Handle key click
        KEY_FUNTIONS[key]()
    }

    _onClearSelection = e => {
        if (e) {
            e.stopPropagation()
        }

        if (!this.state.disabled) {
            this._onSelect(null)
        }
    }

    _onSearchTermChange = term => {
        // TODO: request options from server
        // const { request } = this.props
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

        this.setState({ value }, () => {
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


    /**
     * Set next highlighted option via 'ArrowUp' or 'ArrowDown' key
     * @param {number} direction (can be -1 or 1)
     */
    _setHighlightedOption = direction => {
        const { options, disabled, highlighted, dropdownOpened } = this.state

        // do nothing if disabled or there are no options
        if (disabled || !options || !options.length) return

        const optionsLength = options.length - 1
        const nextHighlighted = (highlighted !== null) ?
        highlighted + direction
            : 0

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
            this.setState({
                dropdownOpened: true,
                highlighted: 0,
            })
        } else {
            // Select highlighted item
            this._onSelect(options[highlighted])
        }
    }

    _getSelectContainerClassName = () => {
        const {
            className,
            disabled,
            dropdownHorizontalPosition,
            dropdownVerticalPosition,
            error,
        } = this.props
        const {
            dropdownOpened,
            isPending,
        } = this.state

        return classNames('pure-react-select__container ' + (className || ''), {
            'pure-react-select__container--above': dropdownVerticalPosition === 'above',
            'pure-react-select__container--below': dropdownVerticalPosition !== 'above',
            'pure-react-select__container--disabled': disabled,
            'pure-react-select__container--error': error,
            'pure-react-select__container--left': dropdownHorizontalPosition !== 'right',
            'pure-react-select__container--open': dropdownOpened,
            'pure-react-select__container--pending': isPending,
            'pure-react-select__container--right': dropdownHorizontalPosition === 'right',
        })
    }

    _isClearable = () => {
        const { allowClear } = this.props
        const { value } = this.state

        return (allowClear && typeof value !== 'undefined' && value !== null)
    }

    render() {
        const {
            disabled,
            error,
            lang,
            layout: { width },
            placeholder,
            request,
            search,
        } = this.props
        const { dropdownOpened, highlighted, isPending, options, value } = this.state
        const selectedOption = this._getOptionById(value)
        const isSearchOnRequest = request && !request.once

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
                {
                    dropdownOpened ?
                        <SelectDropdown {...{
                            highlighted,
                            lang,
                            isPending,
                            onSearch: isSearchOnRequest ? this._onSearchTermChange : null,
                            onSelect: this._onSelectOption,
                            options,
                            search,
                            value,
                        }}/>
                        : <SelectError error={ error }/>
                }
             </span>
        )
    }
}

export default provideClickOutside(Select)
