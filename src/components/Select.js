import React, { Component, PropTypes } from 'react'

import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import provideClickOutside from 'react-click-outside'

import SelectDropdown from './SelectDropdown'
import SelectFetchDropdown from './SelectFetchDropdown'
import SelectionArrow from './SelectionArrow'
import SelectionClear from './SelectionClear'
import SelectSelection from './SelectSelection'


// @fixme: hardcoded lang provider
const lang = {
    pending: 'Поиск...',
    // @fixme: hardcoded minlength
    minLength: 'Введите минимум 3 буквы',
    loading: 'Загрузка...',
    error: 'Не удалось получить данные!',
    empty: 'Ничего не найдено',
    emptyValue: '-',
}

const valuePropType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
])


// ROADMAP
// @fixme TODO: uncontrollable value
// TODO: optgroups
// TODO: options & optgroups as children
// TODO: pluggable lang provider
// TODO: docs
class Select extends Component {

    static propTypes = {
        /**
         * Whether allow user to clear select or not
         */
        allowClear: PropTypes.bool,
        /**
         * Array of option items
         */
        data: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.arrayOf(PropTypes.object),
        ]),
        /**
         * formats incoming data to get needed format { id: <Number>, text: <String> }
         * @param data item
         */
        dataFormatter: PropTypes.func,
        /**
         * Provide needed options to fetch data from server by term query
         */
        // TODO: validate request object
        request: PropTypes.shape({
            delay: PropTypes.number,
            endpoint: PropTypes.string,
            once: PropTypes.bool,
            params: PropTypes.object,
            /**
             * Set headers for json fetching
             */
            headers: PropTypes.object,
            responseDataFormatter: PropTypes.func,
            termQuery: PropTypes.string,
        }),
        options: PropTypes.shape({
            placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            width: PropTypes.string,
            minimumResultsForSearch: PropTypes.number,
            /**
             * Defines whether SelectDropdown should be opened above or below the container.
             * default: 'below'
             */
            // TODO: define position automatically depends on SelectContainer position in the viewport
            dropdownVerticalPosition: PropTypes.oneOf(['above', 'below']),
            dropdownHorizontalPosition: PropTypes.oneOf(['left', 'right'])
        }),
        /**
         * You can provide error message to display or just boolean to highlight error
         */
        error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        disabled: PropTypes.bool,
        name: PropTypes.string,
        onSelect: PropTypes.func,
        /**
         * Formats selected value to display
         * @param {object} value
         */
        selectionFormatter: PropTypes.func,
        /**
         * Value can be set by providing option id
         */
        value: valuePropType,
        defaultValue: valuePropType,
    }

    static defaultProps = {
        allowClear: false,
        options: {}
    }

    constructor(props, context) { // eslint-disable-line consistent-return
        super(props, context)
        const { value, defaultValue, data } = props

        // Validate data object
        if (typeof data !== 'undefined' && !Array.isArray(data)) {
            throw new Error('Provided data prop is invalid. Expected an array of option items')
        }

        // Validate value prop
        if (!!value && !(typeof value !== 'number' || typeof value !== 'string')) {
            throw new Error('Provided value prop is invalid. Expected option id or option text')
        }

        // Keep ref for incoming data array
        this._initialData = data

        // @fixme
        // setup initial state object
        this._initialState = {
            value: value || defaultValue,
            data: data && this.getOptionsData(data),
            highlighted: null,
            dropdownOpened: false,
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

    static childContextTypes = {
        lang: PropTypes.object,
    }

    getChildContext = () => ({ lang })

    componentWillReceiveProps({ data, value }) {
        const { request } = this.props
        const state = Object.assign({}, this._initialState, { value: this.state.value, data: this.state.data })
        let willUpdate = false

        // Set new data if update
        if (data && data !== this._initialData) {
            // Set new data as initial
            this._initialData = data
            state.data = this.getOptionsData(data)

            willUpdate = true
        }

        // Set new value if updated
        if (!!value && value !== this.state.value) {
            state.value = value

            willUpdate = true
        } else if (value === null) {
            state.value = null
            if (request && !request.once) {
                state.data = null
            }

            willUpdate = true
        }

        // null for reseting the value
        if (willUpdate) {
            this.setState(state)
        }
    }

    shouldComponentUpdate = ({ data, disabled, value, error }, nextState) => (
    data !== this._initialData
    || error !== this.props.error
    || disabled !== this.state.disabled
    || value !== this.state.value
    || !isEqual(nextState, this.state))

    /**
     * Process data which passed through props
     * @param {array} data
     * @return {*}
     */
    getOptionsData = data => {

        const { dataFormatter: formatter } = this.props

        if (!data.length) {
            return []
        }

        if (isFunction(formatter)) {
            return data.map(formatter)
        }

        // If options are strings
        if (data
                .reduce((result, dataItem) =>
                    result
                    && (typeof dataItem === 'number'
                    || typeof dataItem === 'string'),
                    true)
        ) {
            return data.map(option => ({
                id: option,
                text: option
            }))
        }

        return data
    }

    getOptionByIndex = dataIndex => {
        const { data } = this.state
        const index = parseInt(dataIndex, 10)

        if (index > data.length || index < 0) {
            throw new Error('Invalid index provided')
        }

        return data[index]
    }

    focusContainer = () => {
        const x = window.scrollX
        const y = window.scrollY

        this.selectContainer.focus()
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
        if (!data || !data.length) return
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
        if (!this.state.dropdownOpened) return
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
                value: value ? value.id : null,
                valueText: value ? value.text : null,
                valueObj: value
            }
        }

        this.setState({ value: value ? Object.assign({}, value) : null })

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

    onClearSelection = (e) => {
        e.stopPropagation()
        this.onSelect(null)
    }

    onGettingData = data => {
        this.setState({ data: this.getOptionsData(data) })
    }

    render() {
        const {
            allowClear,
            error,
            disabled,
            options,
            options: { dropdownHorizontalPosition, dropdownVerticalPosition },
            request,
            selectionFormatter
        } = this.props
        const { data, dropdownOpened, highlighted, value } = this.state
        const clearIconVisible = (allowClear && typeof value !== 'undefined' && value !== null)

        const containerClassName = classNames('select react-select-container react-select-container--default', {
            'react-select-container--open': dropdownOpened,
            'react-select-container--disabled': disabled,
            'react-select-container--clearable': allowClear,
            'react-select-container--error': error,
            'react-select-container--right': dropdownHorizontalPosition === 'right',
            'has-error': error,
            'react-select-container--above': dropdownVerticalPosition === 'above',
            'react-select-container--below': !dropdownVerticalPosition || dropdownVerticalPosition === 'below'
        })

        const containerRef = node => { this.selectContainer = node }

        return (
            <span className={ containerClassName }
                  style={{ width: options.width || '245px' }}
                  disabled={ disabled }>
                <span ref={ containerRef }
                      className='react-select__selection react-select-selection--single'
                      tabIndex='1'
                      disabled={ disabled }
                      onClick={ !disabled && this.onContainerClick }
                      onKeyDown={   !disabled && this.onContainerKeyDown }
                      role='combobox'>
                  <SelectSelection {...{
                      value,
                      data,
                      placeholder: options.placeholder,
                      formatter: selectionFormatter
                  }}/>
                    { clearIconVisible && <SelectionClear onClearSelection={ this.onClearSelection }/> }
                    <SelectionArrow/>
                </span>
                { request && request.endpoint ?
                    (<SelectFetchDropdown onGettingData={this.onGettingData}
                                          onSelect={ this.onSelectOption }
                                          {...{
                                              data,
                                              highlighted,
                                              request,
                                              value,
                                              dropdownOpened,
                                              onContainerKeyDown: this.onContainerKeyDown
                                          }}/>)
                    : (<SelectDropdown searchShow={ data && data.length >= options.minimumResultsForSearch }
                                       onSelect={ this.onSelectOption }
                                       {...{
                                           data,
                                           highlighted,
                                           value,
                                           dropdownOpened,
                                           onContainerKeyDown: this.onContainerKeyDown
                                       }}/>)
                }
                { typeof error === 'string' && <span className='help-block'>{ error }</span> }
      </span>
        )
    }


}

export default provideClickOutside(Select)
