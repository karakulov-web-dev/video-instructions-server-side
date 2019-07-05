const StrReadable = require("./str-readable");

/**
 * Convert string into a readable stream.
 *
 * @param {String} data
 * @param {Object} options
 * @return {StrReadable}
 */
const strToStream = (data, options = {}) => new StrReadable(data, options);

module.exports = strToStream;
