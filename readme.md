# Memex Fetcher

레벨나인의 자체 개발 CMS [미믹스(Memex)](https://memexdata.io/)에 저장된 데이터를 더 쉽고 편하게 사용할 수 있도록 돕는 유틸리티들을 사용해보세요.

## 데이터 요청을 더 쉽게

먼저 `createMemexFetcher` 를 사용해 `memexFetcher` 인스턴스를 생성합니다.

```
import { createMemexFetcher } from "memex-fetcher";

const memexFetcher = createMemexFetcher(token);
```

이후 다음과 같은 메서드를 사용해 미믹스의 데이터를 읽거나 수정할 수 있습니다.

### 데이터 읽기

```
getList(projectId, modelKey, body, [headers])
```

```
getListLength(projectId, modelKey, [body], [headers])
```

```
getItem(projectId, modelKey, itemUid, [headers])
```

```
getCategories(projectId, modelKey, [headers])
```

### 데이터 생성하기

```
postItem(projectId, modelKey, body, [headers])
```

```
postMedia(projectId, file)
```

### 데이터 수정하기

```
updateItem(projectId, modelKey, body, [headers])

** body에 수정하려는 row의 `uid` 를 함께 작성합니다.
```

## 편리한 데이터 포매팅

POST 요청으로 받아온 리스트를 포매팅 할 수 있는 메서드를 사용해보세요. `languageMap` 의 `KO` 값만을 가져오거나, `MediaInterface` 형태로 정의되어 있는 이미지 등을 간단한 형태로 포매팅시켜 가져올 수 있습니다.

### pluckList

`getList` 의 결과에서 `list` 객체만을 뽑아 사용할 수 있습니다.

```
type List = Array<ListItem>;
type ListResult = {
  list: List;
  pageInfo: { size: number, page: number, ... };
  validateAt: string;
};

const result: ListResult = await getList(...)
const list: List = pipe(result, pluckList)
```

### mapListItems

`map` 과 동일한 역할을 합니다. 리스트 아이템들을 매핑할 수 있습니다.  
curry가 적용되어있어 콜백의 지연평가를 이용한 데이터 포매팅 파이프라인 구축에 용이합니다.

```
const list = [1, 2, 3]

const addOne = (item) => {
  return item + 1
}

const result = pipe(
  list,
  mapListItems(addOne) // curried
)

console.log(result) // [2, 3, 4]
```

### flattenListItem

`list` 객체에 포함된 메타데이터와 `data` 객체를 평탄화시켜줍니다.

```
type Data = Record<string, unknown>

type ListItem = {
  uid: string;
  data: Data;
  createdAt: string;
  updateAt: string;
}

type FlattendItem = {
  uid: string;
  createdAt: string;
  updateAt: string;
} & Data

const flattenedItems: Array<FlattendItem> =
  pipe(
    result,
    pluckList,
    mapListItems(flattenListItem)
  )
```

`flattenListItem` 의 예제에서 볼 수 있는 것처럼, 위의 세가지 메서드 (pluckList, mapListItems, flattenListItem)을 함께 사용하면 미믹스에서 가져온 리스트 result를 메타데이터와 함께 평탄화되어 리스트 매핑을 통한 렌더링에 사용하기 좋은 데이터리스트 형태로 포매팅할 수 있습니다.

이후에는 각 아이템의 property를 원하는 형태로 포매팅하는 유틸리티가 필요할 것입니다.

### extractStringValues

```
type FlattendItem = {
  uid: string;
  createdAt: string;
  updateAt: string;
} & {
  name: LanguageMap;
  age: number;
  address: LanguageMap;
}

type FormattedItem = {
  uid: string;
  createdAt: string;
  updateAt: string;
} & {
  name: string;
  age: number;
  address: string;
}

const flattenedItems = pipe(...);

const formatted: Array<FormattedItem> = pipe(
  flattenedItems,
  extractStringValues(["name", "address"], "KO")
)
```

## Release Note

Feb 3, 2025 - version 1.4.4

- `PostItemBody` 의 data 타입에 특정 모델의 필드가 적용되어 있던 상황을 발견하여 `unknown` 타입으로 수정

Feb 24, 2025 - version 1.5.0

- 마이너 버전 업데이트: 유틸리티 메서드 업데이트와 문서화가 이루어졌습니다.
  - 새로운 유틸리티 메서드 추가
    - `flattenListItem`
    - `extractStringValues`
  - 유틸리티 메서드 타이핑 강화
    - 리턴타입 명시
  - 유틸리티 메서드 활용법 README에 문서화
