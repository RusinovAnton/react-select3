'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectOptionsList = require('./SelectOptionsList');

var _SelectOptionsList2 = _interopRequireDefault(_SelectOptionsList);

var _SelectSearchInput = require('./SelectSearchInput');

var _SelectSearchInput2 = _interopRequireDefault(_SelectSearchInput);

var _SelectStatus = require('./SelectStatus');

var _SelectStatus2 = _interopRequireDefault(_SelectStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectDropdown = function SelectDropdown(_ref) {
  var highlighted = _ref.highlighted,
      isPending = _ref.isPending,
      language = _ref.language,
      onKeyDown = _ref.onKeyDown,
      onSearchTermChange = _ref.onSearchTermChange,
      onSelect = _ref.onSelect,
      options = _ref.options,
      searchTerm = _ref.searchTerm,
      showSearch = _ref.showSearch,
      value = _ref.value;
  return _jsx('span', {
    className: 'PureReactSelect__dropdown'
  }, void 0, showSearch && _jsx(_SelectSearchInput2.default, {
    value: searchTerm,
    onKeyDown: onKeyDown,
    onChange: onSearchTermChange
  }), _react2.default.createElement(_SelectStatus2.default, { isPending: isPending, language: language }), !!options.length && _react2.default.createElement(_SelectOptionsList2.default, { options: options, value: value, highlighted: highlighted, onSelect: onSelect }));
};

exports.default = SelectDropdown;