/**
 * @param sortType
 * @param ascend
 */
export const getChannelSortType = (sortType: string, ascend: boolean): any => {
  switch (sortType) {
    case "name":
      return { name: ascend ? 1 : -1 };
    case "_id":
      return { _id: ascend ? 1 : -1 };
  }
};

/**
 * @param sortType
 * @param ascend
 */
export const getMessageSortType = (sortType: string, ascend: boolean): any => {
  switch (sortType) {
    case "time":
      return { createAt: ascend ? 1 : -1 };
    case "title":
      return { title: ascend ? 1 : -1 };
  }
};
