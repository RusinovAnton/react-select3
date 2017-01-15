'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectStatus = function SelectStatus(_ref) {
    var language = _ref.language,
        isPending = _ref.isPending;

    if (!isPending) return null;

    return _react2.default.createElement(
        'span',
        { className: 'PureReactSelect__status' },
        language.isPending
    );
};

SelectStatus.propTypes = {
    isPending: _react.PropTypes.bool.isRequired,
    language: _react.PropTypes.object.isRequired
};

exports.default = SelectStatus;