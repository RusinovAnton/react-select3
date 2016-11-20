"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectSearchInput = function SelectSearchInput() {
  return _react2.default.createElement(
    "span",
    { className: "react-select-search react-select-search--dropdown react-select-search--hide" },
    _react2.default.createElement("input", {
      className: "react-select-search__field",
      type: "search",
      tabIndex: "0",
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: "false",
      role: "textbox" })
  );
};

exports.default = SelectSearchInput;