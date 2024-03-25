declare const utils: {
  pluckData: (obj: Record<string, unknown>) => unknown;
  pluckList: (obj: Record<string, unknown>) => unknown;
  pluckDataList: (obj: Record<string, unknown>) => unknown;
  mapListItems: (cb: () => void, list: Array<unknown>) => unknown;
  deconstructLanguageMap: (
    obj: Record<string, unknown>,
    langauge: "KO" | "EN"
  ) => string | undefined;
  mapObjectProps: (
    obj: Record<string, unknown>,
    keys: Array<unknown>,
    cb: () => void
  ) => Record<string, unknown>;
};
