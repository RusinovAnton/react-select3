'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('../utils/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectSelection = function SelectSelection(_ref, _ref2) {
  var _classNames;

  var clearable = _ref.clearable,
      _ref$selection = _ref.selection,
      selection = _ref$selection === undefined ? null : _ref$selection,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? null : _ref$placeholder,
      onClearSelection = _ref.onClearSelection;
  var cssClassNameSelector = _ref2.cssClassNameSelector;
  return _react2.default.createElement(
    'span',
    { className: (0, _classnames2.default)(cssClassNameSelector + '__selection', (_classNames = {}, _defineProperty(_classNames, cssClassNameSelector + '__selection--placeholder', !selection), _defineProperty(_classNames, cssClassNameSelector + '__selection--clearable', clearable), _classNames)) },
    _react2.default.createElement(
      'span',
      { className: cssClassNameSelector + '__selection-text' },
      selection || placeholder
    ),
    clearable && _react2.default.createElement(
      'span',
      { className: cssClassNameSelector + '__clear-selection',
        role: 'presentation',
        onClick: (0, _events.stopPropagation)(onClearSelection) },
      '\xD7'
    ),
    _react2.default.createElement(
      'span',
      { className: cssClassNameSelector + '__selection-arrow', role: 'presentation' },
      _react2.default.createElement('i', null)
    )
  );
};

SelectSelection.contextTypes = {
  cssClassNameSelector: _react.PropTypes.string
};

SelectSelection.propTypes = {
  clearable: _react.PropTypes.bool,
  onClearSelection: _react.PropTypes.func,
  placeholder: _react.PropTypes.string,
  selection: _react.PropTypes.string
};

exports.default = SelectSelection;