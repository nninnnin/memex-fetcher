## 사용법

1. createMemexFetcher 를 사용해 memexFetcher 인스턴스를 생성합니다.

```
import { createMemexFetcher } from "memex-fetcher";

const memexFetcher = createMemexFetcher();
```

2. 생성된 인스턴스를 이용해 post 요청을 보낼 수 있습니다.

```
const response = await memexFetcher.post(url, data)
```

3. post 요청으로 받아온 리스트를 변형할 수 있는 메서드를 사용해보세요. languageMap의 KO 값만을 가져오거나, MediaInterface 형태로 정의되어 있는 이미지 등을 간단한 형태로 변형시켜 가져올 수 있습니다.

```
const convertedList = convertList(response, {
  pluckKO: true,
  pluckLanguageMap: true,
  ...
})
```
