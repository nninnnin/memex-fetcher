const { pluckData } = require("../utils/index");

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
