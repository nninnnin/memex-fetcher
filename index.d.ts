declare const memexFetcher: {
  createMemexFetcher: (token: string) => {
    post: (url: string, data: Record<string, unknown>) => void;
  };
};

export default memexFetcher;
