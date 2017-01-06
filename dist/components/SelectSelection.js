'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
    { className: 'react-select__selection react-select-selection--single' },
    _react2.default.createElement(
      'span',
      { className: (0, _classnames2.default)('react-select__selection-node', {
          'react-select__selection--placeholder': !selection
        }) },
      selection || placeholder
    ),
    clearable && _react2.default.createElement(
      'span',
      { className: 'react-select-selection__clear',
        role: 'presentation',
        onClick: onClearSelection },
      '\xD7'
    ),
    _react2.default.createElement(
      'span',
      { className: 'react-select-selection__arrow', role: 'presentation' },
      _react2.default.createElement('b', null)
    )
  );
};

SelectSelection.propTypes = {
  clearable: _react.PropTypes.bool,
  onClearSelection: _react.PropTypes.func,
  placeholder: _Select.selectPropTypes.selection,
  selection: _Select.selectPropTypes.selection
};

exports.default = SelectSelection;