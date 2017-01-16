'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectOptionsList = require('./SelectOptionsList');

var _SelectOptionsList2 = _interopRequireDefault(_SelectOptionsList);

var _SelectSearchInput = require('./SelectSearchInput');

var _SelectSearchInput2 = _interopRequireDefault(_SelectSearchInput);

var _SelectStatus = require('./SelectStatus');

var _SelectStatus2 = _interopRequireDefault(_SelectStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectDropdown = function SelectDropdown(_ref) {
  var highlighted = _ref.highlighted,
      isPending = _ref.isPending,
      language = _ref.language,
      onKeyDown = _ref.onKeyDown,
      onSearchTermChange = _ref.onSearchTermChange,
      onSelect = _ref.onSelect,
      optionRenderer = _ref.optionRenderer,
      options = _ref.options,
      searchTerm = _ref.searchTerm,
      showSearch = _ref.showSearch,
      value = _ref.value;
  return _react2.default.createElement(
    'span',
    { className: 'PureReactSelect__dropdown' },
    showSearch && _react2.default.createElement(_SelectSearchInput2.default, { value: searchTerm, onKeyDown: onKeyDown, onChange: onSearchTermChange }),
    _react2.default.createElement(_SelectStatus2.default, { isPending: isPending, language: language }),
    !!options.length && _react2.default.createElement(_SelectOptionsList2.default, { highlighted: highlighted, onSelect: onSelect, optionRenderer: optionRenderer, options: options, value: value })
  );
};

SelectDropdown.propTypes = {
  highlighted: _react.PropTypes.number,
  isPending: _react.PropTypes.bool,
  language: _react.PropTypes.object.isRequired,
  onSearchTermChange: _react.PropTypes.func.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  options: _react.PropTypes.array.isRequired,
  searchTerm: _react.PropTypes.string,
  showSearch: _react.PropTypes.bool.isRequired,
  value: _react.PropTypes.string
};

exports.default = SelectDropdown;