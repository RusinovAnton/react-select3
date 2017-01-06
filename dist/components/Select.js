'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectPropTypes = undefined;

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

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _SelectDropdown = require('./SelectDropdown');

var _SelectDropdown2 = _interopRequireDefault(_SelectDropdown);

var _SelectError = require('./SelectError');

var _SelectError2 = _interopRequireDefault(_SelectError);

var _SelectSelection = require('./SelectSelection');

var _SelectSelection2 = _interopRequireDefault(_SelectSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var selectPropTypes = exports.selectPropTypes = {
    optionId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    selection: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])
};

// @fixme TODO: uncontrollable value
// TODO: optgroups
// TODO: options & optgroups as children
// TODO: dissmissable
// TODO: lang module

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props, context) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context)); // eslint-disable-line consistent-return


        _initialiseProps.call(_this);

        var value = props.value,
            defaultValue = props.defaultValue,
            options = props.options;

        // Error if no options and no fetching provided 
        // if (!options.length) {
        //     throw new Error('There was no options provided.')
        // }

        // Validate value prop if defined

        if (typeof value !== 'undefined' && !_this._isValidValue(value)) {
            throw new Error('Provided value prop is invalid. Expected option\'s id');
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
        _this.state = Object.assign(Select.initialState(), { selectedOption: _this._getOptionById(value || defaultValue), options: options });
        return _this;
    }

    _createClass(Select, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var disabled = _ref.disabled,
                options = _ref.options,
                value = _ref.value;

            if (disabled) {
                this._closeDropdown();
            }

            this.setState({ disabled: disabled, options: options, value: value });
        }

        /**
         * Close SelectDropdown on click outside using 'react-click-outside' library
         */


        // value must be one of option's id


        /**
         * Handle keyboard controls
         * @param {object} event
         */


        /**
         * Setting selected value
         * @param {object} value - option object from data array
         */


        /**
         * Handle option selection via user click
         * @param {number} index - index of option item in the data array
         */


        /**
         * Set next highlighted option via 'ArrowUp' or 'ArrowDown' key
         * @param {number} direction (can be -1 or 1)
         */


        /**
         * Select current highlighted option
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                allowClear = _props.allowClear,
                error = _props.error,
                disabled = _props.disabled,
                placeholder = _props.placeholder,
                search = _props.search,
                lang = _props.lang,
                _props$layout = _props.layout,
                width = _props$layout.width,
                dropdownHorizontalPosition = _props$layout.dropdownHorizontalPosition,
                dropdownVerticalPosition = _props$layout.dropdownVerticalPosition,
                request = _props.request;
            var _state = this.state,
                dropdownOpened = _state.dropdownOpened,
                highlighted = _state.highlighted,
                isPending = _state.isPending,
                options = _state.options,
                selectedOption = _state.selectedOption;

            var clearable = allowClear && typeof selectedValue !== 'undefined' && selectedValue !== null;
            var selectContainerClassName = (0, _classnames2.default)('select react-select-container react-select-container--default', {
                'react-select-container--above': dropdownVerticalPosition === 'above',
                'react-select-container--below': !dropdownVerticalPosition || dropdownVerticalPosition === 'below',
                'react-select-container--disabled': disabled,
                'react-select-container--error has-error': error,
                'react-select-container--open': dropdownOpened,
                'react-select-container--right': dropdownHorizontalPosition === 'right'
            });
            var isSearchOnRequest = request && !request.once;

            return _react2.default.createElement(
                'span',
                { ref: 'selectContainer',
                    className: selectContainerClassName,
                    style: { width: width },
                    disabled: disabled,
                    tabIndex: '1',
                    role: 'combobox',
                    onClick: this._onContainerClick,
                    onKeyDown: this._onContainerKeyDown },
                _react2.default.createElement(_SelectSelection2.default, { clearable: clearable, selection: selectedOption.text, placeholder: placeholder, onClearSelection: this._onClearSelection }),
                dropdownOpened ? _react2.default.createElement(_SelectDropdown2.default, {
                    highlighted: highlighted,
                    lang: lang,
                    isPending: isPending,
                    onSearch: isSearchOnRequest ? this._onSearchTermChange : null,
                    onSelect: this._onSelectOption,
                    options: options,
                    search: search,
                    selectedOption: selectedOption
                }) : _react2.default.createElement(_SelectError2.default, { error: error })
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
     * Whether to focus itself on mount
     */
    autoFocus: _react.PropTypes.bool,
    defaultValue: selectPropTypes.optionId,
    disabled: _react.PropTypes.bool,
    /**
     * You can provide error message to display or just boolean to highlight select container with error styles
     */
    error: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
    lang: _react.PropTypes.object,
    layout: _react.PropTypes.shape({
        width: _react.PropTypes.string,
        /**
         * Defines whether SelectDropdown should be opened above or below the container.
         * default: 'below'
         */
        // TODO: define position automatically depends on SelectContainer position in the viewport
        dropdownVerticalPosition: _react.PropTypes.oneOf(['above', 'below']),
        dropdownHorizontalPosition: _react.PropTypes.oneOf(['left', 'right'])
    }),
    name: _react.PropTypes.string,
    /**
     * Provide needed options to fetch data from server by term query
     */
    /**
     * Array of option items
     */
    options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        id: selectPropTypes.optionId.isRequired,
        text: selectPropTypes.selection.isRequired
    })),
    // TODO: validate request object
    request: _react.PropTypes.shape({
        delay: _react.PropTypes.number, // default 3000
        endpoint: _react.PropTypes.string,
        once: _react.PropTypes.bool,
        params: _react.PropTypes.object,
        // function that creates standart shaped object { id: number|string, text: string|element } from response data
        responseDataFormatter: _react.PropTypes.func,
        termQuery: _react.PropTypes.string
    }),
    onSelect: _react.PropTypes.func,
    placeholder: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    search: _react.PropTypes.shape({
        minimumResults: _react.PropTypes.number
    }),
    /**
     * Value can be set by providing option id
     */
    value: selectPropTypes.optionId
};
Select.defaultProps = {
    allowClear: false,
    disabled: false,
    lang: {},
    layout: {
        dropdownHorizontalPosition: 'left',
        dropdownVerticalPosition: 'below',
        width: '245px'
    },
    name: (0, _uniqueId2.default)('reactSelect_'),
    options: [],
    search: {
        minimumResults: 20
    }
};

