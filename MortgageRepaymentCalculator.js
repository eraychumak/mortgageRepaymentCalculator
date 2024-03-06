/*******************************************************************
 *
 * @author Eray Chumak
 *
 * This is a web component for a mortgage
 * repayment calculator.
 *
 * A config object has been created for
 * you to customise below.
 *
 * @example
 * In your HTML:
 * <head>
 *   <script defer src="./MortgageRepaymentCalculator.js"></script>
 * </head>
 * <body>
 *   <mortgage-repayment-calculator></mortgage-repayment-calculator>
 * </body>
 *
/******************************************************************/

const config = {
  hints: {
    housePrice: "This is the total cost of the house you are buying or the amount that is left on your mortgage.",
    deposit: "This is the initial amount of money you are paying or will pay towards the house from your own savings.",
    mortgageTerm: "This is the length of time you’ll take to pay off your mortgage.",
    interestRate: "The percentage of interest applied to your mortgage loan annually."
  }
}

// ------------------------------------------
// ! The code below is not meant to be edited
// ! for customisation, edit at your own risk
// ------------------------------------------

// ? Type Definitions - START

/**
 * @typedef {Object} PaymentMonth
 *
 * @property {Number} month - The current month.
 * @property {Number} time - yyyy-mm-dd for time series.
 * @property {Number} balance - The remaining mortgage balance.
 * @property {Number} principal - The principal payment.
 * @property {Number} interest - The interest payment.
 * @property {Number} paymentTotal - The principal and interest payment forming the total payment for the month.
 */

/**
 * @typedef {Object} PaymentPlan
 *
 * @property {Number} startingBalance - The starting mortgage balance.
 * @property {Number} principalMonthlyPayment - The monthly payments towards the mortgage.
 * @property {Number} totalInterestPaid - The total fixed interest that will be paid for borrowing.
 * @property {Array<PaymentMonth>} months - Collection of months spanning the mortgage term.
 */

// ? Type Definitions - END

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
function calculateRepaymentPlan(housePrice, deposit, interestAnnual, mortgageTerm) {
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
  }

  // plotting data requires time in format: yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0].split("-");
  let currentYear = parseInt(today[0]);

  // generate plotting data for each month
  for (let i = 0; i < termMonths; i++) {
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

  // after iterations to avoid decimal calculations.
  plotData.totalInterestPaid /= 100;

  return plotData;
}

const template = document.createElement("template");

template.innerHTML = `
  <header>
    <h1 id="test">Mortgage repayment calculator</h1>
    <p>Visualise it with a graph</p>
  </header>
  <form id="clientData">
    <section>
      <label for="housePrice">
        House price
        <span title="${config.hints.housePrice}">?</span>
      </label>
      <p>&pound;</p>
      <input id="housePrice" name="housePrice" type="text" required value="175000"/>
    </section>
    <section>
      <label for="deposit">
        Deposit
        <span title="${config.hints.deposit}">?</span>
      </label>
      <p>&pound;</p>
      <input id="deposit" name="deposit" type="text" required value="30000"/>
    </section>
    <section>
      <label for="interestRate">
        Interest rate
        <span title="${config.hints.interestRate}">?</span>
      </label>
      <p>&percnt;</p>
      <input id="interestRate" name="interestRate" type="text" required value="4.125"/>
    </section>
    <section>
      <label for="mortgageTerm">
        Mortgage term
        <span title="${config.hints.mortgageTerm}">?</span>
      </label>
      <fieldset>
        <legend>Quick select</legend>
        <button class="btnUpdateMortgageTerm">25</button>
        <button class="btnUpdateMortgageTerm">30</button>
        <button class="btnUpdateMortgageTerm">35</button>
        <button class="btnUpdateMortgageTerm">40</button>
      </fieldset>
      <fieldset>
        <legend>Enter custom amount</legend>
        <input id="mortgageTerm" name="mortgageTerm" type="text" required value="30"/>
        <p>years</p>
      </fieldset>
    </section>
    <section>
      <label for="consent">
        <input id="consent" name="consent" type="checkbox" required checked/>
        I consent to use this data for calculating my repayment.
      </label>
    </section>
    <button type="submit">Calculate</button>
  </form>
`;

class MortgageRepaymentCalculator extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: "open"
    });

    shadow.append(template.content.cloneNode(true));
  }

  connectedCallback() {
    const form = this.shadowRoot.getElementById("clientData");
    form.addEventListener("submit", this.onSubmit);

    const quickSelectBtns = this.shadowRoot.querySelectorAll(".btnUpdateMortgageTerm");

    quickSelectBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.shadowRoot.getElementById("mortgageTerm").value = e.target.innerText;
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const data = new FormData(this);

    localStorage.setItem("mrc-housePrice", data.get("housePrice"));
    localStorage.setItem("mrc-deposit", data.get("deposit"));
    localStorage.setItem("mrc-interestRate", data.get("interestRate"));
    localStorage.setItem("mrc-mortgageTerm", data.get("mortgageTerm"));
    localStorage.setItem("mrc-consent", data.get("consent"));
  }
}

customElements.define("mortgage-repayment-calculator", MortgageRepaymentCalculator);