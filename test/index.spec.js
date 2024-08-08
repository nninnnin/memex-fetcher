require("dotenv").config();
const Mf = require("../cjs/index");

const token = process.env.MEMEX_API_TOKEN;
const memexFetcher = Mf.createMemexFetcher(token);

test("fetching list", async () => {
  const PROJECT_ID = "71355a64";
  const MODEL_KEY = "small";

  const res = await memexFetcher.getList(
    PROJECT_ID,
    MODEL_KEY,
    JSON.stringify({
      size: 1000,
      page: 0,
    })
  );

  const result = await res.json();

  expect(result).toHaveProperty("list");
  expect(result).toHaveProperty("pageInfo");
});

test.only("fetching item", async () => {
  const PROJECT_ID = "71355a64";
  const MODEL_KEY = "small";
  const ITEM_UID = "e258f6b613744cc3be5fb5cd4aa8a4b9";

  const res = await memexFetcher.getItem(PROJECT_ID, MODEL_KEY, ITEM_UID);

  const result = await res.json();

  expect(result).toHaveProperty("uid");
  expect(result).toHaveProperty("order");
  expect(result).toHaveProperty("data");
});
