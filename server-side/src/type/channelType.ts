import { Message } from "./messageType";

type Channel = {
  _id: string;
  name: string;
  messages?: Message[];
};

type ChannelGetByPagePara = {
  sortType: string;
  sortAscend: boolean;
  page: number;
  pageSize: number;
};

type ChannelGetBySearchPara = {
  name: string;
  sortType: string;
  sortAscend: boolean;
};

export { Channel, ChannelGetByPagePara, ChannelGetBySearchPara };
