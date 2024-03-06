const housePrice = 175_000;
const deposit = 30_000;
const interestAnnual = 4.125 / 100;

const housePricePennies = Math.trunc(housePrice * 100);
const depositPennies = Math.trunc(deposit * 100);

const termYears = 30;
const termMonths = termYears * 12;

let balancePennies = housePricePennies - depositPennies;
let totalInterestPaidPennies = 0;

const monthlyPaymentPennies = Math.trunc(balancePennies / termMonths);

console.log("Starting Balance:", balance);
console.log("Monthly repayment:", monthlyPayment);

for (let i = 0; i < termMonths; i++) {
  const interestThisMonthPennies = Math.trunc(
    Math.trunc(balancePennies * interestAnnual) / 12
  );


  // last month, principal payment should be the remaining balance
  if (i === termMonths - 1) {
    currentMonth.principal = balancePennies / 100;
    currentMonth.paymentTotal = (balancePennies + interestThisMonthPennies) / 100;
  }

  plotData.months.push(currentMonth);
  plotData.totalInterestPaid += interestThisMonthPennies;

  totalInterestPaidPennies += interestThisMonthPennies;

  // last month
  if (i === termMonths - 1) {
    balancePennies -= balancePennies;
    // no iterations after this, therefore break instead of continue.
    break;
  }

  balancePennies -= monthlyPaymentPennies;
}
