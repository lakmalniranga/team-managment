import { add as addDuration, isBefore as isBeforeDate, parseISO } from 'date-fns';

/**
 * Add duration to a date
 * @param {Date} date The date which needs to add
 * @param {Number} duration The duration needs to be added to date
 * @param {String} type The type of the duration, enum (years, months, weeks, days, hours, minutes)
 * @return {Date}
 */
export function add({ date, duration, durationType }) {
	return addDuration(date, { [durationType]: duration });
}

/**
 * Return current date and time
 * @return {Date}
 */
export function currentDateTime() {
	return new Date();
}

/**
 * Compare date is before
 * @param {Date} date
 * @param {Date} dateToCompare The date which needs to compare with
 * @return {Boolean}
 */
export function isBefore(date, dateToCompare) {
	return isBeforeDate(date, dateToCompare);
}

/**
 * Parse date from string
 * @param {String | Date} date The date which needs to parse
 * @return {Date}
 */
export function parse(date) {
	return parseISO(date);
}
