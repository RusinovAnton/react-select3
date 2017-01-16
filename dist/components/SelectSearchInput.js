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

var inArray = exports.inArray = function inArray(item, array) {
  return array.indexOf(item) !== -1;
};
var allowedKeysArray = ['ArrowUp', 'ArrowDown', 'Escape'];

var SelectSearchInput = function SelectSearchInput(props) {
  // TODO: close dropdown on esc click when SearchInput focused
  var filterKeyDowns = function filterKeyDowns(e) {
    if (inArray(e.key, allowedKeysArray)) {
      props.onKeyDown(e);
    }
  };

  return _jsx('span', {
    className: 'PureReactSelect__search'
  }, void 0, _react2.default.createElement('input', _extends({ className: 'PureReactSelect__search-field',
    type: 'search',
    tabIndex: '0',
    autoFocus: true,
    autoComplete: 'off',
    autoCorrect: 'off',
    autoCapitalize: 'off',
    spellCheck: 'false',
    role: 'textbox',
    onKeyDown: filterKeyDowns,
    onClick: (0, _events.stopPropagation)()
  }, props)));
};

exports.default = SelectSearchInput;