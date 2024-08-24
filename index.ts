const utils = require("@/utils/index");

interface PostBody {
  size: number;
  page: number;
  direction?: "ASC" | "DESC";
  orderCond?: {
    type:
      | "COMPONENT"
      | "DATE_CREATE"
      | "DATE_UPDATE"
      | "ID";
    condition?: Record<string, unknown>;
  };
  searchConds?: Array<{}>;
}

interface Headers {
  [key: string]: string;
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

interface MemexUploadedResult {
  fileId: number;
  languageMap: null;
  type: string;
  value: string;
}

interface MediaCreationResult {
  id: number;
  file: {
    id: number;
    name: string;
    path: string;
  };
  languageMap: {
    KO: {
      name: string;
    };
  };
  mediaType: string;
  value: string;
}

class MemexFetcher {
  fetcher: any;

  constructor(token: string) {
    this.fetcher = {
      post: async (
        url: string,
        body:
          | PostBody
          | PostItemBody
          | string,
        headers: Headers = {}
      ) => {
        const bodyStringified =
          typeof body === "string"
            ? body
            : JSON.stringify(body);

        const result = await fetch(
          url,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              "Access-Token": `${token}`,
              ...headers,
            },
            body: bodyStringified,
          }
        );

        return result;
      },
      get: async (
        url: string,
        headers: Record<
          string,
          unknown
        > = {}
      ) => {
        const result = await fetch(
          url,
          {
            method: "GET",
            headers: {
              "Content-Type":
                "application/json",
              "Access-Token": `${token}`,
              ...headers,
            },
          }
        );

        return result;
      },
    };
  }

  post(
    url: string,
    body:
      | PostBody
      | PostItemBody
      | string
  ) {
    return this.fetcher.post(url, body);
  }

  getList(
    projectId: string,
    modelKey: string,
    body: PostBody | string,
    headers?: Headers
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
    headers?: Headers
  ) {
    return this.fetcher.post(
      `https://api.memexdata.io/memex/api/projects/${projectId}/models/${modelKey}/contents/search/v2/count`,
      {},
      headers
    );
  }

  getItem(
    projectId: string,
    modelKey: string,
    itemUid: string,
    headers?: Headers
  ) {
    return this.fetcher.get(
      `https://api.memexdata.io/memex/api/projects/${projectId}/models/${modelKey}/contents/${itemUid}/v2`,
      headers
    );
  }

  postItem(
    projectId: string,
    modelKey: string,
    body: PostItemBody | string,
    headers?: Headers
  ) {
    return this.fetcher.post(
      `https://api.memexdata.io/memex/external/projects/${projectId}/models/${modelKey}/contents`,
      body,
      headers
    );
  }

  getCategories(
    projectId: string,
    modelKey: string,
    headers: Record<
      string,
      unknown
    > = {}
  ) {
    return this.fetcher.get(
      `https://api.memexdata.io/memex/api/projects/${projectId}/models/${modelKey}/selectors`,
      headers
    );
  }

  async postMedia(
    projectId: string,
    file: File
  ) {
    try {
      // 4개의 단계를 거친다.
      const presignResult =
        await this._presignUrl(
          projectId,
          file.name
        );

      console.log(
        "presign result",
        presignResult
      );

      const {
        url,
        metadata,
        key: presignedKey,
      } = presignResult;

      const uploadResult =
        await this._uploadPresignedUrl(
          file,
          url,
          metadata
        );

      console.log(
        "upload result",
        uploadResult
      );

      if (!uploadResult) {
        throw new Error(
          "Failed to upload file"
        );
      }

      const saveFileResult =
        await this.saveFile(
          projectId,
          presignedKey
        );

      console.log(
        "saveFile result",
        saveFileResult
      );

      const mediaCreationResult =
        await this.createMedia(
          projectId,
          saveFileResult
        );

      console.log(
        "mediaCreation result",
        mediaCreationResult
      );

      return mediaCreationResult;
    } catch (error) {
      console.log(error);
    }
  }

  private async _presignUrl(
    projectId: string,
    filename: string
  ) {
    console.log(
      "filename to be presigned",
      filename
    );

    const res = await this.fetcher.post(
      `https://api.memexdata.io/memex/api/projects/${projectId}/files/access`,
      filename
    );

    return await res.json();
  }

  private async _uploadPresignedUrl(
    file: File,
    presignedUrl: string,
    metadata: {
      [key: string]: string;
    }
  ) {
    console.log(
      "presigned url",
      presignedUrl
    );

    const res = await fetch(
      presignedUrl,
      {
        method: "PUT",
        body: file,
        headers: {
          ...metadata,
        },
      }
    );

    return res.ok;
  }

  private async saveFile(
    projectId: string,
    presignedKey: string
  ) {
    const url = `https://api.memexdata.io/memex/api/projects/${projectId}/files/upload`;

    const res = await this.fetcher.post(
      url,
      presignedKey
    );

    return await res.json();
  }

  private async createMedia(
    projectId: string,
    uploadedResult: MemexUploadedResult
  ) {
    const url = `https://api.memexdata.io/memex/api/projects/${projectId}/media`;

    const filename =
      uploadedResult.value;

    const body = JSON.stringify({
      ...uploadedResult,
      languageMap: {
        KO: {
          name: filename,
          description: "",
        },
      },
    });

    const res = await this.fetcher.post(
      url,
      body
    );

    return (await res.json()) as MediaCreationResult;
  }
}

/**
 * Create a MemexFetcher instance.
 * @param {string} token
 * @return {MemexFetcher}
 */
const createMemexFetcher = (
  token: string
) => {
  return new MemexFetcher(token);
};

const Mf: {
  createMemexFetcher: (
    token: string
  ) => MemexFetcher;
} = {
  createMemexFetcher,
  ...utils,
};

module.exports = Mf;

export = Mf;
