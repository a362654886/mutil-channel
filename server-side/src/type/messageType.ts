type Message = {
  _id: string;
  channelId: string;
  createAt: number;
  title: string;
  context: string;
};

type MessageGetByPagePara = {
  sortType: string;
  sortAscend: boolean;
  channelId: string;
  page: number;
  pageSize: number;
};

type MessageGetBySearchPara = {
  title: string;
  timeStart: number;
  timeEnd: number;
  sortType: string;
  sortAscend: boolean;
};

export { Message, MessageGetByPagePara, MessageGetBySearchPara };
