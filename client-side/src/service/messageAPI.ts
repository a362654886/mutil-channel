import { HOST } from "../common/const";
import http from "../tools/http";
import { Channel } from "../types/channelType";
import { GrubResponsePromise } from "../types/GrupResponse";
import { Message } from "../types/messageType";

export const MessageAPI = {
  createMessage: (message: Message): GrubResponsePromise<number | null> =>
    http.post(`${HOST}messageInsert`, { messageBody: message }),
  getMessageByPage: (
    sortType: string,
    sortAscend: boolean,
    channelId: string,
    page: number,
    pageSize: number
  ): GrubResponsePromise<{
    messages: Message[];
    count: number;
  } | null> =>
    http.get(
      `${HOST}messagesGetByPage?sortType=${sortType}&sortAscend=${sortAscend}&channelId=${channelId}&page=${page}&pageSize=${pageSize}`
    ),
  getChannelBySearch: (
    title: string,
    timeStart: number,
    timeEnd: number,
    sortType: string,
    sortAscend: boolean
  ): GrubResponsePromise<Channel[]> =>
    http.get(
      `${HOST}messagesGetBySearch?title=${title}&timeStart=${timeStart}&timeEnd=${timeEnd}&sortType=${sortType}&sortAscend=${sortAscend}`
    ),
  updateMessage: (message: Message): GrubResponsePromise<number | null> =>
    http.put(`${HOST}messageUpdate`, { messageBody: message }),
  deleteMessage: (messageId: string): GrubResponsePromise<number | null> =>
    http.delete(`${HOST}messageDelete?messageId=${messageId}`),
};
