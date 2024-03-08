# Mortgage repayment calculator

This is a web component widget for developers to embed on their websites if they want to provide users with a new feature to calculate mortgage repayments.

![Mockup showcasing widget within website skeleton layout on the side.](./mock.png "Mock of example")

## Developers

### How do I begin adding this to my website?

This component has one external dependency, which is a `45 KB` library [Lightweight Charts](https://www.tradingview.com/lightweight-charts/).

#### Setup instructions

1. Download the `MortgageRepaymentCalculator.js` file into your dependencies folder.
2. Import the Lightweight Charts CDN.
3. Import the web component source file.

**Example**

```html
<head>
  <!-- dependency -->
  <script type="text/javascript" src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
  <!-- component -->
  <script defer src="./MortgageRepaymentCalculator.js"></script>
</head>

<body>
  <!-- custom element -->
  <mortgage-repayment-calculator></mortgage-repayment-calculator>
</body>

```

### Configuration & Styling
You can customise the widget to align better with your website style.

See `config.js` to edit colors, radius, and fonts.

## Why is this a web component?

Web components are widely available in the top browsers _(i.e. Chrome, Edge, Firefore, and Safari)_. They allow for code encapsulation and they are not tied to a framework like React or Angular. This means the component will not affect your website and your website will not affect the component. Lastly, you will be able to use this component irrelevant of how your website is built _(i.e. framework or not)_.

You can read more about web components here: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
