import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
import {
  dbServiceCount,
  dbServiceDelete,
  dbServiceGetByPage,
  dbServiceGetWithoutPage,
  dbServiceInsert,
  dbServiceUpdate,
} from "../service/MongoDBService";
import { allTypes } from "../type/types";
import { getChannelSortType } from "../tools/sortFn";
import {
  Message,
  MessageGetByPagePara,
  MessageGetBySearchPara,
} from "../type/messageType";
import { DBTableName } from "../type/tableName";

/**
 * insert message to database
 * @param channelBody
 */
export const insertMessage = async (
  messageBody: Message
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<Message>(DBTableName.MESSAGE, messageBody);

/**
 * get messages according to sortType, sortAscend, channelId, page, pageSize
 * @param para
 */
export const getMessageByPage = async (
  para: MessageGetByPagePara
): Promise<{
  messages: Message[];
  count: number;
} | null> => {
  try {
    const sortBody = getChannelSortType(para.sortType, para.sortAscend);
    const messages = await dbServiceGetByPage<Message>(
      DBTableName.CHANNEL,
      { channelId: para.channelId },
      para.page,
      para.pageSize,
      sortBody
    );
    const count = await dbServiceCount(DBTableName.CHANNEL, {
      channelId: para.channelId,
    });
    return {
      messages: messages,
      count: count,
    };
  } catch (error) {
    return null;
  }
};

/**
 * filter messages according to title, timeStart, timeEnd, sortType, sortAscend
 * @param para
 */
export const getMessageBySearch = async (
  para: MessageGetBySearchPara
): Promise<Message[] | null> => {
  try {
    const sortBody = getChannelSortType(para.sortType, para.sortAscend);
    const filterBody = {
      title: new RegExp(para.title, "gi"),
      createAt: {
        $lt: para.timeEnd,
        $gt: para.timeStart,
      },
    };
    const messages = await dbServiceGetWithoutPage<Message>(
      DBTableName.MESSAGE,
      filterBody,
      sortBody
    );
    return messages;
  } catch (error) {
    return null;
  }
};

/**
 * update message
 * @param para
 */
export const updateMessage = async (
  messageBody: Message
): Promise<UpdateWriteOpResult> => {
  const filterObj = { _id: messageBody._id };
  const body = {
    $set: {
      title: messageBody.title,
      context: messageBody.context,
    },
  };
  return dbServiceUpdate<Record<string, unknown>>(
    DBTableName.MESSAGE,
    filterObj,
    body
  );
};

/**
 * delete message according to message id
 * @param para
 */
export const deleteMessage = async (
  messageId: string
): Promise<DeleteWriteOpResultObject | null> => {
  const messages: Message[] = await dbServiceGetWithoutPage<Message>(
    DBTableName.MESSAGE,
    {
      _id: messageId,
    },
    {}
  );
  console.log(messages);
  if (messages) {
    return dbServiceDelete<Message>(DBTableName.MESSAGE, messages[0]);
  } else {
    return null;
  }
};
