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
    var highlighted = _ref.highlighted,
        selectedOption = _ref.selectedOption,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? [] : _ref$options,
        onSelect = _ref.onSelect;

    var optionsList = options.map(function (_ref2, i) {
        var id = _ref2.id,
            text = _ref2.text,
            isHidden = _ref2.isHidden;

        if (isHidden) return null;
        var isSelected = typeof selectedOption !== 'undefined' && selectedOption !== null && selectedOption.id === id;
        var optionClassName = (0, _classnames2.default)('react-select-results__option', {
            'react-select-results--selected': isSelected,
            'react-select-results__option--highlighted': i === highlighted
        });

        return _react2.default.createElement(
            'li',
            { key: i,
                className: optionClassName,
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
            optionsList
        )
    );
};

SelectOptionsList.propTypes = {
    highlighted: _react.PropTypes.number,
    onSelect: _react.PropTypes.func.isRequired,
    options: _react.PropTypes.array.isRequired,
    selectedOption: _react.PropTypes.object
};

exports.default = SelectOptionsList;