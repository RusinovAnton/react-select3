"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectionClear = function SelectionClear(_ref) {
    var onClearSelection = _ref.onClearSelection;
    return _react2.default.createElement(
        "span",
        { className: "react-select-selection__clear",
            role: "presentation",
            onClick: onClearSelection },
        "\xD7"
    );
};

SelectionClear.propTypes = {
    onClearSelection: _react.PropTypes.func.isRequired
};

exports.default = SelectionClear;