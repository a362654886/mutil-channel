import { Message } from "./messageType";

export type Channel = {
  _id?: string;
  name: string;
  messages?: Message[];
};

export type ChannelsFilterPara = {
  sortType: string;
  sortAscend: boolean;
  page: number;
};

export type ChannelsState = {
  channels: Channel[];
  totalChannels: number;
  filterPara: ChannelsFilterPara;
};
