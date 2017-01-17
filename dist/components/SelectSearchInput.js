'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inArray = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _events = require('../utils/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var inArray = exports.inArray = function inArray(item, array) {
  return array.indexOf(item) !== -1;
};
var allowedKeysArray = ['Escape'];

var SelectSearchInput = function SelectSearchInput(_ref, // eslint-disable-line no-unused-vars
_ref2) {
  var cssClassNameSelector = _ref2.cssClassNameSelector;

  var onClick = _ref.onClick,
      onKeyDown = _ref.onKeyDown,
      isPending = _ref.isPending,
      props = _objectWithoutProperties(_ref, ['onClick', 'onKeyDown', 'isPending']);

  var filterKeyDowns = function filterKeyDowns(e) {
    if (inArray(e.key, allowedKeysArray)) {
      onKeyDown(e);
    }
  };

  return _jsx('span', {
    className: cssClassNameSelector + '__search'
  }, void 0, _react2.default.createElement('input', _extends({ className: cssClassNameSelector + '__search-field',
    autoFocus: true,
    autoComplete: 'off',
    autoCorrect: 'off',
    autoCapitalize: 'off',
    spellCheck: 'false',
    onKeyDown: filterKeyDowns,
    onClick: (0, _events.stopPropagation)()
  }, props)));
};

SelectSearchInput.contextTypes = {
  cssClassNameSelector: _react.PropTypes.string
};

exports.default = SelectSearchInput;