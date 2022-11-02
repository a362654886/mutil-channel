import { Handler } from "aws-lambda";
import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
import {
  deleteChannel,
  getChanelByPage,
  getChanelBySearch,
  insertChannel,
  updateChannel,
} from "../controller/channelController";
import {
  Channel,
  ChannelGetByPagePara,
  ChannelGetBySearchPara,
} from "../type/channelType";
import { allTypes } from "../type/types";
import { getResult } from "../tools/generateReturnBody";
import {
  deleteMessage,
  getMessageByPage,
  getMessageBySearch,
  insertMessage,
  updateMessage,
} from "../controller/messageController";
import {
  Message,
  MessageGetByPagePara,
  MessageGetBySearchPara,
} from "../type/messageType";

const messageInsert: Handler = async (event, context) => {
  const { messageBody } = JSON.parse(event.body) || {};
  return getResult<Message, InsertOneWriteOpResult<allTypes>>(
    messageBody,
    insertMessage
  );
};

const messagesGetByPage: Handler = async (event, context) => {
  const { sortType, sortAscend, channelId, page, pageSize } =
    event.queryStringParameters;
  return getResult<
    MessageGetByPagePara,
    { messages: Message[]; count: number } | null
  >(
    {
      sortType,
      sortAscend,
      channelId,
      page,
      pageSize,
    },
    getMessageByPage
  );
};

const messagesGetBySearch: Handler = async (event, context) => {
  const { title, timeStart, timeEnd, sortType, sortAscend } =
    event.queryStringParameters;
  return getResult<MessageGetBySearchPara, Message[] | null>(
    { title, timeStart, timeEnd, sortType, sortAscend },
    getMessageBySearch
  );
};

const messageUpdate: Handler = async (event, context) => {
  const { messageBody } = JSON.parse(event.body) || {};
  return getResult<Message, UpdateWriteOpResult>(messageBody, updateMessage);
};

const messageDelete: Handler = async (event, context) => {
  const { messageId } = event.queryStringParameters;
  return getResult<string, DeleteWriteOpResultObject | null>(
    messageId,
    deleteMessage
  );
};

export {
  messageInsert,
  messagesGetByPage,
  messagesGetBySearch,
  messageUpdate,
  messageDelete,
};
