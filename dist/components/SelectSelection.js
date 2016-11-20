'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectSelection = function SelectSelection(_ref) {
  var data = _ref.data,
      placeholder = _ref.placeholder,
      value = _ref.value;


  var selection = placeholder || null;

  // @fixme: provide custom templating
  if (!value) {
    // ...
  } else if (typeof value === 'string' || typeof value === 'number') {

    // Find selected option by id
    selection = data.find(function (option) {
      return value.toString() === option.id.toString();
    }).text;
  } else {
    throw new Error('Provided value is not valid. Expected to get id of the data object');
  }

  return _react2.default.createElement(
    'span',
    { className: (0, _classnames2.default)('react-select__selection-node', {
        'react-select__selection--placeholder': !value
      }) },
    selection
  );
};

SelectSelection.propTypes = {
  data: _react.PropTypes.array,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  placeholder: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])
};

exports.default = SelectSelection;