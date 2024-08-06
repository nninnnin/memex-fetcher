const axios = require("axios");

const {
  deconstructLanguageMap,
  mapListItems,
  mapObjectProps,
  pipe,
  pluckData,
  pluckDataList,
  pluckList,
} = require("@utils");

class MemexFetcher {
  fetcher: any;

  constructor(token: string, headers: Record<string, unknown> = {}) {
    this.fetcher = {
      post: async (url: string, body) => {
        const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": `${token}`,
            ...headers,
          },
          body,
        });

        console.log("fetched", result);

        return result;
      },
    };
  }

  post(url: string, data: Record<string, unknown>) {
    return this.fetcher.post(url, data);
  }
}

/**
 * Create a MemexFetcher instance.
 * @param {string} token
 * @return {MemexFetcher}
 */
const createMemexFetcher = (
  token: string,
  headers: Record<string, unknown> = {}
) => {
  return new MemexFetcher(token, headers);
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
