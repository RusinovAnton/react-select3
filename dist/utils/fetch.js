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
    var data = [];

    if (response.ok) {
      try {
        data = response.json();
      } catch (err) {
        console.warn(err);
      }
    } else if (response.status === 404) {
      return [];
    } else {
      throw new Error('Server error');
    }

    return data;
  }, function (err) {
    console.warn(err);
  });
};