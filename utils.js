var utils = {};

/**
 * Simple $.each, only for objects
 * 
 * @param {Object} object
 * @param {Function} callback
 */
utils.each = function (object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            callback(object[key], key);
        }
    }
};

/**
 * Get difference between two objects
 * 
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
utils.diff = function (a, b) {
    var c = {};
    
    for (var key in b) {
        if (typeof a[key] === 'undefined' || b[key] !== a[key]) {
            c[key] = b[key];
        }
    }
    
    return c;
};

/**
 * Merge two objects
 * 
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
utils.merge = function (a, b) {
    var c = {}, key;
    
    for (key in a) {
        c[key] = a[key];
    }
    
    for (key in b) {
        c[key] = b[key];
    }
    
    return c;
};

/**
 * Extend one object from other
 * 
 * @param {Object} a
 * @param {Object} b
 */
utils.extend = function (a, b) {
    for (var key in b) {
        a[key] = b[key];
    }
};

/**
 * Turn array-like object into real array
 * 
 * @param {Object} arrayLikeObject
 * @return {Array}
 */
utils.toArray = function (arrayLikeObject) {
    return Array.prototype.slice.call(arrayLikeObject);
};

/**
 * Pick keys from object
 * 
 * @param {Object} object
 * @param {Array} keys
 * @return {Object}
 */
utils.pick = function (object, keys) {
    var result = {};
    
    keys.forEach(function (key) {
        if (object[key]) {
            result[key] = object[key];
        }
    });
    
    return result;
};

module.exports = utils;