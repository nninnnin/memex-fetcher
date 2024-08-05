export function createMemexFetcher(token: string): {
  post: (url: string, data: Record<string, unknown>) => void;
};
