'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _fetch = require('../utils/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _SelectSearchInput = require('./SelectSearchInput');

var _SelectSearchInput2 = _interopRequireDefault(_SelectSearchInput);

var _SelectOptionsList = require('./SelectOptionsList');

var _SelectOptionsList2 = _interopRequireDefault(_SelectOptionsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cachedResponseData = {};

var SelectFetchDropdown = function (_Component) {
    _inherits(SelectFetchDropdown, _Component);

    function SelectFetchDropdown() {
        _classCallCheck(this, SelectFetchDropdown);

        var _this = _possibleConstructorReturn(this, (SelectFetchDropdown.__proto__ || Object.getPrototypeOf(SelectFetchDropdown)).apply(this, arguments));

        _initialiseProps.call(_this);

        var _this$props$request = _this.props.request,
            delay = _this$props$request.delay,
            endpoint = _this$props$request.endpoint;


        if (typeof endpoint !== 'string') {
            throw new Error('Expected endpoint to be string.');
        }

        if (typeof delay !== 'undefined' && typeof delay !== 'number') {
            throw new Error('Expected request delay to be in ms');
        }

        _this.state = _this.getInitState();
        _this.fetchRequest = (0, _throttle2.default)(_this.fetchOptionsData, delay || 300, { trailing: false });
        return _this;
    }

    _createClass(SelectFetchDropdown, [{
        key: 'render',
        value: function render() {
            if (!this.props.dropdownOpened) {
                return null;
            }

            var _props = this.props,
                data = _props.data,
                highlighted = _props.highlighted,
                onSelect = _props.onSelect,
                once = _props.request.once,
                value = _props.value;
            var status = this.state.status;


            return _react2.default.createElement(
                'span',
                { className: 'dropdown-wrapper' },
                _react2.default.createElement(
                    'span',
                    { className: 'react-select-dropdown' },
                    !once && _react2.default.createElement(_SelectSearchInput2.default, { onTermChange: this.onFetchTermChange }),
                    _react2.default.createElement(
                        'span',
                        { className: 'react-select-results' },
                        data && data.length ? _react2.default.createElement(_SelectOptionsList2.default, { data: data, value: value, highlighted: highlighted, onSelect: onSelect }) : _react2.default.createElement(
                            'span',
                            { className: 'react-select-results__message' },
                            status
                        )
                    )
                )
            );
        }
    }]);

    return SelectFetchDropdown;
}(_react.Component);

SelectFetchDropdown.defaultProps = {
    request: {
        delay: 2500
    }
};
SelectFetchDropdown.propTypes = {
    data: _react.PropTypes.array,
    dropdownOpened: _react.PropTypes.bool,
    highlighted: _react.PropTypes.number,
    onContainerKeyDown: _react.PropTypes.func,
    onGettingData: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    request: _react.PropTypes.object,
    value: _react.PropTypes.any
};
SelectFetchDropdown.contextTypes = {
    lang: _react.PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.getInitState = function () {
        var once = _this2.props.request.once;

        // TODO: use isPending flag

        return once ? { isPending: false, status: _this2.context.lang.empty } : { isPending: false, status: _this2.context.lang.minLength };
    };

    this.componentWillMount = function () {
        var _props2 = _this2.props,
            _props2$request = _props2.request,
            endpoint = _props2$request.endpoint,
            once = _props2$request.once,
            params = _props2$request.params,
            onGettingData = _props2.onGettingData;


        if (!once) return;
        // cache once request data
        var cachedData = cachedResponseData[endpoint];

        if (cachedData && (0, _isEqual2.default)(cachedData.params, params)) {
            _this2.setState({ isPending: false, status: _this2.context.lang.empty });
            onGettingData(cachedData.data);
        } else {
            _this2.fetchOptionsData(params, true);
        }
    };

    this.fetchOptionsData = function (params, cache) {
        var _props3 = _this2.props,
            _props3$request = _props3.request,
            endpoint = _props3$request.endpoint,
            responseDataFormatter = _props3$request.responseDataFormatter,
            onGettingData = _props3.onGettingData;
        var lang = _this2.context.lang;


        if (!(0, _isFunction2.default)(responseDataFormatter)) {
            throw new Error('You must provide a responseDataFormatter function in order to format incoming options data');
        }

        _this2.setState({ isPending: true, status: lang.pending });

        (0, _fetch2.default)(endpoint, 'GET', null, { params: params }).then(responseDataFormatter).then(function () {
            var optionsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var state = Object.assign(_this2.getInitState(), { isPending: false });

            if (!optionsData.length) {
                state.status = lang.empty;
            }

            if (cache) {
                cachedResponseData[endpoint] = {
                    data: optionsData,
                    params: params
                };
            }

            onGettingData(optionsData);
            _this2.setState(state);
        }).catch(function (err) {
            console.warn(err); // eslint-disable-line no-console
            _this2.setState({ status: lang.error });
        });
    };

    this.onFetchTermChange = function (_ref) {
        var fetchTerm = _ref.target.value;
        var _props$request = _this2.props.request,
            params = _props$request.params,
            termQuery = _props$request.termQuery;

        var fetchParams = Object.assign({}, params, _defineProperty({}, termQuery, fetchTerm));

        if (!fetchTerm.length) {
            _this2.setState(_this2.getInitState());
        }

        if (fetchTerm.length >= 3) {
            _this2.fetchRequest(fetchParams);
        }
    };
};

exports.default = SelectFetchDropdown;