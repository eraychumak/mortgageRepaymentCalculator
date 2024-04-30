/**
 * Converts pounds to pence
 * @param {Number} pounds - original pound value, e.g. £1031.32
 * @returns {Number} pence
 */
function toPence(pounds) {
  return Math.trunc(pounds * 100);
}

/**
 * Converts pence to pounds
 * @param {Number} pence - original pence value, e.g. 103132p
 * @returns {Number} pounds
 */
function toPounds(pence) {
  return pence / 100;
}

export {
  toPence,
  toPounds
}