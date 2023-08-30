const MILLISECONDS_IN_HOUR = 3.6e6

/**
 * @function
 * @name adjustDate
 * @description Adjusts the date forward or backward
 * @param  {number} [timestamp=now]    Date as epoch in milliseconds
 * @param  {object} offset             Include date elements you want offset and by how much
 * @param  {number} [offset.minutes]   Number of minutes to offset (can be negative)
 * @param  {number} [offset.hours]     Number of hours to offset (can be negative)
 * @param  {number} [offset.days]      Number of days to offset (can be negative)
 * @param  {number} [offset.months]    Number of months to offset (can be negative)
 * @param  {number} [offset.years]     Number of years to offset (can be negative)
 * @return {number}                    Returns new date timestamp
 */
exports.adjustDate = ({ timestamp = new Date().valueOf(), offset }) => {
   let dt = new Date(timestamp)
   if (offset.minutes) {
      dt = new Date(dt.setMinutes(dt.getMinutes() + offset.minutes))
   }
   if (offset.hours) {
      dt = new Date(dt.setHours(dt.getHours() + offset.hours))
   }
   if (offset.days) {
      dt = new Date(dt.setDate(dt.getDate() + offset.days))
   }
   if (offset.months) {
      dt = new Date(dt.setMonth(dt.getMonth() + offset.months))
   }
   if (offset.years) {
      dt = new Date(dt.setFullYear(dt.getFullYear() + offset.years))
   }
   return dt
}

/**
 * @function
 * @name readableDate
 * @description Converts a timestamp to a readable string
 * @param  {number} [timestamp=now] Date as epoch in milliseconds
 * @return {string}                 Returns date/time string
 */
exports.readableDate = ({ timestamp = new Date().valueOf() }) => {
   try {
      const dt = new Date(timestamp)
      return dt.toLocaleString()
   } catch (error) {
      throw new Error(error)
   }
}

/**
 * @function
 * @name startOfDay
 * @description Returns timestamp of the start of a day
 * @param  {number} [timestamp=now] Date as epoch in ms
 * @return {number}                 Return timestamp in ms
 */
exports.startOfDay = (timestamp = new Date().valueOf()) => {
   const dt = new Date(timestamp)
   return dt.setHours(0, 0, 0, 0)
}

/**
 * @function
 * @name endOfDay
 * @description Returns timestamp of the end of a day
 * @param  {number} [timestamp=now] Date as epoch in ms
 * @return {number}                 Return timestamp in ms
 */
exports.endOfDay = (timestamp = new Date().valueOf()) => {
   const dt = new Date(timestamp)
   return dt.setHours(23, 59, 59, 999)
}

/**
 * @function
 * @name startOfWeek
 * @description Returns timestamp of the midnight on start of week
 * @param  {number} [timestamp=now]    Week of this timestamp
 * @param  {number} [weekStartsOn=1]   First day of the week (0 = Sunday)
 * @return {number}                    Return timestamp in ms
 */
exports.startOfWeek = (timestamp = new Date().valueOf(), weekStartsOn = 1) => {
   const dt = new Date(timestamp)
   let start = dt.getDate() - dt.getDay() + weekStartsOn
   let startDt = new Date(dt.setDate(start))
   startDt.setHours(0, 0, 0, 0)
   return startDt.valueOf()
}

/**
 * @function
 * @name endOfWeek
 * @description Returns timestamp just before midnight of last of week
 * @param  {number} [timestamp=now]    Week of this timestamp
 * @param  {number} [weekStartsOn=1]   First day of the week (0 = Sunday)
 * @return {number}                 Return timestamp in ms
 */
exports.endOfWeek = (timestamp = new Date().valueOf(), weekStartsOn = 1) => {
   const dt = new Date(timestamp)
   let start = dt.getDate() - dt.getDay() + weekStartsOn
   let end = start + 6
   let endDt = new Date(dt.setDate(end))
   endDt.setHours(23, 59, 59, 999)
   return endDt.valueOf()
}

/**
 * @function
 * @name startOfMonth
 * @description Returns timestamp of midnight of first day of month
 * @param  {number} [timestamp=now] Month of this timestamp
 * @return {number}                 Return timestamp in ms
 */
exports.startOfMonth = (timestamp = new Date().valueOf()) => {
   let dt = new Date(timestamp)
   dt.setDate(1)
   dt.setHours(0, 0, 0, 0)
   return dt.valueOf()
}

/**
 * @function
 * @name endOfWeek
 * @description Returns timestamp just before midnight of last day of month
 * @param  {number} [timestamp=now]    Month of this timestamp
 * @param  {number} [weekStartsOn=1]   First day of the week (0 = Sunday)
 * @return {number}                 Return timestamp in ms
 */
exports.endOfMonth = (timestamp = new Date().valueOf()) => {
   let dt = new Date(timestamp)
   dt.setMonth(dt.getMonth() + 1)
   dt.setDate(1)
   dt.setDate(dt.getDate() - 1)
   dt.setHours(23, 59, 59, 999)
   return dt.valueOf()
}

