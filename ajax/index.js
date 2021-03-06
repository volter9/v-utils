var Request = require('./request');

/**
 * Central AJAX control
 */
var ajax = {};

/**
 * Requests
 * 
 * @param {String} url
 * @param {String} method
 * @param {Object} data
 */
ajax.request = function (url, method, data) {
    var request = new Request(this.url(url), method, data);
    
    request.on('data', function (xhr, data) {
        data.status === 'ok' 
            ? request.emit('success', xhr, data)
            : request.emit('error', xhr, data.message);
    });
    
    request.on('error', function (xhr, message) {
        console.error(message);
    });
    
    return request;
};

/** 
 * AJAX shortcuts 
 * 
 * @method get 
 * @method post
 * @method put
 * @method delete 
 */
['get', 'post', 'put', 'delete'].forEach(function (method) {
    var name = method.toUpperCase();
    
    ajax[method] = function (url, data) {
        return this.request(url, name, data);
    };
});

/**
 * Convert relative url to full url
 * 
 * Empty string is needed to avoid ugly `('/' + url.join('/'))`
 * snippet
 * 
 * @param {String|Array} url
 * @return {String}
 */
ajax.url = function (url) {
    url = Array.isArray(url)
        ? ['', ajax.base_url].concat(url)
        : ['', ajax.base_url, url];
    
    return url.join('/').replace(/\/+/, '/');
};

ajax.base_url = '';

module.exports = ajax;