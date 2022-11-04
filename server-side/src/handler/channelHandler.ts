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

/**
 * insert Channel handler
 */
const channelInsert: Handler = async (event, context) => {
  const { channelBody } = JSON.parse(event.body) || {};
  return getResult<Channel, InsertOneWriteOpResult<allTypes>>(
    channelBody,
    insertChannel,
    "success"
  );
};

/**
 * get Channels by page handler
 */
const channelsGetByPage: Handler = async (event, context) => {
  const { sortType, sortAscend, page, pageSize } = event.queryStringParameters;
  return getResult<
    ChannelGetByPagePara,
    { channels: Channel[]; count: number } | null
  >(
    {
      sortType: sortType,
      sortAscend,
      page,
      pageSize,
    },
    getChanelByPage
  );
};

/**
 * get Channels by search handler
 */
const channelsGetBySearch: Handler = async (event, context) => {
  const { name, sortType, sortAscend } = event.queryStringParameters;
  console.log(name);
  return getResult<ChannelGetBySearchPara, Channel[] | null>(
    { name, sortType, sortAscend },
    getChanelBySearch
  );
};

/**
 * update Channel handler
 */
const channelUpdate: Handler = async (event, context) => {
  const { channelBody } = JSON.parse(event.body) || {};
  return getResult<Channel, UpdateWriteOpResult>(
    channelBody,
    updateChannel,
    "success"
  );
};

/**
 * delete Channel handler
 */
const channelDelete: Handler = async (event, context) => {
  const { channelId } = event.queryStringParameters;
  return getResult<string, DeleteWriteOpResultObject | null>(
    channelId,
    deleteChannel,
    "success"
  );
};

export {
  channelInsert,
  channelsGetByPage,
  channelsGetBySearch,
  channelUpdate,
  channelDelete,
};
