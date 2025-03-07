require("dotenv").config();
const mf = require("../cjs/index.js");

const token =
  process.env.MEMEX_API_TOKEN ?? "";

console.log("token", token);

const fetcher =
  mf.createMemexFetcher(token);

const PROJECT_ID = "c757ac54";
const MODEL_KEY = "people";

test("Create and Delete item", async () => {
  const result = await fetcher.postItem(
    PROJECT_ID,
    MODEL_KEY,
    {
      publish: true,
      data: {
        name: { KO: "Justin Lee" },
        age: "35",
        address: "Seoul",
      },
    }
  );

  const createdItemId =
    await result.text();

  console.log(
    "createdItemId: ",
    createdItemId
  );

  const deletedResult =
    await fetcher.deleteItem(
      PROJECT_ID,
      MODEL_KEY,
      {
        uid: createdItemId,
      }
    );

  console.log(
    "deletedResult: ",
    await deletedResult.text()
  );
});
