'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SelectSearchInput = require('./SelectSearchInput');

var _SelectSearchInput2 = _interopRequireDefault(_SelectSearchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectDropdown = function SelectDropdown(props) {
  var data = props.data,
      value = props.value,
      highlighted = props.highlighted,
      searchShow = props.searchShow,
      onSelect = props.onSelect;

  // @fixme: provide templating

  var optionsList = data.map(function (_ref, i) {
    var id = _ref.id,
        text = _ref.text;
    return _react2.default.createElement(
      'li',
      { key: i,
        className: (0, _classnames2.default)('react-select-results__option', {
          'react-select-results--selected': !!value && value.id === id,
          'react-select-results__option--highlighted': i === highlighted
        }),
        'data-id': id,
        'data-index': i,
        onClick: onSelect },
      text
    );
  });

  return _react2.default.createElement(
    'span',
    { className: 'dropdown-wrapper' },
    _react2.default.createElement(
      'span',
      { className: 'react-select-dropdown' },
      searchShow && _react2.default.createElement(_SelectSearchInput2.default, null),
      _react2.default.createElement(
        'span',
        { className: 'react-select-results' },
        _react2.default.createElement(
          'ul',
          { className: 'react-select-results__options' },
          optionsList
        )
      )
    )
  );
};

SelectDropdown.propTypes = {
  data: _react.PropTypes.array,
  value: _react.PropTypes.object,
  highlighted: _react.PropTypes.number,
  searchShow: _react.PropTypes.bool,
  onSelect: _react.PropTypes.func
};

exports.default = SelectDropdown;