'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('../utils/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref3 = _jsx('i', {});

var SelectSelection = function SelectSelection(_ref, _ref2) {
  var _classNames;

  var clearable = _ref.clearable,
      _ref$selection = _ref.selection,
      selection = _ref$selection === undefined ? null : _ref$selection,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? null : _ref$placeholder,
      onClearSelection = _ref.onClearSelection;
  var cssClassNameSelector = _ref2.cssClassNameSelector;
  return _jsx('span', {
    className: (0, _classnames2.default)(cssClassNameSelector + '__selection', (_classNames = {}, _defineProperty(_classNames, cssClassNameSelector + '__selection--placeholder', !selection), _defineProperty(_classNames, cssClassNameSelector + '__selection--clearable', clearable), _classNames))
  }, void 0, _jsx('span', {
    className: cssClassNameSelector + '__selection-text'
  }, void 0, selection || placeholder), clearable && _jsx('span', {
    className: cssClassNameSelector + '__clear-selection',
    role: 'presentation',
    onClick: (0, _events.stopPropagation)(onClearSelection)
  }, void 0, '\xD7'), _jsx('span', {
    className: cssClassNameSelector + '__selection-arrow',
    role: 'presentation'
  }, void 0, _ref3));
};

SelectSelection.contextTypes = {
  cssClassNameSelector: _react.PropTypes.string
};

exports.default = SelectSelection;