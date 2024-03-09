/**
 * @namespace typedefs
 */

/**
 * @typedef {Object} PaymentMonth
 *
 * @property {Number} month - The current month.
 * @property {Number} time - yyyy-mm-dd for time series.
 * @property {Number} balance - The remaining mortgage balance.
 * @property {Number} principal - The principal payment.
 * @property {Number} interest - The interest payment.
 * @property {Number} paymentTotal - The principal and interest payment forming the total payment for the month.
 *
 * @memberof typedefs
 */

/**
 * @typedef {Object} PaymentPlan
 *
 * @property {Number} startingBalance - The starting mortgage balance.
 * @property {Number} principalMonthlyPayment - The monthly payments towards the mortgage.
 * @property {Number} totalInterestPaid - The total fixed interest that will be paid for borrowing.
 * @property {Array<PaymentMonth>} months - Collection of months spanning the mortgage term.
 *
 * @memberof typedefs
 */

export {};