'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectPropTypes = undefined;

var _react = require('react');

var selectPropTypes = exports.selectPropTypes = {
    optionId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    selection: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])
};