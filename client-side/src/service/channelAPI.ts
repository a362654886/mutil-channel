import { HOST } from "../common/const";
import http from "../tools/http";
import { Channel } from "../types/channelType";
import { GrubResponsePromise } from "../types/GrupResponse";

export const ChannelAPI = {
  createClient: (channel: Channel): GrubResponsePromise<number | null> =>
    http.post(`${HOST}channelInsert`, { channelBody: channel }),
  getChannelByPage: (
    sortType: string,
    sortAscend: boolean,
    page: number,
    pageSize: number
  ): Promise<{
    channels: Channel[];
    count: number;
  } | null> =>
    http.get(
      `${HOST}channelsGetByPage?sortType=${sortType}&sortAscend=${sortAscend}&page=${page}&pageSize=${pageSize}`
    ),
  getChannelBySearch: (
    name: string,
    sortType: string,
    sortAscend: boolean
  ): GrubResponsePromise<Channel[]> =>
    http.get(
      `${HOST}channelsGetBySearch?name=${name}&sortType=${sortType}&sortAscend=${sortAscend}`
    ),
  updateChannel: (channel: Channel): GrubResponsePromise<number | null> =>
    http.put(`${HOST}channelUpdate`, { channelBody: channel }),
  deleteChannel: (channelId: string): GrubResponsePromise<number | null> =>
    http.delete(`${HOST}channelDelete?channelId=${channelId}`),
};
