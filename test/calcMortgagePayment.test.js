import { expect } from '@esm-bundle/chai';
import calcMortgagePayment from '../dist/libs/calcMortgagePayment.js';

describe("calcMortgagePayment", () => {
  const data = calcMortgagePayment(175000, 30_000, 0.0482, 35);

  it("sets correct start balance", () => {
    expect(data.startingBalance).to.equal(145_000);
  });

  it("calculates correct monthly principal payment", () => {
    expect(data.principalMonthlyPayment).to.equal(345.23);
  });

  it("calculates correct total interest paid", () => {
    expect(data.totalInterestPaid).to.equal(122_599.4);
  });

  it("should have an extra month to show zero payments", () => {
    expect(data.months.length).to.equal((35 * 12) + 1);
  });

  it("last month should be zero", () => {
    expect(data.months[data.months.length - 1].paymentTotal).to.equal(0);
  });
});
