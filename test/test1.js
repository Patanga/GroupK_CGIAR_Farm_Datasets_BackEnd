const assert = require("assert");
const processor = require("../app/controllers/dataProcessor");
const dt = require("../data_test/data_test");

describe("数据类型相关", () => {
  let a = null;
  let b = "0";
  let c = 0;
  let d = "ss";

  it("比较运算", () => {
    assert.equal(a != null, false);
    assert.equal(a !== null, false);

    assert.equal(b != NaN, true);
    assert.equal(b !== NaN, true);
    assert.equal(c != NaN, true);
    assert.equal(c !== NaN, true);

    assert.equal(b == 0, true);
    assert.equal(b != 0, false);
    assert.equal(b === 0, false);
    assert.equal(b !== 0, true);
    console.log(b > 1);
    console.log(b < 1);
    console.log(d < 1);
  });

  it("test2", () => {
    console.log(parseInt(b));
    console.log(parseInt("a"));
    console.log(parseInt(null));
  });

  it("test3", () => {
    console.log(typeof(null));
  });
});

describe("对象", () => {
  let obj1 = {
    name: "apple",
    has: "name",
  }

  let a = "apple";
  let b = "name";
  let c = "has";

  it("test1", () => {
    assert.equal("apple" in obj1, false);
    assert.equal("name" in obj1, true);
    assert.equal("has" in obj1, true);
  });

});


