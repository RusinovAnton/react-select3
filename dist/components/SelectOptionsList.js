'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _events = require('../utils/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectOptionsList = function SelectOptionsList(_ref, _ref2) {
  var highlighted = _ref.highlighted,
      value = _ref.value,
      optionRenderer = _ref.optionRenderer,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? [] : _ref$options,
      onSelect = _ref.onSelect;
  var cssClassNameSelector = _ref2.cssClassNameSelector;

  var optionsList = options.map(function (_ref3) {
    var _classNames;

    var id = _ref3.id,
        text = _ref3.text,
        isHidden = _ref3.isHidden;

    var optionText = text;

    if ((0, _isFunction2.default)(optionRenderer)) {
      optionText = optionRenderer({ id: id, text: text, isHidden: isHidden });
    } else if (isHidden) {
      return null;
    }

    var isSelected = !(0, _isNil2.default)(value) && value === id;
    var optionClassName = (0, _classnames2.default)(cssClassNameSelector + '__option', (_classNames = {}, _defineProperty(_classNames, cssClassNameSelector + '__option--selected', isSelected), _defineProperty(_classNames, cssClassNameSelector + '__option--highlighted', id === highlighted), _classNames));

    var onOptionSelect = isSelected ? null : onSelect.bind(null, id);

    return _jsx('li', {
      'data-id': id,
      className: optionClassName,
      onClick: (0, _events.stopPropagation)(onOptionSelect)
    }, id, optionText);
  });

  return _jsx('ul', {
    className: cssClassNameSelector + '__options-list'
  }, void 0, optionsList);
};

SelectOptionsList.contextTypes = {
  cssClassNameSelector: _react.PropTypes.string
};

exports.default = SelectOptionsList;