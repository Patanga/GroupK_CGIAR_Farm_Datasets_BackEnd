const assert = require("assert");

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

  it("正则", () => {
    const regex = new RegExp("^[\\w\\s]+$");
    console.log(regex);
    console.log(regex.test("hauts bassins"));
    assert.equal(regex.test(""), false);
    assert.equal(regex.test("A1 d在"), false);
    assert.equal(regex.test(" "), true);
    assert.equal(regex.test("12 3"), true);
    assert.equal(regex.test("A1 d"), true);
    assert.equal(regex.test(" A1 d "), true);
  });

  it("字符串", () => {
    // /regex/g 代表遍历整个字符串进行匹配
    const replaceStrGlobal = str => str.replace(/[_-]/g, " ");

    console.log(replaceStrGlobal("abd_d_a"));
    assert.equal(replaceStrGlobal("abd_d"), "abd d");
    assert.equal(replaceStrGlobal("abd-d"), "abd d");
    assert.equal(replaceStrGlobal("abd_d_a"), "abd d a");

    // /regex/ 没有g则只对字符串匹配一次
    const replaceStr = str => str.replace(/[_-]/, " ");
    console.log(replaceStr("abd-d-a"));
    assert.equal(replaceStr("abd_d_a"), "abd d_a");
  });

  it("test2", () => {
    console.log(parseInt(b));
    console.log(parseInt("1a"));
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


