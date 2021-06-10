'use strict'

/**
 * Determine value is empty
 * @param {*} value
 * @return {bool}
 */
function isEmptyString (value) {
  return (value === undefined || value === null || value === '')
}

module.exports = {
  isEmptyString
}
