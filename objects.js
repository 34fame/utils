const transform = require('lodash/transform')
const isEqual = require('lodash/isEqual')
const isObject = require('lodash/isObject')
const isArray = require('lodash/isArray')

/**
 * objectDiffs - Deep diff between two objects
 * @param  {Object} newObj    Object compared
 * @param  {Object} baseObj   Object to compare with
 * @return {Object}           Return a new object who represent the diff
 */
exports.objectDiffs = (newObj, baseObj) => {
   return transform(newObj, (result, value, key) => {
      if (!isEqual(value, baseObj[key])) {
         result[key] =
            isObject(value) && !isArray(value) && isObject(baseObj[key])
               ? objectDiffs(value, baseObj[key])
               : value
      }
   })
}

/**
 * isEmptyObject - Checks if value is an empty object
 * @param  {Object} obj    Object to check
 * @return {boolean}       Returns true if empty else false
 */
exports.isEmptyObject = (obj) => {
   if (typeof obj !== 'object') return false
   for (key in obj) return false
   return true
}
