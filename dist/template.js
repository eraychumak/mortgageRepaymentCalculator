import styles from "./styles.js";

const htmlTemplate = document.createElement("template");

const html = `
${styles}
<header>
  <h1>Mortgage repayment calculator</h1>
  <p>Visualise it with a graph</p>
</header>
<form id="clientData">
  <section class="priceDepositInterest">
    <section class="inputField symbolLeft">
      <label for="housePrice">
        House price
        <span title="This is the total cost of the house you are buying or the amount that is left on your mortgage.">
          ?
        </span>
      </label>
      <p class="symbol">&pound;</p>
      <input
        id="housePrice"
        name="housePrice"
        placeholder="175,000"
        type="number"
        step="any"
        min="0"
        required
      />
    </section>
    <section class="inputField symbolLeft">
      <label for="deposit">
        Deposit
        <span title="This is the initial amount of money you are paying or will pay towards the house from your own savings.">
          ?
        </span>
      </label>
      <p class="symbol">&pound;</p>
      <input
        id="deposit"
        name="deposit"
        placeholder="30,000"
        type="number"
        min="0"
        required
      />
    </section>
    <section class="inputField symbolRight">
      <label for="interestRate">
        Interest rate
        <span title="The percentage of interest applied to your mortgage loan annually.">
          ?
        </span>
      </label>
      <p class="symbol">&percnt;</p>
      <input
        id="interestRate"
        name="interestRate"
        placeholder="4.82"
        type="number"
        step="any"
        min="0"
        required
      />
    </section>
  </section>
  <section class="mortgageTermField">
    <label for="mortgageTerm">
      Mortgage term
      <span title="This is the length of time you’ll take to pay off your mortgage.">
        ?
      </span>
    </label>
    <p><small>Quick select</small></p>
    <section class="quickSelect">
      <button class="btnUpdateMortgageTerm">25</button>
      <button class="btnUpdateMortgageTerm">30</button>
      <button class="btnUpdateMortgageTerm">35</button>
      <button class="btnUpdateMortgageTerm">40</button>
      <section class="inputField symbolRight">
        <p class="symbol">years</p>
        <input
          id="mortgageTerm"
          name="mortgageTerm"
          placeholder="35"
          type="number"
          step="1"
          min="1"
          required
        />
      </section>
    </section>
  </section>
  <label for="consent" class="consentField">
    <input id="consent" name="consent" type="checkbox" required/>
    I consent to use this data for calculating my repayment.
  </label>
  <button class="btnPrimary" type="submit">Calculate</button>
</form>
<section id="charts" class="hide">
  <nav>
    <button id="btnNavBalance" class="active">Balance</button>
    <button id="btnNavPayments">Payments</button>
  </nav>
  <article id="chartBalance" class="chart">
  </article>
  <article id="chartPayments" class="chart">
  </article>
  <section class="actions">
    <button id="btnEdit" class="btnSecondary">Edit my mortgage</button>
  </section>
</section>
`;

htmlTemplate.innerHTML = html;

export default htmlTemplate;