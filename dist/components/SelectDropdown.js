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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectDropdown = function SelectDropdown(_ref) {
    var highlighted = _ref.highlighted,
        isPending = _ref.isPending,
        language = _ref.language,
        onSearchTermChange = _ref.onSearchTermChange,
        onSelect = _ref.onSelect,
        options = _ref.options,
        showSearch = _ref.showSearch,
        searchTerm = _ref.searchTerm,
        value = _ref.value;
    return _react2.default.createElement(
        'span',
        { className: 'pure-react-select__dropdown' },
        showSearch && _react2.default.createElement(_SelectSearchInput2.default, { value: searchTerm, onChange: onSearchTermChange }),
        isPending && !options.length ? language.isPending : _react2.default.createElement(_SelectOptionsList2.default, { options: options, value: value, highlighted: highlighted, onSelect: onSelect })
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