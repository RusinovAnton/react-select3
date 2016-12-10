'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectSelection = function SelectSelection(_ref) {
    var formatter = _ref.formatter,
        _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === undefined ? null : _ref$placeholder,
        value = _ref.value,
        _ref$data = _ref.data,
        data = _ref$data === undefined ? [] : _ref$data;


    var selection = null;

    var getSelection = function getSelection(value) {
        var valueObj = Object.assign({}, value);

        var selection = (0, _isFunction2.default)(formatter) ? formatter(valueObj) : valueObj.text;

        if (typeof selection === 'undefined') {
            throw new Error('Invalid value were provided');
        }

        return selection;
    };

    if (data.length) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {

            // If value object were provided
            selection = getSelection(value);
        } else if (typeof value === 'number' || typeof value === 'string') {

            // If id of value was given, find option object in the data array and get text from it
            selection = getSelection(data.find(function (_ref2) {
                var id = _ref2.id;
                return value.toString() === id.toString();
            }));
        }
    }

    return _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)('react-select__selection-node', {
                'react-select__selection--placeholder': !value
            }) },
        selection !== null ? selection : placeholder
    );
};

SelectSelection.propTypes = {
    data: _react.PropTypes.array,
    formatter: _react.PropTypes.func,
    placeholder: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    value: _react.PropTypes.any
};

exports.default = SelectSelection;