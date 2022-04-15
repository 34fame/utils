const dates = require('./dates')
const numbers = require('./numbers')
const objects = require('./objects')
const strings = require('./strings')

module.exports = function useUtils() {
   return {
      ...dates,
      ...numbers,
      ...objects,
      ...strings,
   }
}
