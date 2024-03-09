const styles = `
<style>
  /* Type scale used: Minor Second */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :host {
    display: block;
    border: solid 1px var(--color-outline);
    border-radius: var(--radius);
    color: var(--color-text-primary);
    height: 100%;
    width: 100%;
  }

  header {
    border-bottom: solid 1px var(--color-outline);
    padding: 1rem;

    h1 {
      font-size: 1.476rem;
    }

    p {
      margin-top: .5rem;
      color: var(--color-accent);
    }
  }

  p {
    font-size: 1rem;
  }

  small {
    font-size: .878rem;
    color: var(--color-text-secondary);
  }

  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
  }

  .priceDepositInterest {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
  }

  .inputField {
    display: grid;
    align-items: center;
    width: 100%;
    flex: 1;
    flex-basis: 150px;

    &:has(label) {
      gap: .5rem 0;
    }

    &.symbolLeft {
      grid-template-columns: auto 1fr;

      input {
        grid-column: 2;
        border-radius: 0 var(--radius) var(--radius) 0;
      }

      .symbol {
        grid-column: 1;
        border-radius: var(--radius) 0 0 var(--radius);
        border-right: 0;
      }
    }

    &.symbolRight {
      grid-template-columns: 1fr auto;

      input {
        grid-column: 1;
        border-radius: var(--radius) 0 0 var(--radius);
      }

      .symbol {
        grid-column: 2;
        border-radius: 0 var(--radius) var(--radius) 0;
        border-left: 0;
      }
    }

    .symbol {
      grid-row: 2;
      display: flex;
      align-items: center;
      padding: 0 .5rem;
      background: var(--color-onSurface);
      border: solid 1px var(--color-outline);
      height: 100%;
    }

    input {
      grid-row: 2;
      width: 100%;
      background: var(--color-onSurface);
      border: solid 1px var(--color-outline);
      border-radius: var(--radius);
      padding: .5rem;
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: .3rem;
    grid-column: 1 / 3;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .7rem;
      border: solid 1px #000;
      border-radius: 50%;
      width: .9rem;
      height: .9rem;
    }
  }

  .mortgageTermField {
    .quickSelect {
      display: flex;
      flex-wrap: wrap;
      margin-top: .5rem;
      align-items: center;
      justify-items: start;
      gap: .5rem;

      button {
        background: var(--color-onSurface);
        border: solid 1px var(--color-outline);
        border-radius: var(--radius);
        padding: .5rem;
        cursor: pointer;

        &:hover {
          background: var(--color-onSurfaceVariant);
        }
      }
    }
  }

  .consentField {
    display: flex;
    gap: 1rem;
  }

  button {
    font-weight: 600;
    padding: .5rem 1rem;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
  }

  .btnPrimary {
    background: var(--color-accent);
    align-self: flex-end;
    color: var(--color-text-btn-primary);
  }

  .btnSecondary {
    background: var(--color-btn-secondary);
  }


  #charts {
    display: none;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 100%;
    width: 100%;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  nav button {
    background: none;
    border: none;
    padding: .5rem 1rem;
    border-radius: var(--radius);
    cursor: pointer;

    &.active {
      background: var(--color-onSurfaceVariant);
    }
  }

  .chart {
    height: 200px;
    width: 100%;
    border: solid 1px var(--color-outline);
    border-radius: var(--radius);
    overflow: hidden;
  }

  #chartPayments {
    display: none;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: end;
  }
</style>
`;

export default styles;
