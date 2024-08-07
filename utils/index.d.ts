export function pluckData(obj: Record<string, unknown>): unknown;
export function pluckList(obj: Record<string, unknown>): unknown;
export function pluckDataList(obj: Record<string, unknown>): unknown;
export function mapListItems(cb: () => void, list: Array<unknown>): unknown;
export function deconstructLanguageMap(
  obj: Record<string, unknown>,
  langauge: "KO" | "EN"
): string | undefined;
export function mapObjectProps(
  obj: Record<string, unknown>,
  keys: Array<unknown>,
  cb: () => void
): Record<string, unknown>;
export function pipe(..._: any[]): any[];
