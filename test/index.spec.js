const path = require("path");
const {
  readFileAsMimicFile,
} = require("./utils");

require("dotenv").config();
const Mf = require("../cjs/index");

const token =
  process.env.MEMEX_API_TOKEN;
const memexFetcher =
  Mf.createMemexFetcher(token);

test.skip("리스트 가져오기", async () => {
  const PROJECT_ID = "71355a64";
  const MODEL_KEY = "small";

  const res =
    await memexFetcher.getList(
      PROJECT_ID,
      MODEL_KEY,
      JSON.stringify({
        size: 1000,
        page: 0,
      })
    );

  const result = await res.json();

  expect(result).toHaveProperty("list");
  expect(result).toHaveProperty(
    "pageInfo"
  );
});

test.skip("아이템 가져오기", async () => {
  const PROJECT_ID = "71355a64";
  const MODEL_KEY = "small";
  const ITEM_UID =
    "e258f6b613744cc3be5fb5cd4aa8a4b9";

  const res =
    await memexFetcher.getItem(
      PROJECT_ID,
      MODEL_KEY,
      ITEM_UID
    );

  const result = await res.json();

  expect(result).toHaveProperty("uid");
  expect(result).toHaveProperty(
    "order"
  );
  expect(result).toHaveProperty("data");
});

describe.skip("포스트 바디에 대한 테스트들", () => {
  it("포스트 바디를 string 타입으로 넣었을 때 정상적으로 작동한다", async () => {
    const PROJECT_ID = "71355a64";
    const MODEL_KEY = "small";

    const res =
      await memexFetcher.getList(
        PROJECT_ID,
        MODEL_KEY,
        JSON.stringify({
          size: 1000,
          page: 0,
        })
      );

    const result = await res.json();

    expect(result).not.toBeNull();
    expect(result).toHaveProperty(
      "list"
    );
  });

  it("포스트 바디를 object 타입으로 넣었을 때 정상적으로 작동한다", async () => {
    const PROJECT_ID = "71355a64";
    const MODEL_KEY = "small";

    const res =
      await memexFetcher.getList(
        PROJECT_ID,
        MODEL_KEY,
        {
          size: 1000,
          page: 0,
        }
      );

    const result = await res.json();

    expect(result).not.toBeNull();
    expect(result).toHaveProperty(
      "list"
    );
  });
});

test.skip("미디어 생성하기", async () => {
  const file =
    await readFileAsMimicFile(
      path.join(
        __dirname + "/image.jpg"
      )
    );

  const PROJECT_ID = "cbbcc6cd";

  const res =
    await memexFetcher.postMedia(
      PROJECT_ID,
      file
    );

  console.log("미디어 생성 결과", res);
});

const memexFetcherADS =
  Mf.createMemexFetcher(
    "<안동선 프로젝트 토큰>"
  );

test.skip("아이템 업데이트", async () => {
  const PROJECT_ID = "cbbcc6cd"; // 안동선 프로젝트
  const MODEL_KEY = "articles";

  const res =
    await memexFetcherADS.updateItem(
      PROJECT_ID,
      MODEL_KEY,
      JSON.stringify({
        publish: true,
        uid: "dc619d4c681f4476b1de917f6eead27a",
        data: {
          title: {
            KO: "졸음이 밀려올 때 2",
          },
          articleType: [3952],
          contents:
            "<p>잘 시간이다 자자!!</p>",
          caption: "졸음에 대한 캡션..",
          credits:
            "Design and Developed by 이동규",
          producedAt: "2024.10",
          tags: [],
        },
      })
    );

  console.log("res", res);

  // const result = await res.json();

  // console.log("result", result);
});
