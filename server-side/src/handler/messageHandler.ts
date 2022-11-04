import { Handler } from "aws-lambda";
import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
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

/**
 * insert message handler
 */
const messageInsert: Handler = async (event, context) => {
  const { messageBody } = JSON.parse(event.body) || {};
  return getResult<Message, InsertOneWriteOpResult<allTypes>>(
    messageBody,
    insertMessage,
    "success"
  );
};

/**
 * get messages by page handler
 */
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

/**
 * get messages by search handler
 */
const messagesGetBySearch: Handler = async (event, context) => {
  const { title, timeStart, timeEnd, sortType, sortAscend } =
    event.queryStringParameters;
  return getResult<MessageGetBySearchPara, Message[] | null>(
    { title, timeStart, timeEnd, sortType, sortAscend },
    getMessageBySearch
  );
};

/**
 * update message handler
 */
const messageUpdate: Handler = async (event, context) => {
  const { messageBody } = JSON.parse(event.body) || {};
  return getResult<Message, UpdateWriteOpResult>(
    messageBody,
    updateMessage,
    "success"
  );
};

/**
 * delete message handler
 */
const messageDelete: Handler = async (event, context) => {
  const { messageId } = event.queryStringParameters;
  console.log(messageId)
  return getResult<string, DeleteWriteOpResultObject | null>(
    messageId,
    deleteMessage,
    "success"
  );
};

export {
  messageInsert,
  messagesGetByPage,
  messagesGetBySearch,
  messageUpdate,
  messageDelete,
};