/**
 * @function
 * @name diffInDays
 * @description Returns the difference in days between two dates
 * @param  {number}  firstDate   Date to compare
 * @param  {number}  secondDate  Date to subtract
 * @return {number}              Number of days
 */
exports.diffInDays = (firstDate, secondDate) => {
   return Math.ceil(Math.abs(firstDate - secondDate) / (1000 * 60 * 60 * 24))
}

/**
 * @function
 * @name diffInHours
 * @description Returns the difference in timestamps in hours (rounded to 2 decimals)
 * @param  {number}  firstTimestamp   Typically older timestamp
 * @param  {number}  secondTimestamp  Typically new timestamp
 * @return {number}  Number of hours (secondTimestamp - firstTimestamp)
 */
exports.diffInHours = (firstTimestamp, secondTimestamp) => {
   if (typeof firstTimestamp !== 'number' || typeof secondTimestamp !== 'number') return false
   let diff = secondTimestamp - firstTimestamp
   diff = diff / MILLISECONDS_IN_HOUR
   diff = Math.round(diff * 100) / 100
   return diff
}

/**
 * @function
 * @name getUserLocale
 * @description Determines the locale
 * @return {string}  Locale code (e.g. "en-US")
 */
exports.getUserLocale = () => {
   return Intl.DateTimeFormat().resolvedOptions().locale || 'en-US'
}

/**
 * @function
 * @name formatDate
 * @description Formats date/times using Intl.DateTimeFormat()
 *    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {number} [timestamp=now]       Timestamp to be formatted
 * @param {object} options               Options to describe the desired format
 * @param {string} [options.timeZone]    Timezone to use (e.g. 'America/Chicago')
 * @param {'numeric'|'2-digit'|'long'|'short'|'narrow'} [options.month]
 *    Month formats (e.g. numeric = '3', 2-digit = '03', long = 'March', short = 'Mar', narrow = 'M')
 * @param {'long'|'short'|'narrow'} [options.weekday]
 *    Weekday format (e.g. long = 'Thursday', short = 'Thu', narrow = 'T')
 * @param {'numeric'|'2-digit'} [options.day]
 *    Date format (e.g. numeric = '1', 2-digit = '02')
 * @param {'numeric'|'2-digit'} [options.year]
 *    Year format (e.g. numeric = '2022', 2-digit = '22')
 * @param {'numeric'|'2-digit'} [options.hour]
 *    Hour format (e.g. numeric = '4', 2-digit = '04')
 * @param {'numeric'|'2-digit'} [options.minute]
 *    Minute format (e.g. numeric = '2', 2-digit = '02')
 * @param {'numeric'|'2-digit'} [options.second]
 *    Second format (e.g. numeric = '2', 2-digit = '02')
 * @return {string}  Locale code (e.g. "en-US")
 */
exports.formatDate = ({ timestamp = new Date().valueOf, options }) => {
   const dt = new Date(timestamp)
   const locale = Intl.DateTimeFormat().resolvedOptions().locale || 'en-US'
   return Intl.DateTimeFormat(locale, options).format(dt)
}

/**
 * @function
 * @name timeStringToTimestamp
 * @description Returns timestamp from a time string (e.g. "11:23 PM")
 * @param  {string} timeString   String containing time using "h:mm A" format
 * @return {number}              Timestamp using today for date and timeString for time
 */
exports.timeStringToTimestamp = (timeStr) => {
   if (typeof timeStr !== 'string') return timeStr
   const strSplit = timeStr.split(' ')
   if (strSplit.length !== 2) return timeStr
   const timeSplit = strSplit[0].split(':')
   if (timeSplit.length !== 2) return timeStr

   let hours =
      strSplit[1].toUpperCase() === 'PM'
         ? Number(timeSplit[0]) + 12
         : Number(timeSplit[0])
   let minutes = Number(timeSplit[1])

   let dt = new Date()
   dt.setHours(hours)
   dt.setMinutes(minutes)
   dt.setSeconds(0)
   return dt.valueOf()
}

/**
 * const dt = new Intl.DateTimeFormat('en-us')
 * console.log(dt.formatToParts())
 *    [
 *       { type: 'month', value: '4' },
 *       { type: 'literal', value: '/' },
 *       { type: 'day', value: '14' },
 *       { type: 'literal', value: '/' },
 *       { type: 'year', value: '2022' }
 *    ]
 *
 * idt = new Intl.DateTimeFormat(['es', 'en']).format(dt)
 * console.log(idt)
 *    '14/4/2022'
 *
 * let options = {
 *    timeZone: 'America/Chicago',
 *    hour12: true,
 *    year: 'numeric',
 *    month: 'long',
 *    day: 'numeric',
 *    hour: 'numeric',
 *    minute: '2-digit',
 * }
 * idt = new Intl.DateTimeFormat('en', options).format(dt)
 * console.log(idt)
 *    'April 14, 2022, 7:59 PM'
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 */
