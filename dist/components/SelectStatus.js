'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectStatus = function SelectStatus(_ref, _ref2) {
  var language = _ref.language,
      isPending = _ref.isPending;
  var cssClassNameSelector = _ref2.cssClassNameSelector;

  if (isPending) {
    return _react2.default.createElement(
      'span',
      { className: cssClassNameSelector + '__status' },
      language.isPending
    );
  }

  return null;
};

SelectStatus.contextTypes = {
  cssClassNameSelector: _react.PropTypes.string
};

SelectStatus.propTypes = {
  isPending: _react.PropTypes.bool.isRequired,
  language: _react.PropTypes.object.isRequired
};

exports.default = SelectStatus;