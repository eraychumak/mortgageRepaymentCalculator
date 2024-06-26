import calcMortgageRepayment from "./libs/calcMortgagePayment.js";
import config from "./config.js";
import htmlTemplate from "./template.js";

/**
 * A web component widget to calculate
 * mortgate repayments.
 *
 * @example
 * <head>
 *   <script defer src="./MortgageRepaymentCalculator.js"></script>
 * </head>
 * <body>
 *   <mortgage-repayment-calculator></mortgage-repayment-calculator>
 * </body>
 */
class MortgageRepaymentCalculator extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: "open"
    });

    shadow.append(htmlTemplate.content.cloneNode(true));
  }

  /**
   * Setup component when used/added in document
   */
  connectedCallback() {
    this.setupStyles();
    this.setupForm();
    this.setupBtnQuickSelect();
    this.setupBtnEdit();
    this.setupNav();
  }

  // ? The methods below are custom and are not lifecycle methods part of the HTMLElement.

  /**
   * Apply config values to component stylesheet
   * using CSS variables.
   */
  setupStyles() {
    this.style.fontFamily = config.fontFamily;

    this.style.setProperty("--color-accent", config.color.accent);
    this.style.setProperty("--color-outline", config.color.outline);
    this.style.setProperty("--color-onSurface", config.color.onSurface);
    this.style.setProperty("--color-onSurfaceVariant", config.color.onSurfaceVariant);
    this.style.setProperty("--color-text-primary", config.color.text.primary);
    this.style.setProperty("--color-text-secondary", config.color.text.secondary);
    this.style.setProperty("--color-btn-secondary", config.color.btn.secondary);
    this.style.setProperty("--color-text-btn-primary", config.color.text.btn.primary);
    this.style.setProperty("--color-text-btn-secondary", config.color.text.btn.secondary);

    this.style.setProperty("--radius", config.radius);
  }

  /**
   * Setup a listener for form submission.
   */
  setupForm() {
    const form = this.shadowRoot.getElementById("clientData");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const charts = this.shadowRoot.getElementById("charts");

      const form = this.shadowRoot.getElementById("clientData");
      const data = new FormData(form);

      localStorage.setItem("mrc-housePrice", data.get("housePrice"));
      localStorage.setItem("mrc-deposit", data.get("deposit"));
      localStorage.setItem("mrc-interestRate", data.get("interestRate"));
      localStorage.setItem("mrc-mortgageTerm", data.get("mortgageTerm"));
      localStorage.setItem("mrc-consent", data.get("consent"));

      this.generateGraph();

      charts.style.display = "flex";
      form.style.display = "none";
    });
  }

  /**
   * Iterate over quick select buttons for mortgage
   * term and setup a listener for each to update the
   * mortgage term input field.
   */
  setupBtnQuickSelect() {
    const quickSelectBtns = this.shadowRoot.querySelectorAll(".btnUpdateMortgageTerm");
    const inputMortgageTerm = this.shadowRoot.getElementById("mortgageTerm");

    quickSelectBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        inputMortgageTerm.value = e.target.innerText;
      });
    });
  }

  /**
   * Handle logic for hiding graphs and show
   * form to the user.
   */
  setupBtnEdit() {
    const btnEdit = this.shadowRoot.getElementById("btnEdit");

    btnEdit.addEventListener("click", (e) => {
      e.preventDefault();

      const form = this.shadowRoot.getElementById("clientData");
      const charts = this.shadowRoot.getElementById("charts");

      charts.style.display = "none";
      form.style.display = "flex"

      const chartBalance = this.shadowRoot.getElementById("chartBalance");
      const chartPayments = this.shadowRoot.getElementById("chartPayments");

      chartBalance.innerHTML = "";
      chartPayments.innerHTML = "";
    });
  }

  /**
   * Handle logic for switching between the
   * balance and payments graph.
   */
  setupNav() {
    const btnNavBalance = this.shadowRoot.getElementById("btnNavBalance");
    const btnNavPayments = this.shadowRoot.getElementById("btnNavPayments");

    const chartBalance = this.shadowRoot.getElementById("chartBalance");
    const chartPayments = this.shadowRoot.getElementById("chartPayments");

    btnNavBalance.addEventListener("click", () => {
      btnNavBalance.classList.add("active");
      btnNavPayments.classList.remove("active");

      chartBalance.style.display = "block";
      chartPayments.style.display = "none";
    });

    btnNavPayments.addEventListener("click", () => {
      btnNavPayments.classList.add("active");
      btnNavBalance.classList.remove("active");

      chartPayments.style.display = "block";
      chartBalance.style.display = "none";
    });
  }

  /**
   * Generate balance and payments graphs and
   * show them to the user.
   */
  generateGraph() {
    const housePrice = parseFloat(localStorage.getItem("mrc-housePrice"));
    const deposit = parseFloat(localStorage.getItem("mrc-deposit"));
    const annualInterest = parseFloat(localStorage.getItem("mrc-interestRate")) / 100;

    const termYears = parseFloat(localStorage.getItem("mrc-mortgageTerm"));

    const plotData = calcMortgageRepayment(housePrice, deposit, annualInterest, termYears);

    const chartContainerBalance = this.shadowRoot.getElementById("chartBalance");

    const chartBalance = LightweightCharts.createChart(chartContainerBalance, {
      autoSize: true,
    });

    const formatPrice = Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format;

    chartBalance.applyOptions({
      localization: {
        priceFormatter: formatPrice,
      },
    });

    const seriesInterestPaid = chartBalance.addLineSeries({
      title: "Total interest paid",
      color: "#465ec3"
    });

    seriesInterestPaid.setData(plotData.months.map((month, i) => {
      return {
        value: month.interestPaid,
        time: month.time
      }
    }));

    const seriesBalance = chartBalance.addLineSeries({
      title: "Mortgage balance",
      color: "#f16e51"
    });

    seriesBalance.setData(plotData.months.map(month => {
      return {
        value: month.balance,
        time: month.time
      }
    }));

    chartBalance.timeScale().fitContent();

    const chartContainerPayments = this.shadowRoot.getElementById("chartPayments");

    const chartPayments = LightweightCharts.createChart(chartContainerPayments, {
      autoSize: true
    });

    chartPayments.applyOptions({
      localization: {
        priceFormatter: formatPrice,
      },
    });

    const seriesTotal = chartPayments.addHistogramSeries({
      title: "Total payment",
      color: "#465ec3"
    });

    seriesTotal.setData(plotData.months.map(month => {
      return {
        value: month.paymentTotal,
        time: month.time
      }
    }));

    const seriesPrincipal = chartPayments.addHistogramSeries({
      title: "Principal payment",
      color: "#f9c5b9"
    });

    seriesPrincipal.setData(plotData.months.map(month => {
      return {
        value: month.principal,
        time: month.time
      }
    }));

    const seriesInterest = chartPayments.addHistogramSeries({
      title: "Interest payment",
      color: "#f16e51"
    });

    seriesInterest.setData(plotData.months.map(month => {
      return {
        value: month.interest,
        time: month.time
      }
    }));

    chartPayments.timeScale().fitContent();
  }
}

// web component HTML syntax definition
customElements.define("mortgage-repayment-calculator", MortgageRepaymentCalculator);