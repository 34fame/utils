/**
 * isString - Determine if value is a string
 * @param  {Any} val    Value to test
 * @return {Boolean}    True if value is type string
 */
exports.isString = (val) => {
   return typeof val === 'string'
}

exports.randomString = () => Math.random().toString(36).slice(2)

exports.toCamelCase = (str) =>
   str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))

exports.toTitleCase = (str) => {
   return str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
}
