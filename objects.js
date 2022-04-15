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
