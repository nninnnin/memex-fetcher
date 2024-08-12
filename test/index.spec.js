const path = require("path");
const { readFile } = require("fs/promises");

require("dotenv").config();
const Mf = require("../cjs/index");

const token = process.env.MEMEX_API_TOKEN;
const memexFetcher = Mf.createMemexFetcher(token);

test("리스트 가져오기", async () => {
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

test("아이템 가져오기", async () => {
  const PROJECT_ID = "71355a64";
  const MODEL_KEY = "small";
  const ITEM_UID = "e258f6b613744cc3be5fb5cd4aa8a4b9";

  const res = await memexFetcher.getItem(
    PROJECT_ID,
    MODEL_KEY,
    ITEM_UID
  );

  const result = await res.json();

  expect(result).toHaveProperty("uid");
  expect(result).toHaveProperty("order");
  expect(result).toHaveProperty("data");
});

describe("포스트 바디에 대한 테스트들", () => {
  it("포스트 바디를 string 타입으로 넣었을 때 정상적으로 작동한다", async () => {
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

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("list");
  });

  it("포스트 바디를 object 타입으로 넣었을 때 정상적으로 작동한다", async () => {
    const PROJECT_ID = "71355a64";
    const MODEL_KEY = "small";

    const res = await memexFetcher.getList(
      PROJECT_ID,
      MODEL_KEY,
      {
        size: 1000,
        page: 0,
      }
    );

    const result = await res.json();

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("list");
  });
});

test.only("Create media", async () => {
  const file = await readFile(
    path.join(__dirname + "/image.jpg")
  );

  console.log("image file", file);

  const blob = new Blob([file], {
    type: "application/octet-stream",
  });

  console.log("is blob?", blob);

  const PROJECT_ID = "71355a64";
  // const MODEL_KEY = "small";

  // const res = await memexFetcher.postMedia(
  //   PROJECT_ID,
  //   1
  // );

  // console.log("미디어 생성 결과", res);
});
