import moment from 'moment'

const ONE_DAY_MS = 86400000

const now = moment()
const nowYear = (now.year()).toString()
const nowMonth = (now.month() + 1).toString()
const nowDate = (now.date()).toString()
const todayDateString = `${nowYear}-${padLeft(nowMonth, 2)}-${padLeft(nowDate, 2)}`
const todayMoment = moment(todayDateString)

function padLeft (orig, length, pad = '0') {
  let padded = orig
  while (padded.length < Math.min(length, 60)) {
    padded = `${pad}${padded}`
  }
  return padded
}

export default {
  /**
   * Returns the 'time ago' string compared to the supplied date.
   * If date is missing, 'Never' will be returned.
   * If today or yesterday are supplied, 'Today' or 'Yesterday' will be returned.
   * Otherwise, it will say, e.g., '6 days ago,' '2 weeks ago' etc.
   */
  timeAgoString (date) {
    if (!date) {
      return 'Never'
    }

    const diff = moment(todayMoment).diff(date)
    if (diff < ONE_DAY_MS) {
      return 'Today'
    } else if (diff < ONE_DAY_MS * 2) {
      return 'Yesterday'
    }
    return moment(date).from(todayMoment)
  },

  /** Return's the 4-digit year of today's date. */
  currentYear: () => nowYear,
  /** Return's the 2-digit year of today's month. */
  currentMonth: () => nowMonth,
  /** Return's the 2-digit date value of today's date. */
  currentDate: () => nowDate,

  /** Returns whether the supplied year value matches today's date. */
  isCurrentYear: (year) => year === nowYear,
  /** Returns whether the supplied month value matches today's date. */
  isCurrentMonth: (month) => month === nowMonth,
  /** Returns whether the supplied date value matches today's date. */
  isCurrentDay: (date) => date === nowDate,

  /**
   * Returns the date formatted like:
   * March 14, 2017
   */
  cleanDate (date) {
    return moment(date).format('MMMM Do, YYYY')
  },

  /**
   * Returns the date formatted like:
   * March 14, 2017 (Tuesday)
   */
  cleanDateWithTrailingDay (date) {
    return moment(date).format('MMMM Do, YYYY (dddd)')
  },

  /**
   * Returns the date formatted like:
   * Tuesday, March 14, 2017
   */
  cleanDateWithLeadingDay (date) {
    return moment(date).format('dddd, MMMM Do, YYYY')
  },

  /**
   * Returns today's date in YYYY-MM-DD format, like:
   * 2017-03-14
   */
  todayDateString () {
    return todayDateString
  }
}
