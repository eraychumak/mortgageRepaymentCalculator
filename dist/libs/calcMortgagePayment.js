import "./typedefs.js";

/**
 * Calculates mortgage repayment plan and
 * returns data for plotting on a graph
 *
 * @param {Number} housePrice - the price of the house
 * @param {Number} deposit - the deposit for the mortgage
 * @param {Number} interestAnnual - the  fixed annual interest rate of the mortgage
 * @param {Number} mortgageTerm - the length of the mortgage in years
 *
 * @returns {PaymentPlan} The payment plan to be plotted on a graph
 */
function calcMortgageRepayment(housePrice, deposit, interestAnnual, mortgageTerm) {
  const housePricePennies = Math.trunc(housePrice * 100);
  const depositPennies = Math.trunc(deposit * 100);

  const termYears = mortgageTerm;
  const termMonths = termYears * 12;

  let balancePennies = housePricePennies - depositPennies;
  let totalInterestPaidPennies = 0;

  const monthlyPaymentPennies = Math.trunc(balancePennies / termMonths);

  const plotData = {
    startingBalance: balancePennies / 100,
    principalMonthlyPayment: monthlyPaymentPennies / 100,
    totalInterestPaid: 0,
    months: []
  };

  // plotting data requires time in format: yyyy-mm-dd
  const today = new Date().toISOString().split("T")[0].split("-");
  let currentYear = parseInt(today[0]);

  /*
    generates plotting data for each month.
    <= is used instead of < adding extra
    month after mortgage term ends to show
    zero balance (final numbers).
  */
  for (let i = 0; i <= termMonths; i++) {
    const monthNum = (i % 12) + 1;

    // check and update year because months continue past 12.
    if (i !== 0 && i % 12 === 0) {
      currentYear += 1;
    }

    const interestThisMonthPennies = Math.trunc(
      Math.trunc(balancePennies * interestAnnual) / 12
    );

    const currentMonth = {
      month: i,
      time: `${currentYear}-${monthNum}-${today[2]}`,
      interestPaid: totalInterestPaidPennies / 100,
      balance: balancePennies / 100,
      principal: monthlyPaymentPennies / 100,
      interest: interestThisMonthPennies / 100,
      paymentTotal: (monthlyPaymentPennies + interestThisMonthPennies) / 100
    }

    // last month, principal payment should be the remaining balance
    if (i === termMonths - 1) {
      currentMonth.principal = balancePennies / 100;
      currentMonth.paymentTotal = (balancePennies + interestThisMonthPennies) / 100;
    }

    // mortgage finished
    if (i === termMonths) {
      currentMonth.principal = 0;
      currentMonth.paymentTotal = 0;
    }

    plotData.months.push(currentMonth);
    plotData.totalInterestPaid += interestThisMonthPennies;

    totalInterestPaidPennies += interestThisMonthPennies;

    // last month
    if (i === termMonths - 1) {
      balancePennies -= balancePennies;
      continue;
    }

    balancePennies -= monthlyPaymentPennies;
  }

  // after iterations to avoid decimal calculations.
  plotData.totalInterestPaid /= 100;

  return plotData;
}

export default calcMortgageRepayment;