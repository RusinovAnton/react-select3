'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (val) {
  if (!(0, _isNil2.default)(val)) {
    return String(val);
  }

  return val;
};