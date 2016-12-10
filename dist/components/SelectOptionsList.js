'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectOptionsList = function SelectOptionsList(_ref) {
    var _ref$data = _ref.data,
        data = _ref$data === undefined ? [] : _ref$data,
        highlighted = _ref.highlighted,
        value = _ref.value,
        onSelect = _ref.onSelect;

    var optionsData = data.map(function (_ref2, i) {
        var id = _ref2.id,
            text = _ref2.text;

        if (typeof id === 'undefined' || typeof text === 'undefined') {
            throw new Error('Data formatting is invalid');
        }

        var isSelected = value && (value === id || value.id === id);

        return _react2.default.createElement(
            'li',
            { key: i,
                className: (0, _classnames2.default)('react-select-results__option', {
                    'react-select-results--selected': isSelected,
                    'react-select-results__option--highlighted': i === highlighted
                }),
                'data-id': id,
                'data-index': i,
                onClick: isSelected ? null : onSelect },
            text
        );
    });

    return _react2.default.createElement(
        'span',
        { className: 'react-select-results' },
        _react2.default.createElement(
            'ul',
            { className: 'react-select-results__options' },
            optionsData
        )
    );
};

SelectOptionsList.propTypes = {
    data: _react.PropTypes.array,
    formatter: _react.PropTypes.func,
    highlighted: _react.PropTypes.number,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.shape({
        id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
        text: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
    })]),
    onSelect: _react.PropTypes.func
};

exports.default = SelectOptionsList;