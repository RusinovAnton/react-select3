'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inArray = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _events = require('../utils/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var inArray = exports.inArray = function inArray(item, array) {
  return array.indexOf(item) !== -1;
};
var allowedKeysArray = ['Escape'];

var SelectSearchInput = function SelectSearchInput(_ref, // eslint-disable-line no-unused-vars
_ref2) {
  var cssClassNameSelector = _ref2.cssClassNameSelector;

  var onClick = _ref.onClick,
      onKeyDown = _ref.onKeyDown,
      isPending = _ref.isPending,
      props = _objectWithoutProperties(_ref, ['onClick', 'onKeyDown', 'isPending']);

  var filterKeyDowns = function filterKeyDowns(e) {
    if (inArray(e.key, allowedKeysArray)) {
      onKeyDown(e);
    }
  };

  return _react2.default.createElement(
    'span',
    { className: cssClassNameSelector + '__search' },
    _react2.default.createElement('input', _extends({ className: cssClassNameSelector + '__search-field',
      autoFocus: true,
      autoComplete: 'off',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      spellCheck: 'false',
      onKeyDown: filterKeyDowns,
      onClick: (0, _events.stopPropagation)()
    }, props))
  );
};

SelectSearchInput.propTypes = {
  isPending: _react.PropTypes.bool.isRequired
};

SelectSearchInput.contextTypes = {
  cssClassNameSelector: _react.PropTypes.string
};

exports.default = SelectSearchInput;