import { expect } from '@esm-bundle/chai';
import { toPence, toPounds } from '../dist/libs/utils.js';

it("converts pound to pence", () => {
  expect(toPence(10.32)).to.equal(1032);
});

it("converts pence to pounds", () => {
  expect(toPounds(1032)).to.equal(10.32);
});