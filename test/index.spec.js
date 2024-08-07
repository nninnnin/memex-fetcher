const Mf = require("../cjs/index");

const { pluckList } = Mf;

test("Pluck list from object", () => {
  const list = [1, 2, 3];

  expect(
    pluckList({
      list,
    })
  ).toBe(list);
});
