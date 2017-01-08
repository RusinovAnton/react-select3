'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _selectPropTypes = require('../shared/selectPropTypes');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectSelection = function SelectSelection(_ref) {
    var clearable = _ref.clearable,
        _ref$selection = _ref.selection,
        selection = _ref$selection === undefined ? null : _ref$selection,
        _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === undefined ? null : _ref$placeholder,
        onClearSelection = _ref.onClearSelection;
    return _react2.default.createElement(
        'span',
        { className: 'pure-react-select__selection pure-react-select__selection--single' },
        _react2.default.createElement(
            'span',
            { className: (0, _classnames2.default)('pure-react-select__selection-node', {
                    'pure-react-select__selection--placeholder': !selection
                }) },
            selection || placeholder
        ),
        clearable && _react2.default.createElement(
            'span',
            { className: 'pure-react-select__selection-clear',
                role: 'presentation',
                onClick: onClearSelection },
            '\xD7'
        ),
        _react2.default.createElement(
            'span',
            { className: 'pure-react-select__selection-arrow', role: 'presentation' },
            _react2.default.createElement('i', null)
        )
    );
};

SelectSelection.propTypes = {
    clearable: _react.PropTypes.bool,
    onClearSelection: _react.PropTypes.func,
    placeholder: _selectPropTypes.selectPropTypes.selection,
    selection: _selectPropTypes.selectPropTypes.selection
};

exports.default = SelectSelection;