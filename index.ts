import axios from "axios";

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
    this.fetcher.post(url, data);
  }
}

const createMemexFetcher = (token: string) => {
  return new MemexFetcher(token);
};

export default {
  createMemexFetcher,
};
