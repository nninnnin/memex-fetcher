const utils = require("../cjs/index.js");

const { pluckData, pluckList, pluckDataList } = utils;

test("Pluck data from object", () => {
  const data = {
    name: "Justin Lee",
  };

  expect(
    pluckData({
      data,
    })
  ).toBe(data);
});

test("Pluck list from object", () => {
  const list = [1, 2, 3];

  expect(
    pluckList({
      list,
    })
  ).toBe(list);
});

test("Pluck nested list from data object", () => {
  const list = [1, 2, 3];
  const data = {
    list,
  };

  expect(
    pluckDataList({
      data,
    })
  ).toBe(list);
});
