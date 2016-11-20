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

var _SelectionArrow = require('./SelectionArrow');

var _SelectionArrow2 = _interopRequireDefault(_SelectionArrow);

var _SelectDropdown = require('./SelectDropdown');

var _SelectDropdown2 = _interopRequireDefault(_SelectDropdown);

var _SelectSelection = require('./SelectSelection');

var _SelectSelection2 = _interopRequireDefault(_SelectSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: optgroups
// TODO: options & optgroups as children
var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props, context) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context)); // eslint-disable-line consistent-return


    _initialiseProps.call(_this);

    var value = props.value,
        data = props.data,
        disabled = props.disabled;

    // Validate data object

    if (!Array.isArray(data)) {
      throw new Error('Provided data prop is invalid. Expected an array of option items');
    }

    // Validate value prop
    if (!!value && !(typeof value !== 'number' || typeof value !== 'string')) {
      throw new Error('Provided value prop is invalid. Expected option id or option text');
    }

    // Keep ref for incoming data array
    _this._initialData = data;

    // setup initial state object
    _this._initialState = {
      value: value,
      data: _this.getOptionsData(data),
      disabled: disabled,
      highlighted: null,
      dropdownOpened: false,
      // TODO: make search happen
      searchShow: false
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
          disabled = _ref.disabled,
          value = _ref.value;

      var state = Object.assign({}, this._initialState, { value: this.state.value });
      var willUpdate = false;

      // Set new disabled prop if updated
      if (disabled !== this.state.disabled) {
        state.disabled = disabled;

        willUpdate = true;
      }

      // Set new data if update
      if (data !== this._initialData) {
        // Set new data as initial
        this._initialData = data;
        state.data = this.getOptionsData(data);

        willUpdate = true;
      }

      // Set new value if updated
      // null for reseting the value
      if ((!!value || value === null) && value !== this.state.value) {
        state.value = value;

        willUpdate = true;
      }

      // Rerender if any updates occur
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
          error = _props.error,
          options = _props.options,
          dropdownPosition = _props.dropdownPosition;
      var _state = this.state,
          data = _state.data,
          disabled = _state.disabled,
          dropdownOpened = _state.dropdownOpened,
          highlighted = _state.highlighted,
          value = _state.value;


      var containerClassName = (0, _classnames2.default)('select react-select-container react-select-container--default', {
        'react-select-container--open': dropdownOpened,
        'react-select-container--disabled': disabled,
        'react-select-container--error': error,
        'react-select-container--above': dropdownPosition === 'above',
        'react-select-container--below': !dropdownPosition || dropdownPosition === 'below'
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
            onClick: this.onContainerClick,
            onKeyDown: this.onContainerKeyDown,
            role: 'combobox' },
          _react2.default.createElement(_SelectSelection2.default, { data: data, value: value, placeholder: options.placeholder }),
          _react2.default.createElement(_SelectionArrow2.default, null)
        ),
        dropdownOpened && _react2.default.createElement(_SelectDropdown2.default, _extends({ searchShow: data.length >= options.minimumResultsForSearch || options.ajax,
          onSelect: this.onSelectOption
        }, { data: data, highlighted: highlighted }))
      );
    }
  }]);

  return Select;
}(_react.Component);

Select.propTypes = {
  /**
   * Array of option items
   */
  data: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.arrayOf(_react.PropTypes.shape({
    id: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    text: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
  }))]),
  /**
   * Defines whether SelectDropdown should be opened above or below the container.
   * default: 'below'
   */
  // TODO: define position automatically depends on SelectContainer position in the viewport
  dropdownPosition: _react.PropTypes.oneOf(['above', 'below']),
  // TODO: fetch options from server by term query
  ajax: _react.PropTypes.object,
  options: _react.PropTypes.shape({
    placeholder: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    width: _react.PropTypes.string,
    minimumResultsForSearch: _react.PropTypes.number
  }),
  /**
   * You can provide error message to display or just boolean to highlight error
   */
  error: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
  disabled: _react.PropTypes.bool,
  name: _react.PropTypes.string,
  onSelect: _react.PropTypes.func,
  /**
   * Value can be set by providing option id
   */
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};
Select.defaultProps = {
  options: {}
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.shouldComponentUpdate = function (_ref2, nextState) {
    var data = _ref2.data,
        disabled = _ref2.disabled,
        value = _ref2.value;
    return data !== _this2._initialData || disabled !== _this2.state.disabled || value !== _this2.state.value || !(0, _isEqual2.default)(nextState, _this2.state);
  };

  this.getOptionsData = function (data) {
    if (!data.length) {
      return [];
    }

    // If options are objects {id: <id>, text: <optionLabel>}
    if (data.reduce(function (result, dataItem) {
      return result && typeof dataItem.id !== 'undefined' && typeof dataItem.text !== 'undefined';
    }, true)) {
      return data;
    }

    // If options are simply text
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

    throw _this2.exceptions.invalidDataProvided;
  };

  this.getOptionByIndex = function (index) {
    var data = _this2.state.data;


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
        value: value.id,
        valueText: value.text
      }
    };

    _this2.setState({ value: value.id });

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
};

exports.default = (0, _reactClickOutside2.default)(Select);