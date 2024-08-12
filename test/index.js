const mf = require("../cjs/index.js");

const { pipe, pluckData, pluckList, mapListItems } =
  mf;

const fetcher = mf.createMemexFetcher("token");

(async () => {
  const PROJECT_ID = "034eb90b";
  const MODEL_KEY = "plainthird";

  // 1. 가져오기
  const res = await fetcher.getListLength(
    PROJECT_ID,
    MODEL_KEY,
    JSON.stringify({
      size: 10,
      page: 0,
    })
  );

  const result = await res.json();

  // 2. 포매팅
  const formattedResult = pipe(
    result,
    pluckData,
    pluckList,
    mapListItems((item) => {
      console.log(item);
    })
  );

  console.log("원하는 결과", formattedResult);
})();
