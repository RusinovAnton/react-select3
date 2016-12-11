'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (endpoint) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof endpoint !== 'string') {
        throw new Error('Endpoint must be a string');
    }

    return fetch(endpoint, {
        method: 'GET',
        credentials: 'same-origin',
        headers: headers
    }).then(function (response) {
        if (response.ok) {
            return response.text().then(function (text) {
                return text ? JSON.parse(text) : 'ok';
            });
        }

        return response.text().then(function (error) {
            throw error;
        });
    });
};