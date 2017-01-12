'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var makeEventMiddleware = function makeEventMiddleware(functionName) {
    return function (func) {
        return function (event) {
            if (event && event[functionName]) event[functionName]();
            if (func) func(event);
        };
    };
};

var preventDefault = exports.preventDefault = makeEventMiddleware('preventDefault');
var stopPropagation = exports.stopPropagation = makeEventMiddleware('stopPropagation');