Select.initialState = function () {
    return {
        dropdownOpened: false,
        highlighted: null,
        isPending: false,
        options: [],
        searchShow: false,
        selectedOption: null
    };
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.shouldComponentUpdate = function (_ref2, nextState) {
        var error = _ref2.error,
            disabled = _ref2.disabled,
            options = _ref2.options,
            value = _ref2.value;
        return !(0, _isEqual2.default)(options, _this2.state.options) || error !== _this2.props.error || disabled !== _this2.state.disabled || value !== _this2.state.value || !(0, _isEqual2.default)(nextState, _this2.state);
    };

    this.componentDidMount = function () {
        if (_this2.props.autoFocus) {
            _this2._focusContainer();
        }
    };

    this.handleClickOutside = function () {
        _this2._closeDropdown();
    };

    this._closeDropdown = function () {
        _this2.setState({
            dropdownOpened: false,
            highlighted: null
        });
    };

    this._focusContainer = function () {
        var x = window.scrollX;
        var y = window.scrollY;

        _this2.refs.selectContainer.focus();
        window.scrollTo(x, y);
    };

    this._isValidValue = function (value) {
        return _this2.props.options.some(function (_ref3) {
            var id = _ref3.id;
            return value === id;
        });
    };

    this._getOptionByIndex = function (optionIndex) {
        var options = _this2.state.options;

        var index = parseInt(optionIndex, 10);

        if (index > options.length || index < 0) {
            throw new Error('Invalid index provided');
        }

        return options[index];
    };

    this._getOptionById = function (value) {
        return _this2.props.options.find(function (_ref4) {
            var id = _ref4.id;
            return id === value;
        }) || null;
    };

    this._onContainerClick = function () {
        _this2.setState(function (state) {
            var dropdownOpened = state.dropdownOpened,
                disabled = state.disabled;


            return disabled ? state : { dropdownOpened: !dropdownOpened };
        });
    };

    this._onContainerKeyDown = function (event) {
        if (_this2.props.disabled) return;

        var KEY_FUNTIONS = {
            ArrowUp: _this2._setHightlightedOption.bind(null, -1),
            ArrowDown: _this2._setHightlightedOption.bind(null, 1),
            Enter: _this2._selectHighlighted,
            // 'Space' key
            ' ': _this2._selectHighlighted,
            Escape: _this2._closeDropdown
        };

        var key = event.key;


        if (!KEY_FUNTIONS[key]) return;

        event.preventDefault();
        // Handle key click 
        KEY_FUNTIONS[key]();
    };

    this._onClearSelection = function (e) {
        e.stopPropagation();
        _this2._onSelect(null);
    };

    this._onSearchTermChange = function (term) {
        // TODO: request options from server
        // const { request } = this.props

        console.log(term);
    };

    this._onSelect = function (option) {
        var _props2 = _this2.props,
            name = _props2.name,
            onSelect = _props2.onSelect;
        // Setup structure of selection event

        var value = option ? option.id : null;
        var selectionEvent = {
            type: 'select',
            target: {
                name: name,
                option: option,
                value: value
            }
        };

        _this2.setState({ value: value });

        if ((0, _isFunction2.default)(onSelect)) {
            onSelect(selectionEvent);
        }

        _this2._closeDropdown();
        _this2._focusContainer();
    };

    this._onSelectOption = function (index) {
        // Get selected option and pass it into onSelect method for further processing
        var selectedOption = _this2._getOptionByIndex(index);

        _this2._onSelect(selectedOption);
    };

    this._setHightlightedOption = function (direction) {
        var _state2 = _this2.state,
            options = _state2.options,
            disabled = _state2.disabled,
            highlighted = _state2.highlighted,
            dropdownOpened = _state2.dropdownOpened;

        // do nothing if disabled or there are no options

        if (disabled || !options || !options.length) return;

        var optionsLength = options.length - 1;
        var nextHighlighted = highlighted ? highlighted + direction : 0;

        // TODO: scroll SelectDropdown block to show highlighted item when overflows
        // If dropdown not opened or there is no highlighted item yet
        if (!dropdownOpened || highlighted === null
        // highlight first option after click 'ArrowDown' on the last one
        || nextHighlighted > optionsLength) {
            _this2.setState({ highlighted: 0, dropdownOpened: true });
        } else if (nextHighlighted < 0) {
            // Highlight last option after click 'ArrowUp' on the first one
            _this2.setState({ highlighted: optionsLength });
        } else {
            // Highlight next option
            _this2.setState({ highlighted: nextHighlighted });
        }
    };

    this._selectHighlighted = function () {
        var _state3 = _this2.state,
            options = _state3.options,
            highlighted = _state3.highlighted,
            dropdownOpened = _state3.dropdownOpened;

        // If dropdown not opened or there is no highlighted item yet

        if (!dropdownOpened || highlighted === null) {

            // Open dropdown and hightlight first item
            _this2.setState({ dropdownOpened: true, highlighted: 0 });
        } else {
            // Select highlighted item
            _this2._onSelect(options[highlighted]);
        }
    };
};

exports.default = (0, _reactClickOutside2.default)(Select);