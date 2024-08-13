# Memex Fetcher

레벨나인의 자체 개발 CMS [미믹스(Memex)](https://memexdata.io/)에 저장된 데이터를 더 쉽고 편하게 사용할 수 있도록 돕는 유틸리티들을 사용해보세요.

## 데이터 요청을 더 쉽게

1. `createMemexFetcher` 를 사용해 `memexFetcher` 인스턴스를 생성합니다.

```
import { createMemexFetcher } from "memex-fetcher";

const memexFetcher = createMemexFetcher(token);
```

2. 다음과 같은 메서드를 사용해 미믹스의 데이터를 읽거나 수정할 수 있습니다.

- `getList`

- `getListLength`

- `getItem`

- `getCategories`

- `postItem`

## 편리한 데이터 변형

POST 요청으로 받아온 리스트를 변형할 수 있는 메서드를 사용해보세요. languageMap의 KO 값만을 가져오거나, MediaInterface 형태로 정의되어 있는 이미지 등을 간단한 형태로 변형시켜 가져올 수 있습니다.

```
const convertedList = convertList(response, {
  pluckKO: true,
  pluckLanguageMap: true,
  ...
})
```
