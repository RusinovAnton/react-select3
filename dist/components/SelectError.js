'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectError = function SelectError(_ref, _ref2) {
  var error = _ref.error;
  var cssClassNameSelector = _ref2.cssClassNameSelector;

  if (typeof error !== 'string') return null;

  return _react2.default.createElement(
    'span',
    { className: cssClassNameSelector + '__error' },
    error
  );
};

SelectError.contextTypes = {
  cssClassNameSelector: _react.PropTypes.string
};

SelectError.propTypes = {
  error: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string])
};

exports.default = SelectError;