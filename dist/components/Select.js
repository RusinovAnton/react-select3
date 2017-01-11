'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _selectPropTypes = require('../shared/selectPropTypes');

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

// @fixme TODO: uncontrollable value
// TODO: multiselect
// TODO: optgroups
// TODO: options & optgroups as children
// TODO: dissmissable
// TODO: lang module
var Select = function (_Component) {
    _inherits(Select, _Component);

    _createClass(Select, [{
        key: 'clear',
        value: function clear() {
            this._onClearSelection();
        }
    }, {
        key: 'selectNode',
        get: function get() {
            return this.refs.selectContainer;
        }
    }, {
        key: 'value',
        get: function get() {
            var selectedOption = this.state.selectedOption;


            return selectedOption ? selectedOption.id : null;
        }
    }, {
        key: 'options',
        get: function get() {
            return this.state.options;
        }
    }]);

    function Select(props, context) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context)); // eslint-disable-line consistent-return


        _initialiseProps.call(_this);

        var value = props.value,
            defaultValue = props.defaultValue,
            children = props.children,
            options = props.options;

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

        _this.state = Object.assign(Select.initialState(), {
            options: _this._setOptions(children, options),
            value: value || defaultValue
        });
        return _this;
    }

    _createClass(Select, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var _this2 = this;

            var disabled = newProps.disabled,
                options = newProps.options,
                children = newProps.children,
                value = newProps.value;

            var isValueDefined = typeof value !== 'undefined';

            if (isValueDefined && typeof newProps.onSelect === 'undefined' && typeof this.props.onSelect === 'undefined') {
                console.error('Warning: You\'re setting value for Select component throught props\n                but not passing onSelect callback which can lead to unforeseen consequences(bugs).\n                Please consider using onSelect callback or defaultValue instead of value');
            }

            if (disabled) {
                this._closeDropdown();
            }

            this.setState(function (state) {
                return {
                    disabled: disabled,
                    options: _this2._setOptions(children, options),
                    value: isValueDefined ? String(value) : state.value
                };
            });
        }

        /**
         * Close SelectDropdown on click outside using 'react-click-outside' library
         */


        /**
         * Returns option object from options array by given index
         * @param {number} index
         * @return {object} <option>
         * @private
         */


        /**
         * Handle keyboard controls
         * @param {object} event
         */


        /**
         * Setting selected value
         * @param {object} option - option object from data array
         */


        /**
         * Handle option selection via user click
         * @param {number} id - options id
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
                disabled = _props.disabled,
                error = _props.error,
                lang = _props.lang,
                width = _props.layout.width,
                placeholder = _props.placeholder,
                request = _props.request,
                search = _props.search;
            var _state = this.state,
                dropdownOpened = _state.dropdownOpened,
                highlighted = _state.highlighted,
                isPending = _state.isPending,
                options = _state.options,
                value = _state.value;

            var selectedOption = this._getOptionById(value);
            var isSearchOnRequest = request && !request.once;

            return _react2.default.createElement(
                'span',
                { ref: 'selectContainer',
                    className: this._getSelectContainerClassName(),
                    style: { width: width },
                    disabled: disabled,
                    tabIndex: '1',
                    role: 'combobox',
                    onClick: this._onContainerClick,
                    onKeyDown: this._onContainerKeyDown },
                _react2.default.createElement(_SelectSelection2.default, {
                    clearable: this._isClearable(),
                    onClearSelection: this._onClearSelection,
                    placeholder: placeholder,
                    selection: selectedOption && selectedOption.text
                }),
                dropdownOpened ? _react2.default.createElement(_SelectDropdown2.default, {
                    highlighted: highlighted,
                    lang: lang,
                    isPending: isPending,
                    onSearch: isSearchOnRequest ? this._onSearchTermChange : null,
                    onSelect: this._onSelectOption,
                    options: options,
                    search: search,
                    value: value
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
    defaultValue: _selectPropTypes.selectPropTypes.optionId,
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
        id: _selectPropTypes.selectPropTypes.optionId.isRequired,
        text: _selectPropTypes.selectPropTypes.selection.isRequired
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
        minimumResults: _react.PropTypes.number,
        onSearchTermChange: _react.PropTypes.func
    }),
    /**
     * Value can be set by providing option id
     */
    value: _selectPropTypes.selectPropTypes.optionId
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
    options: null,
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
        value: null
    };
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.shouldComponentUpdate = function (_ref, nextState) {
        var error = _ref.error,
            disabled = _ref.disabled,
            value = _ref.value,
            children = _ref.children;
        return error !== _this3.props.error || disabled !== _this3.props.disabled || value !== _this3.state.value || !(0, _isEqual2.default)(children, _this3.props.children) || !(0, _isEqual2.default)(nextState, _this3.state);
    };

    this.componentDidMount = function () {
        if (_this3.props.autoFocus) {
            _this3._focusContainer();
        }
    };

    this.handleClickOutside = function () {
        _this3._closeDropdown();
    };

    this._closeDropdown = function () {
        _this3.setState({
            dropdownOpened: false,
            highlighted: null
        });
    };

    this._focusContainer = function () {
        var x = window.scrollX;
        var y = window.scrollY;

        window.scrollTo(x, y);
        if (_this3.refs.selectContainer) {
            _this3.refs.selectContainer.focus();
        }
    };

    this._setOptions = function (children, options) {
        var stateOptions = [];

        if (Array.isArray(options) && options.length) {
            stateOptions = options.map(function (_ref2) {
                var id = _ref2.id,
                    text = _ref2.text;

                if (typeof id === 'undefined' || typeof text === 'undefined') {
                    throw new Error('options array is not formatted properly, option object must have "id" and "text"');
                }

                return {
                    id: String(id),
                    text: text
                };
            });
        } else if (_react.Children.count(children)) {
            stateOptions = _react.Children.toArray(children).filter(function (_ref3) {
                var type = _ref3.type;
                return type === 'option';
            }).map(function (_ref4) {
                var _ref4$props = _ref4.props,
                    text = _ref4$props.children,
                    id = _ref4$props.value;
                return { id: String(id), text: text };
            });
        }

        return stateOptions;
    };

    this._getOptionByIndex = function (index) {
        var options = _this3.state.options;


        if (index > options.length || index < 0) {
            throw new Error('Invalid index provided');
        }

        return options[index];
    };

    this._getOptionById = function (value) {
        var options = _this3.state.options;


        if (options && options.length) {
            return options.find(function (_ref5) {
                var id = _ref5.id;
                return id === value;
            }); // eslint-disable-line eqeqeq
        }

        return null;
    };

    this._onContainerClick = function () {
        _this3.setState(function (state) {
            var dropdownOpened = state.dropdownOpened,
                disabled = state.disabled;


            return disabled ? state : { dropdownOpened: !dropdownOpened };
        });
    };

    this._onContainerKeyDown = function (event) {
        if (_this3.props.disabled) return;

        var KEY_FUNTIONS = {
            ArrowUp: _this3._setHighlightedOption.bind(null, -1),
            ArrowDown: _this3._setHighlightedOption.bind(null, 1),
            Enter: _this3._selectHighlighted,
            ' ': _this3._selectHighlighted, // 'Space' key
            Escape: _this3._closeDropdown
        };

        var key = event.key;


        if (!KEY_FUNTIONS[key]) return;

        event.preventDefault();
        // Handle key click
        KEY_FUNTIONS[key]();
    };

    this._onClearSelection = function (e) {
        if (e) {
            e.stopPropagation();
        }

        if (!_this3.state.disabled) {
            _this3._onSelect(null);
        }
    };

    this._onSearchTermChange = function (term) {}
    // TODO: request options from server
    // const { request } = this.props
    ;

    this._onSelect = function (option) {
        var _props2 = _this3.props,
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

        _this3.setState({ value: value }, function () {
            if ((0, _isFunction2.default)(onSelect)) {
                onSelect(selectionEvent);
            }
        });

        _this3._closeDropdown();
        _this3._focusContainer();
    };

    this._onSelectOption = function (id) {
        // Get selected option and pass it into onSelect method for further processing
        var selectedOption = _this3._getOptionById(id);

        _this3._onSelect(selectedOption);
    };

    this._setHighlightedOption = function (direction) {
        var _state2 = _this3.state,
            options = _state2.options,
            disabled = _state2.disabled,
            highlighted = _state2.highlighted,
            dropdownOpened = _state2.dropdownOpened;

        // do nothing if disabled or there are no options

        if (disabled || !options || !options.length) return;

        var optionsLength = options.length - 1;
        var nextHighlighted = highlighted !== null ? highlighted + direction : 0;

        // TODO: scroll SelectDropdown block to show highlighted item when overflows
        // If dropdown not opened or there is no highlighted item yet
        if (!dropdownOpened || highlighted === null
        // highlight first option after click 'ArrowDown' on the last one
        || nextHighlighted > optionsLength) {
            _this3.setState({ highlighted: 0, dropdownOpened: true });
        } else if (nextHighlighted < 0) {
            // Highlight last option after click 'ArrowUp' on the first one
            _this3.setState({ highlighted: optionsLength });
        } else {
            // Highlight next option
            _this3.setState({ highlighted: nextHighlighted });
        }
    };

    this._selectHighlighted = function () {
        var _state3 = _this3.state,
            options = _state3.options,
            highlighted = _state3.highlighted,
            dropdownOpened = _state3.dropdownOpened;

        // If dropdown not opened or there is no highlighted item yet

        if (!dropdownOpened || highlighted === null) {
            // Open dropdown and hightlight first item
            _this3.setState({
                dropdownOpened: true,
                highlighted: 0
            });
        } else {
            // Select highlighted item
            _this3._onSelect(options[highlighted]);
        }
    };

    this._getSelectContainerClassName = function () {
        var _props3 = _this3.props,
            className = _props3.className,
            disabled = _props3.disabled,
            dropdownHorizontalPosition = _props3.dropdownHorizontalPosition,
            dropdownVerticalPosition = _props3.dropdownVerticalPosition,
            error = _props3.error;
        var _state4 = _this3.state,
            dropdownOpened = _state4.dropdownOpened,
            isPending = _state4.isPending;


        return (0, _classnames2.default)('pure-react-select__container ' + (className || ''), {
            'pure-react-select__container--above': dropdownVerticalPosition === 'above',
            'pure-react-select__container--below': dropdownVerticalPosition !== 'above',
            'pure-react-select__container--disabled': disabled,
            'pure-react-select__container--error': error,
            'pure-react-select__container--left': dropdownHorizontalPosition !== 'right',
            'pure-react-select__container--open': dropdownOpened,
            'pure-react-select__container--pending': isPending,
            'pure-react-select__container--right': dropdownHorizontalPosition === 'right'
        });
    };

    this._isClearable = function () {
        var allowClear = _this3.props.allowClear;
        var value = _this3.state.value;


        return allowClear && typeof value !== 'undefined' && value !== null;
    };
};

exports.default = (0, _reactClickOutside2.default)(Select);