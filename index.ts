import axios from "axios";

import {
  deconstructLanguageMap,
  mapListItems,
  mapObjectProps,
  pipe,
  pluckData,
  pluckDataList,
  pluckList,
} from "./utils";

class MemexFetcher {
  fetcher: any;

  constructor(token: string) {
    this.fetcher = axios.create({
      headers: {
        "Access-Token": token,
      },
    });
  }

  post(url: string, data: Record<string, unknown>) {
    return this.fetcher.post(url, data);
  }
}

const createMemexFetcher = (token: string) => {
  return new MemexFetcher(token);
};

export default {
  createMemexFetcher,
  deconstructLanguageMap,
  mapListItems,
  mapObjectProps,
  pipe,
  pluckData,
  pluckDataList,
  pluckList,
};
