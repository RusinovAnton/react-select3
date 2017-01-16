'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _hasValue = require('../utils/hasValue');

var _hasValue2 = _interopRequireDefault(_hasValue);

var _events = require('../utils/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectOptionsList = function SelectOptionsList(_ref) {
  var highlighted = _ref.highlighted,
      value = _ref.value,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? [] : _ref$options,
      onSelect = _ref.onSelect;

  var optionsList = options.map(function (_ref2, i) {
    var id = _ref2.id,
        text = _ref2.text,
        isHidden = _ref2.isHidden;

    if (isHidden) return null;

    var isSelected = (0, _hasValue2.default)(value) && value === id;
    var optionClassName = (0, _classnames2.default)('PureReactSelect__option', {
      'PureReactSelect__option--selected': isSelected,
      'PureReactSelect__option--highlighted': i === highlighted
    });

    var onOptionSelect = isSelected ? null : onSelect.bind(null, id);

    return _jsx('li', {
      className: optionClassName,
      onClick: (0, _events.stopPropagation)(onOptionSelect)
    }, id, text);
  });

  return _jsx('ul', {
    className: 'PureReactSelect__options-list'
  }, void 0, optionsList);
};

exports.default = SelectOptionsList;