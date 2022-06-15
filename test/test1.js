const assert = require("assert");

let a = null;
let b = "0";
let c = 0;

it("test1", () => {
  assert.equal(a != null, false);
  assert.equal(a !== null, false);
  console.log(b != NaN);
  console.log(b !== NaN);
  console.log(c != NaN);
  console.log(c !== NaN);
  assert.equal(b == 0, true);
  assert.equal(b != 0, false);
  assert.equal(b === 0, false);
  assert.equal(b !== 0, true);
});

it("test2", () => {
  console.log(parseInt(b));
  console.log(parseInt("a"));
  console.log(parseInt(null));
});

it("test3", () => {
  console.log(typeof(null));
});


