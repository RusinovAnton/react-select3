'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _SelectDropdown = require('./SelectDropdown');

var _SelectDropdown2 = _interopRequireDefault(_SelectDropdown);

var _SelectFetchDropdown = require('./SelectFetchDropdown');

var _SelectFetchDropdown2 = _interopRequireDefault(_SelectFetchDropdown);

var _SelectionArrow = require('./SelectionArrow');

var _SelectionArrow2 = _interopRequireDefault(_SelectionArrow);

var _SelectionClear = require('./SelectionClear');

var _SelectionClear2 = _interopRequireDefault(_SelectionClear);

var _SelectSelection = require('./SelectSelection');

var _SelectSelection2 = _interopRequireDefault(_SelectSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// @fixme: hardcoded lang provider
var lang = {
    pending: 'Поиск...',
    // @fixme: hardcoded minlength
    minLength: 'Введите минимум 3 буквы',
    loading: 'Загрузка...',
    error: 'Не удалось получить данные!',
    empty: 'Ничего не найдено',
    emptyValue: '-'
};

var valuePropType = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.shape({
    id: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    text: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
})]);

// @fixme TODO: uncontrollable value
// TODO: optgroups
// TODO: options & optgroups as children
// TODO: dissmissable

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props, context) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context)); // eslint-disable-line consistent-return


        _initialiseProps.call(_this);

        var value = props.value,
            defaultValue = props.defaultValue,
            data = props.data;

        // Validate data object

        if (typeof data !== 'undefined' && !Array.isArray(data)) {
            throw new Error('Provided data prop is invalid. Expected an array of option items');
        }

        // Validate value prop
        if (!!value && !(typeof value !== 'number' || typeof value !== 'string')) {
            throw new Error('Provided value prop is invalid. Expected option id or option text');
        }

        // Keep ref for incoming data array
        _this._initialData = data;

        // @fixme
        // setup initial state object
        _this._initialState = {
            value: value || defaultValue,
            data: data && _this.getOptionsData(data),
            highlighted: null,
            dropdownOpened: false
        };

        /**
         * @type {{
        *   value: *,
        *   data: object,
        *   disabled: boolean,
        *   dropdownOpened: boolean,
        *   searchShow: boolean
        * }}
         */
        _this.state = Object.assign({}, _this._initialState);
        return _this;
    }

    _createClass(Select, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var data = _ref.data,
                value = _ref.value;
            var request = this.props.request;

            var state = Object.assign({}, this._initialState, { value: this.state.value, data: this.state.data });
            var willUpdate = false;

            // Set new data if update
            if (data && data !== this._initialData) {
                // Set new data as initial
                this._initialData = data;
                state.data = this.getOptionsData(data);

                willUpdate = true;
            }

            // Set new value if updated
            if (!!value && value !== this.state.value) {
                state.value = value;

                willUpdate = true;
            } else if (value === null) {
                state.value = null;
                if (request && !request.once) {
                    state.data = null;
                }

                willUpdate = true;
            }

            // null for reseting the value
            if (willUpdate) {
                this.setState(state);
            }
        }

        /**
         * Process data which passed through props
         * @param {array} data
         * @return {*}
         */


        /**
         * Set next highlighted option via 'ArrowUp' or 'ArrowDown' key
         * @param {number} direction (can be -1 or 1)
         */


        /**
         * Select current highlighted option via 'Space' or 'Enter' key
         */


        /**
         * Handle keyboard controls
         * @param {object} event
         */


        /**
         * Close SelectDropdown on click outside using 'react-click-outside' library
         */


        /**
         * Setting selected value
         * @param {object} value - option object from data array
         */


        /**
         * Handle option selection via user click
         * @param {number} index - index of option item in the data array
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                allowClear = _props.allowClear,
                error = _props.error,
                disabled = _props.disabled,
                options = _props.options,
                _props$options = _props.options,
                dropdownHorizontalPosition = _props$options.dropdownHorizontalPosition,
                dropdownVerticalPosition = _props$options.dropdownVerticalPosition,
                request = _props.request,
                selectionFormatter = _props.selectionFormatter;
            var _state = this.state,
                data = _state.data,
                dropdownOpened = _state.dropdownOpened,
                highlighted = _state.highlighted,
                value = _state.value;

            var clearIconVisible = allowClear && typeof value !== 'undefined' && value !== null;

            var containerClassName = (0, _classnames2.default)('select react-select-container react-select-container--default', {
                'react-select-container--open': dropdownOpened,
                'react-select-container--disabled': disabled,
                'react-select-container--error': error,
                'react-select-container--right': dropdownHorizontalPosition === 'right',
                'has-error': error,
                'react-select-container--above': dropdownVerticalPosition === 'above',
                'react-select-container--below': !dropdownVerticalPosition || dropdownVerticalPosition === 'below'
            });

            return _react2.default.createElement(
                'span',
                { className: containerClassName,
                    style: { width: options.width || '245px' },
                    disabled: disabled },
                _react2.default.createElement(
                    'span',
                    { ref: 'selectContainer',
                        className: 'react-select__selection react-select-selection--single',
                        tabIndex: '1',
                        disabled: disabled,
                        onClick: !disabled && this.onContainerClick,
                        onKeyDown: !disabled && this.onContainerKeyDown,
                        role: 'combobox' },
                    _react2.default.createElement(_SelectSelection2.default, { value: value, data: data, placeholder: options.placeholder, formatter: selectionFormatter }),
                    clearIconVisible && _react2.default.createElement(_SelectionClear2.default, { onClearSelection: this.onClearSelection }),
                    _react2.default.createElement(_SelectionArrow2.default, null)
                ),
                request && request.endpoint ? _react2.default.createElement(_SelectFetchDropdown2.default, _extends({ onGettingData: this.onGettingData,
                    onSelect: this.onSelectOption
                }, {
                    data: data,
                    highlighted: highlighted,
                    request: request,
                    value: value,
                    dropdownOpened: dropdownOpened,
                    onContainerKeyDown: this.onContainerKeyDown
                })) : _react2.default.createElement(_SelectDropdown2.default, _extends({ searchShow: data && data.length >= options.minimumResultsForSearch,
                    onSelect: this.onSelectOption
                }, {
                    data: data,
                    highlighted: highlighted,
                    value: value,
                    dropdownOpened: dropdownOpened,
                    onContainerKeyDown: this.onContainerKeyDown
                })),
                typeof error === 'string' && _react2.default.createElement(
                    'span',
                    { className: 'help-block' },
                    error
                )
            );
        }
    }]);

    return Select;
}(_react.Component);

Select.propTypes = {
    /**
     * Whether allow user to clear select or not
     */
    allowClear: _react.PropTypes.bool,
    /**
     * Array of option items
     */
    data: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.arrayOf(_react.PropTypes.object)]),
    /**
     * formats incoming data to get needed format { id: <Number>, text: <String> }
     * @param data item
     */
    dataFormatter: _react.PropTypes.func,
    /**
     * Provide needed options to fetch data from server by term query
     */
    // TODO: validate request object
    request: _react.PropTypes.shape({
        delay: _react.PropTypes.number,
        endpoint: _react.PropTypes.string,
        once: _react.PropTypes.bool,
        params: _react.PropTypes.object,
        responseDataFormatter: _react.PropTypes.func,
        termQuery: _react.PropTypes.string
    }),
    options: _react.PropTypes.shape({
        placeholder: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
        width: _react.PropTypes.string,
        minimumResultsForSearch: _react.PropTypes.number,
        /**
         * Defines whether SelectDropdown should be opened above or below the container.
         * default: 'below'
         */
        // TODO: define position automatically depends on SelectContainer position in the viewport
        dropdownVerticalPosition: _react.PropTypes.oneOf(['above', 'below']),
        dropdownHorizontalPosition: _react.PropTypes.oneOf(['left', 'right'])
    }),
    /**
     * You can provide error message to display or just boolean to highlight error
     */
    error: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
    disabled: _react.PropTypes.bool,
    name: _react.PropTypes.string,
    onSelect: _react.PropTypes.func,
    /**
     * Formats selected value to display
     * @param {object} value
     */
    selectionFormatter: _react.PropTypes.func,
    /**
     * Value can be set by providing option id
     */
    value: valuePropType,
    defaultValue: valuePropType
};
Select.defaultProps = {
    allowClear: false,
    options: {}
};
Select.childContextTypes = {
    lang: _react.PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.getChildContext = function () {
        return { lang: lang };
    };

    this.shouldComponentUpdate = function (_ref2, nextState) {
        var data = _ref2.data,
            disabled = _ref2.disabled,
            value = _ref2.value,
            error = _ref2.error;
        return data !== _this2._initialData || error !== _this2.props.error || disabled !== _this2.state.disabled || value !== _this2.state.value || !(0, _isEqual2.default)(nextState, _this2.state);
    };

    this.getOptionsData = function (data) {
        var formatter = _this2.props.dataFormatter;


        if (!data.length) {
            return [];
        }

        if ((0, _isFunction2.default)(formatter)) {
            return data.map(formatter);
        }

        // If options are strings
        if (data.reduce(function (result, dataItem) {
            return result && (typeof dataItem === 'number' || typeof dataItem === 'string');
        }, true)) {
            return data.map(function (option) {
                return {
                    id: option,
                    text: option
                };
            });
        }

        return data;
    };

    this.getOptionByIndex = function (dataIndex) {
        var data = _this2.state.data;

        var index = parseInt(dataIndex, 10);

        if (index > data.length || index < 0) {
            throw new Error('Invalid index provided');
        }

        return data[index];
    };

    this.focusContainer = function () {
        var x = window.scrollX;
        var y = window.scrollY;

        _this2.refs.selectContainer.focus();
        window.scrollTo(x, y);
    };

    this.onContainerClick = function () {

        if (_this2.state.disabled) {
            _this2.setState({ dropdownOpened: false });
            return;
        }

        _this2.setState({ dropdownOpened: !_this2.state.dropdownOpened });
    };

    this.setHightlightedOption = function (direction) {
        var _state2 = _this2.state,
            data = _state2.data,
            highlighted = _state2.highlighted,
            dropdownOpened = _state2.dropdownOpened;

        if (!data || !data.length) return;
        var dataLength = data.length - 1;
        var nextHighlighted = highlighted + direction;

        // If dropdown not opened or there is no highlighted item yet
        if (!dropdownOpened || highlighted === null
        // highlight first option after click 'ArrowDown' on the last one
        || nextHighlighted > dataLength) {
            _this2.setState({ highlighted: 0, dropdownOpened: true });
            return;
        }

        // Highlight last option after click 'ArrowUp' on the first one
        if (nextHighlighted < 0) {
            _this2.setState({ highlighted: dataLength });
            return;
        }

        // Highlight next option
        _this2.setState({ highlighted: nextHighlighted });
    };

    this.selectHighlighted = function () {
        var _state3 = _this2.state,
            data = _state3.data,
            highlighted = _state3.highlighted,
            dropdownOpened = _state3.dropdownOpened;

        // If dropdown not opened or there is no highlighted item yet

        if (!dropdownOpened || highlighted === null) {

            // Open dropdown and hightlight first item
            _this2.setState({ dropdownOpened: true, highlighted: 0 });
            return;
        }

        // Select highlighted item
        _this2.onSelect(data[highlighted]);
    };

    this.onContainerKeyDown = function (event) {
        var KEYS = {
            ArrowUp: _this2.setHightlightedOption.bind(null, -1),
            ArrowDown: _this2.setHightlightedOption.bind(null, 1),
            Enter: _this2.selectHighlighted,
            // 'Space' key
            ' ': _this2.selectHighlighted,
            Escape: _this2.closeDropdown
        };
        // TODO: scroll SelectDropdown block to show highlighted item when overflows
        var key = event.key;

        // Do nothing if other key is being clicked
        if (!KEYS[key]) return;

        event.preventDefault();
        // Handle key click
        KEYS[key]();
    };

    this.handleClickOutside = function () {
        _this2.closeDropdown();
    };

    this.closeDropdown = function () {
        _this2.setState({
            dropdownOpened: false,
            highlighted: null
        });
    };

    this.onSelect = function (value) {
        var _props2 = _this2.props,
            name = _props2.name,
            onSelect = _props2.onSelect;

        // Setup structure of selection event

        var selectionEvent = {
            type: 'select',
            target: {
                name: name,
                value: value ? value.id : null,
                valueText: value ? value.text : null,
                valueObj: value
            }
        };

        _this2.setState({ value: value ? Object.assign({}, value) : null });

        if ((0, _isFunction2.default)(onSelect)) {
            onSelect(selectionEvent);
        }

        _this2.closeDropdown();
        _this2.focusContainer();
    };

    this.onSelectOption = function (_ref3) {
        var index = _ref3.target.dataset.index;


        // Get selected option and pass it into onSelect method for further processing
        var selectedOption = _this2.getOptionByIndex(index);
        _this2.onSelect(selectedOption);
    };

    this.onClearSelection = function (e) {
        e.stopPropagation();
        _this2.onSelect(null);
    };

    this.onGettingData = function (data) {
        _this2.setState({ data: _this2.getOptionsData(data) });
    };
};

exports.default = (0, _reactClickOutside2.default)(Select);