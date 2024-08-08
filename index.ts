const utils = require("@/utils/index");

interface PostBody {
  size: number;
  page: number;
  direction: "ASC" | "DESC";
  orderCond?: {
    type: "COMPONENT" | "DATE_CREATE" | "DATE_UPDATE" | "ID";
    condition?: Record<string, unknown>;
  };
  searchConds?: Array<{}>;
}

interface LanguageMap {
  KO: string;
  EN: string;
}

interface PostItemBody {
  publish: boolean;
  data: {
    id: LanguageMap;
    tagid: string;
    name: LanguageMap;
    description: LanguageMap;
    longdescription: LanguageMap;
    eng: boolean;
  };
}

class MemexFetcher {
  fetcher: any;

  constructor(token: string) {
    this.fetcher = {
      post: async (
        url: string,
        body: string,
        headers: Record<string, unknown> = {}
      ) => {
        const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": `${token}`,
            ...headers,
          },
          body,
        });

        return result;
      },
      get: async (url: string, headers: Record<string, unknown> = {}) => {
        const result = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": `${token}`,
            ...headers,
          },
        });

        return result;
      },
    };
  }

  post(url: string, body: PostBody) {
    return this.fetcher.post(url, body);
  }

  getList(
    projectId: string,
    modelKey: string,
    body: PostBody,
    headers?: Record<string, unknown>
  ) {
    return this.fetcher.post(
      `https://api.memexdata.io/memex/api/projects/${projectId}/models/${modelKey}/contents/search/v2`,
      body,
      headers
    );
  }

  getListLength(
    projectId: string,
    modelKey: string,
    body: PostBody,
    headers?: Record<string, unknown>
  ) {
    return this.fetcher.post(
      `https://api.memexdata.io/memex/api/projects/${projectId}/models/${modelKey}/contents/search/v2/count`,
      body,
      headers
    );
  }

  getItem(
    projectId: string,
    modelKey: string,
    itemUid: string,
    headers?: Record<string, unknown>
  ) {
    return this.fetcher.get(
      `https://api.memexdata.io/memex/api/projects/${projectId}/models/${modelKey}/contents/${itemUid}/v2`,
      headers
    );
  }

  postItem(
    projectId: string,
    modelKey: string,
    body: PostItemBody,
    headers?: Record<string, unknown>
  ) {
    return this.fetcher.post(
      `https://api.memexdata.io/memex/external/projects/${projectId}/models/${modelKey}/contents`,
      body,
      headers
    );
  }
}

/**
 * Create a MemexFetcher instance.
 * @param {string} token
 * @return {MemexFetcher}
 */
const createMemexFetcher = (token: string) => {
  return new MemexFetcher(token);
};

const Mf: {
  createMemexFetcher: (token: string) => MemexFetcher;
} = {
  createMemexFetcher,
  ...utils,
};

module.exports = Mf;

export = Mf;
