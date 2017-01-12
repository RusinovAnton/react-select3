'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _events = require('../utils/events');

var _SelectOptionsList = require('./SelectOptionsList');

var _SelectOptionsList2 = _interopRequireDefault(_SelectOptionsList);

var _SelectSearchInput = require('./SelectSearchInput');

var _SelectSearchInput2 = _interopRequireDefault(_SelectSearchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LANG_DEFAULT = {
    empty: 'Ничего не найдено',
    emptyValue: '-',
    error: 'Не удалось получить данные!',
    loading: 'Загрузка...',
    // @fixme: hardcoded minlength
    minLength: 'Введите минимум 3 буквы',
    pending: 'Поиск...'
};

var getChildrenText = function getChildrenText(element) {
    if (typeof element === 'string') return element;

    return getChildrenText(_react.Children.toArray(element)[0].props.children);
};

var SelectDropdown = function (_Component) {
    _inherits(SelectDropdown, _Component);

    function SelectDropdown(props, context) {
        _classCallCheck(this, SelectDropdown);

        var _this = _possibleConstructorReturn(this, (SelectDropdown.__proto__ || Object.getPrototypeOf(SelectDropdown)).call(this, props, context));

        _this._onSearchTermChange = function (_ref) {
            var term = _ref.target.value;
            var onSearch = _this.props.onSearch;
            // reset searchTerm if term === ''

            var searchTerm = term || null;

            if ((0, _isFunction2.default)(onSearch)) {
                onSearch(searchTerm);
            } else {
                _this.setState({ searchTerm: searchTerm });
            }
        };

        _this.componentWillUpdate = function (_ref2, _ref3) {
            var propsOptions = _ref2.options;
            var searchTerm = _ref3.searchTerm;

            if (searchTerm === _this.state.searchTerm) {
                return;
            } else if (!searchTerm) {
                _this.setState(Object.assign(SelectDropdown.initialState(), { options: propsOptions }));
            } else {
                (function () {
                    var searchRegExp = new RegExp(searchTerm, 'gi');
                    var options = propsOptions.filter(function (_ref4) {
                        var element = _ref4.text;

                        // @fixme: getChildrenText is not perfect tbh
                        var elementText = getChildrenText(element);

                        return searchRegExp.test(elementText);
                    });

                    _this.setState({ options: options });
                })();
            }
        };

        _this.render = function () {
            // TODO: fetch dropdown
            // TODO: language
            var _this$props = _this.props,
                highlighted = _this$props.highlighted,
                isPending = _this$props.isPending,
                lang = _this$props.lang,
                onSelect = _this$props.onSelect,
                requestSearch = _this$props.requestSearch,
                search = _this$props.search,
                value = _this$props.value;
            var options = _this.state.options;

            var language = Object.assign({}, LANG_DEFAULT, lang);
            var showSearch = requestSearch || search.minimumResults <= options.length;

            return _react2.default.createElement(
                'span',
                { className: 'pure-react-select__dropdown' },
                showSearch && _react2.default.createElement(_SelectSearchInput2.default, { onClick: (0, _events.stopPropagation)(), onChange: _this._onSearchTermChange }),
                _react2.default.createElement(_SelectOptionsList2.default, { options: options, value: value, highlighted: highlighted, onSelect: onSelect })
            );
        };

        _this.state = {
            searchTerm: null,
            options: props.options
        };
        return _this;
    }

    return SelectDropdown;
}(_react.Component);

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