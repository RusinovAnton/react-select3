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

var LANG_DEFAULT = {
    empty: 'Ничего не найдено',
    emptyValue: '-',
    error: 'Не удалось получить данные!',
    loading: 'Загрузка...',
    // @fixme: hardcoded minlength
    minLength: 'Введите минимум 3 буквы',
    pending: 'Поиск...'
};

var SelectDropdown = function SelectDropdown(_ref) {
    var highlighted = _ref.highlighted,
        isPending = _ref.isPending,
        lang = _ref.lang,
        onSearchTermChange = _ref.onSearchTermChange,
        onSelect = _ref.onSelect,
        options = _ref.options,
        requestSearch = _ref.requestSearch,
        search = _ref.search,
        searchTerm = _ref.searchTerm,
        value = _ref.value;

    var language = Object.assign({}, LANG_DEFAULT, lang);
    var showSearch = requestSearch || search.minimumResults <= options.length;

    return _react2.default.createElement(
        'span',
        { className: 'pure-react-select__dropdown' },
        showSearch && _react2.default.createElement(_SelectSearchInput2.default, { value: searchTerm, onChange: onSearchTermChange }),
        isPending && !options.length ? 'Loading...' : _react2.default.createElement(_SelectOptionsList2.default, { options: options, value: value, highlighted: highlighted, onSelect: onSelect })
    );
};

SelectDropdown.propTypes = {
    highlighted: _react.PropTypes.number,
    isPending: _react.PropTypes.bool,
    lang: _react.PropTypes.object,
    onSearch: _react.PropTypes.func,
    onSelect: _react.PropTypes.func.isRequired,
    options: _react.PropTypes.array.isRequired,
    requestSearch: _react.PropTypes.bool,
    search: _react.PropTypes.object.isRequired,
    value: _react.PropTypes.string
};

exports.default = SelectDropdown;