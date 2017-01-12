'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _hasValue = require('../utils/hasValue');

var _hasValue2 = _interopRequireDefault(_hasValue);

var _events = require('../utils/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectOptionsList = function SelectOptionsList(_ref) {
    var highlighted = _ref.highlighted,
        value = _ref.value,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? [] : _ref$options,
        onSelect = _ref.onSelect;

    var optionsList = options.map(function (_ref2, i) {
        var id = _ref2.id,
            text = _ref2.text,
            isHidden = _ref2.isHidden;

        if (isHidden) return null;

        var isSelected = (0, _hasValue2.default)(value) && value === id;
        var optionClassName = (0, _classnames2.default)('pure-react-select-results__option', {
            'pure-react-select-results--selected': isSelected,
            'pure-react-select-results__option--highlighted': i === highlighted
        });

        var onOptionSelect = isSelected ? null : onSelect.bind(null, id);

        return _react2.default.createElement(
            'li',
            { key: i,
                className: optionClassName,
                onClick: (0, _events.stopPropagation)(onOptionSelect) },
            text
        );
    });

    return _react2.default.createElement(
        'ul',
        { className: 'pure-react-select__results-options' },
        optionsList
    );
};

SelectOptionsList.propTypes = {
    highlighted: _react.PropTypes.number,
    onSelect: _react.PropTypes.func.isRequired,
    options: _react.PropTypes.array.isRequired,
    value: _react.PropTypes.string
};

exports.default = SelectOptionsList;