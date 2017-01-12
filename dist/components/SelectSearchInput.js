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

var inArray = exports.inArray = function inArray(item, array) {
    return array.indexOf(item) !== -1;
};
var allowedKeysArray = ['ArrowUp', 'ArrowDown', 'Escape'];

var SelectSearchInput = function SelectSearchInput(props) {
    // TODO: close dropdown on esc click when SearchInput focused
    var filterKeyDowns = function filterKeyDowns(e) {
        if (inArray(e.key, allowedKeysArray)) {
            props.onKeyDown(e);
        }
    };

    return _react2.default.createElement(
        'span',
        { className: 'pure-react-select__search' },
        _react2.default.createElement('input', _extends({ className: 'pure-react-select__search-field',
            type: 'search',
            tabIndex: '0',
            autoFocus: true,
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false',
            role: 'textbox',
            onKeyDown: filterKeyDowns,
            onClick: (0, _events.stopPropagation)()
        }, props))
    );
};

exports.default = SelectSearchInput;