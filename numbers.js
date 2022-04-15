/**
 * @function
 * @name isNumber
 * @description Determines if value is a number
 * @param  {any}     val Value to check
 * @return {boolean} Returns true if val is number
 */
exports.isNumber = (val) => {
   return typeof val === 'number'
}

/**
 * @function
 * @name toCurrency
 * @description Converts a number to currency string
 * @param  {number|string} value    Number to be converted
 * @param  {string} [decimal="."]   Separates bills from change
 * @param  {string} [separator=","] Thousands separator
 * @return {string}                 Currency value as a string
 */
exports.toCurrency = ({ value, decimal = '.', separator = ',' }) => {
   if (typeof value === 'string') val = Number(value)
   if (typeof value !== 'number') {
      return value
   }
   return String(value.toFixed(2).replace('.', decimal)).replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      `$1${separator}`
   )
}
