'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _SelectSearchInput = require('./SelectSearchInput');

var _SelectSearchInput2 = _interopRequireDefault(_SelectSearchInput);

var _SelectOptionsList = require('./SelectOptionsList');

var _SelectOptionsList2 = _interopRequireDefault(_SelectOptionsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LANG_RU = {
    pending: 'Поиск...',
    // @fixme: hardcoded minlength
    minLength: 'Введите минимум 3 буквы',
    loading: 'Загрузка...',
    error: 'Не удалось получить данные!',
    empty: 'Ничего не найдено',
    emptyValue: '-'
};

var getChildrenText = function getChildrenText(element) {
    if (typeof element === 'string') return element;

    return getChildrenText(_react.Children.toArray(element)[0].props.children);
};

var SelectDropdown = function (_Component) {
    _inherits(SelectDropdown, _Component);

    function SelectDropdown(props) {
        _classCallCheck(this, SelectDropdown);

        var _this = _possibleConstructorReturn(this, (SelectDropdown.__proto__ || Object.getPrototypeOf(SelectDropdown)).call(this, props));

        _initialiseProps.call(_this);

        var options = props.options;

        _this.state = Object.assign(SelectDropdown.initialState(), { options: options });
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
    search: _react.PropTypes.object.isRequired,
    selectedOption: _react.PropTypes.object
};

SelectDropdown.initialState = function () {
    return {
        filterTerm: null,
        options: []
    };
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this._onFilterTermChange = function (_ref) {
        var term = _ref.target.value;
        var onSearch = _this2.props.onSearch;

        var filterTerm = term || null;

        if ((0, _isFunction2.default)(onSearch)) {
            onSearch(filterTerm);
        } else {
            _this2.setState({ filterTerm: filterTerm });
        }
    };

    this._onOptionClick = function (e) {
        var onSelect = _this2.props.onSelect;
        var index = e.target.dataset.index;


        e.stopPropagation();
        onSelect(parseInt(index, 10));
    };

    this.componentWillUpdate = function (_ref2, _ref3) {
        var propsOptions = _ref2.options;
        var filterTerm = _ref3.filterTerm;

        if (filterTerm === _this2.state.filterTerm) {
            return;
        } else if (!filterTerm) {
            _this2.setState(Object.assign(SelectDropdown.initialState(), { options: propsOptions }));
        } else {
            (function () {
                var filterRegExp = new RegExp(filterTerm, 'gi');
                var options = propsOptions.filter(function (_ref4) {
                    var element = _ref4.text;

                    // @fixme: getChildrenText is not perfect tbh
                    var elementText = getChildrenText(element);

                    return filterRegExp.test(elementText);
                });

                _this2.setState({ options: options });
            })();
        }
    };

    this.render = function () {
        // TODO: fetch dropdown
        // TODO: language
        var _props = _this2.props,
            highlighted = _props.highlighted,
            lang = _props.lang,
            isPending = _props.isPending,
            search = _props.search,
            selectedOption = _props.selectedOption;
        var options = _this2.state.options;

        var language = Object.assign({}, LANG_RU, lang);
        var showSearch = search.minimumResults <= _this2.props.options.length;

        return _react2.default.createElement(
            'span',
            { className: 'pure-react-select__dropdown' },
            showSearch && _react2.default.createElement(_SelectSearchInput2.default, { onChange: _this2._onFilterTermChange }),
            _react2.default.createElement(_SelectOptionsList2.default, { options: options, selectedOption: selectedOption, highlighted: highlighted, onSelect: _this2._onOptionClick })
        );
    };
};

exports.default = SelectDropdown;