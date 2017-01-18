'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

    return _react2.default.createElement(
      'li',
      { key: id,
        'data-id': id,
        className: optionClassName,
        onClick: (0, _events.stopPropagation)(onOptionSelect) },
      optionText
    );
  });

  return _react2.default.createElement(
    'ul',
    { className: cssClassNameSelector + '__options-list' },
    optionsList
  );
};

SelectOptionsList.contextTypes = {
  cssClassNameSelector: _react.PropTypes.string
};

SelectOptionsList.propTypes = {
  highlighted: _react.PropTypes.string,
  onSelect: _react.PropTypes.func.isRequired,
  optionRenderer: _react.PropTypes.func,
  options: _react.PropTypes.array.isRequired,
  value: _react.PropTypes.string
};

exports.default = SelectOptionsList;