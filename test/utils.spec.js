const Mf = require("../cjs/index.js");

const {
  pluckData,
  pluckList,
  pluckDataList,
  mapListItems,
  flattenListItem,
  pipe,
  extractStringValues,
} = Mf;

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

test("Basic example of list fetching result formatting", () => {
  const list = [
    {
      uid: "abc",
      createdAt: "2021-09-01",
      updateAt: "2021-09-01",
      data: {
        name: "Justin",
        age: 35,
        address: "Seoul",
      },
    },
    {
      uid: "def",
      createdAt: "2021-09-01",
      updateAt: "2021-09-01",
      data: {
        name: "Whitney",
        age: 28,
        address: "New York",
      },
    },
  ];

  const result = {
    list,
    pageInfo: { size: 100 },
    validateAt: "2021-09-01",
  };

  const formatted = pipe(
    result,
    pluckList,
    mapListItems(flattenListItem)
  );

  expect(formatted).toEqual([
    {
      uid: "abc",
      createdAt: "2021-09-01",
      updateAt: "2021-09-01",
      name: "Justin",
      age: 35,
      address: "Seoul",
    },
    {
      uid: "def",
      createdAt: "2021-09-01",
      updateAt: "2021-09-01",
      name: "Whitney",
      age: 28,
      address: "New York",
    },
  ]);
});

test("Basic example of formatting list item", () => {
  const flattenedListItem = {
    uid: "def",
    createdAt: "2021-09-01",
    updateAt: "2021-09-01",
    name: {
      EN: "Whitney",
      KO: "휘트니",
    },
    age: 28,
    address: {
      EN: "New York",
      KO: "뉴욕",
    },
  };

  const list = [flattenedListItem];

  const formatted = pipe(
    list,
    mapListItems(
      extractStringValues(
        ["name", "address"],
        "KO"
      )
    )
  );

  expect(formatted).toEqual([
    {
      uid: "def",
      createdAt: "2021-09-01",
      updateAt: "2021-09-01",
      name: "휘트니",
      age: 28,
      address: "뉴욕",
    },
  ]);
});
