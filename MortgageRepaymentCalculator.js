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