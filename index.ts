const axios = require("axios");

const {
  deconstructLanguageMap,
  mapListItems,
  mapObjectProps,
  pipe,
  pluckData,
  pluckDataList,
  pluckList,
} = require("./utils");

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

module.exports = {
  createMemexFetcher,
  deconstructLanguageMap,
  mapListItems,
  mapObjectProps,
  pipe,
  pluckData,
  pluckDataList,
  pluckList,
};
