'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectSearchInput = require('./SelectSearchInput');

var _SelectSearchInput2 = _interopRequireDefault(_SelectSearchInput);

var _SelectOptionsList = require('./SelectOptionsList');

var _SelectOptionsList2 = _interopRequireDefault(_SelectOptionsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectDropdown = function (_Component) {
    _inherits(SelectDropdown, _Component);

    function SelectDropdown() {
        _classCallCheck(this, SelectDropdown);

        var _this = _possibleConstructorReturn(this, (SelectDropdown.__proto__ || Object.getPrototypeOf(SelectDropdown)).apply(this, arguments));

        _this.onFilterTermChange = function (_ref) {
            var filterTerm = _ref.target.value;

            if (!filterTerm) {
                filterTerm = null; // eslint-disable-line no-param-reassign
            }

            _this.setState({ filterTerm: filterTerm });
        };

        _this.componentWillUpdate = function (_ref2, _ref3) {
            var data = _ref2.data;
            var filterTerm = _ref3.filterTerm;

            if (filterTerm === _this.state.filterTerm) return;
            if (!filterTerm) {
                _this.setState(Object.assign(SelectDropdown.getInitialState(), { optionsData: data }));
                return;
            }

            var filterRegExp = new RegExp(filterTerm, 'gi');
            var optionsData = data.filter(function (_ref4) {
                var text = _ref4.text;
                return filterRegExp.test(text);
            });

            _this.setState({ optionsData: optionsData });
        };

        _this.render = function () {
            if (!_this.props.dropdownOpened) {
                return null;
            }

            var optionsData = _this.state.optionsData;
            var _this$props = _this.props,
                highlighted = _this$props.highlighted,
                onSelect = _this$props.onSelect,
                searchShow = _this$props.searchShow,
                value = _this$props.value,
                onContainerKeyDown = _this$props.onContainerKeyDown;


            return _react2.default.createElement(
                'span',
                { className: 'dropdown-wrapper' },
                _react2.default.createElement(
                    'span',
                    { className: 'react-select-dropdown' },
                    searchShow && _react2.default.createElement(_SelectSearchInput2.default, { onTermChange: _this.onFilterTermChange, onKeyDown: onContainerKeyDown }),
                    _react2.default.createElement(_SelectOptionsList2.default, { data: optionsData, value: value, highlighted: highlighted, onSelect: onSelect })
                )
            );
        };

        _this.state = Object.assign(SelectDropdown.getInitialState(), { optionsData: _this.props.data });
        return _this;
    }

    return SelectDropdown;
}(_react.Component);

SelectDropdown.propTypes = {
    data: _react.PropTypes.array,
    dropdownOpened: _react.PropTypes.bool,
    highlighted: _react.PropTypes.number,
    onContainerKeyDown: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    searchShow: _react.PropTypes.bool,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.shape({
        id: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        text: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
    })])
};

SelectDropdown.getInitialState = function () {
    return {
        filterTerm: null,
        optionsData: null
    };
};

exports.default = SelectDropdown;