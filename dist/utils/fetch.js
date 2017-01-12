'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (endpoint) {
    if (typeof endpoint !== 'string') {
        throw new Error('Endpoint must be a string');
    }

    return fetch(endpoint, {
        method: 'GET',
        credentials: 'same-origin'
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