"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectionArrow = function SelectionArrow() {
  return _react2.default.createElement(
    "span",
    { className: "react-select-selection__arrow", role: "presentation" },
    _react2.default.createElement("b", null)
  );
};

exports.default = SelectionArrow;