const housePrice = 180_000;
const deposit = 30_000;
const annualInterest = 4.125 / 100;

const termYears = 20;
const termMonths = termYears * 12;

let balance = housePrice - deposit;
let totalInterestPaid = 0;

const monthlyPayment = balance / termMonths;

console.log("Starting Balance:", balance);
console.log("Monthly repayment:", monthlyPayment);

for (let i = 0; i < termMonths; i++) {
  const interestForThisMonth = (balance * annualInterest) / 12;

  console.log(
    "Month:", i,
    "Balance:", balance,
    "Payment:", monthlyPayment,
    "Interest:", interestForThisMonth,
    "Total Payment:", monthlyPayment + interestForThisMonth
  );

  totalInterestPaid += interestForThisMonth;

  balance -= monthlyPayment;
}

console.log(
  "Remaining balance:", balance,
  "Total interest paid", totalInterestPaid
)