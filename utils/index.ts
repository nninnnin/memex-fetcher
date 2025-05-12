import { go } from "fxjs";
import { curry } from "@fxts/core";
import Curry from "@fxts/core/dist/types/types/Curry";

import {
  LanguageMap,
  MediaInterface,
  RelationInterface,
} from "../types/memex";

type ObjectWithData<
  Data = {
    [key: string]: unknown;
  }
> = {
  [key: string]: unknown;
  data: Data;
};

type ListItem = {
  uid: string;
  data: Record<string, unknown>;
  createdAt: string;
  updateAt: string;
};
type List = Array<ListItem>;

type ObjectWithList = {
  [key: string]: any;
  list: List;
};

export const pluckData = <Data>(
  obj: ObjectWithData<Data>
): Data => {
  return obj.data;
};

export const pluckList = (
  obj: ObjectWithList
): List => {
  return obj.list;
};

export const pluckDataList = (
  obj: ObjectWithData<ObjectWithList>
) => {
  return go(obj, pluckData, pluckList);
};

export const flattenListItem =
  (listItem: {
    uid: string;
    data: Record<string, unknown>;
    createdAt: string;
    updateAt: string;
  }) => {
    return {
      uid: listItem.uid,
      ...listItem.data,
      createdAt: listItem.createdAt,
      updateAt: listItem.updateAt,
    };
  };

type MapListItemsFn = Curry<
  <ListItem, MappedItem>(
    cb: (item: ListItem) => MappedItem,
    list: Array<ListItem>
  ) => Array<MappedItem>
>;

export const mapListItems: MapListItemsFn =
  curry(
    <ListItem, MappedItem>(
      cb: (
        item: ListItem
      ) => MappedItem,
      list: Array<ListItem>
    ): Array<MappedItem> => {
      return go(list, (list) =>
        list.map(cb)
      );
    }
  );

export const mapListItemsAsync: Curry<
  (cb, list) => Promise<typeof list>
> = curry(
  async (cb, list) =>
    await Promise.all(list.map(cb))
);

export const deconstructLanguageMap = (
  obj,
  language
) => {
  return obj.languageMap[language];
};

export const mapObjectProps = (
  obj,
  keys,
  cb
) => {
  const mappedProps = go(keys, (keys) =>
    keys.reduce((acc, key) => {
      acc[key] = cb(obj[key]);
      return acc;
    }, {})
  );

  return {
    ...obj,
    ...mappedProps,
  };
};

type ExtractStringValuesFn = Curry<
  <PropKeys = Array<string>>(
    propKeys: PropKeys,
    language: "KO",
    item: Record<string, unknown>
  ) => {
    [K in keyof PropKeys]: PropKeys[K] extends string
      ? string
      : unknown;
  }
>;

export const extractStringValues: ExtractStringValuesFn =
  curry(
    (
      propKeys: string[],
      language: "KO",
      item: Record<string, unknown>
    ) => {
      return mapObjectProps(
        item,
        propKeys,
        (value: LanguageMap) => {
          return value[language];
        }
      );
    }
  );

export const deconstructMedia = (
  mediaList: MediaInterface[]
) => {
  return mediaList.map((media) => {
    return {
      mediaType: media.mediaType,
      filename: media.file.name,
      fileType: media.fileType,
      filePath: media.file.path,
      fileMeta: media.file.meta,
    };
  });
};

export const deconstructRelations = (
  relations: RelationInterface[]
) => {
  return relations.map((relation) => {
    return {
      uid: relation.uid,
      key: relation.languageMap.KO,
    };
  });
};

export const pipe = go;
