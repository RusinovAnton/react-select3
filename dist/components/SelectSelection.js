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

var SelectSelection = function SelectSelection(_ref) {
  var clearable = _ref.clearable,
      _ref$selection = _ref.selection,
      selection = _ref$selection === undefined ? null : _ref$selection,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? null : _ref$placeholder,
      onClearSelection = _ref.onClearSelection;
  return _react2.default.createElement(
    'span',
    { className: (0, _classnames2.default)('PureReactSelect__selection', {
        'PureReactSelect__selection--placeholder': !selection,
        'PureReactSelect__selection--clearable': clearable
      }) },
    _react2.default.createElement(
      'span',
      { className: 'PureReactSelect__selection-text' },
      selection || placeholder
    ),
    clearable && _react2.default.createElement(
      'span',
      { className: 'PureReactSelect__clear-selection',
        role: 'presentation',
        onClick: (0, _events.stopPropagation)(onClearSelection) },
      '\xD7'
    ),
    _react2.default.createElement(
      'span',
      { className: 'PureReactSelect__selection-arrow', role: 'presentation' },
      _react2.default.createElement('i', null)
    )
  );
};

SelectSelection.propTypes = {
  clearable: _react.PropTypes.bool,
  onClearSelection: _react.PropTypes.func,
  placeholder: _react.PropTypes.string,
  selection: _react.PropTypes.string
};

exports.default = SelectSelection;