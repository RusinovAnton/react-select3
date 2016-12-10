'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SelectSearchInput = function SelectSearchInput(_ref) {
    var onTermChange = _ref.onTermChange,
        inputProps = _objectWithoutProperties(_ref, ['onTermChange']);

    return (
        // TODO: close dropdown on esc click when SearchInput focused
        _react2.default.createElement(
            'span',
            { className: 'react-select-search react-select-search--dropdown' },
            _react2.default.createElement('input', _extends({ className: 'react-select-search__field',
                type: 'search',
                tabIndex: '0',
                autoFocus: true,
                autoComplete: 'off',
                autoCorrect: 'off',
                autoCapitalize: 'off',
                spellCheck: 'false',
                role: 'textbox'
            }, inputProps, {
                onChange: onTermChange }))
        )
    );
};

SelectSearchInput.propTypes = {
    onTermChange: _react2.default.PropTypes.func
};

exports.default = SelectSearchInput;