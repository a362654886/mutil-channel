import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
import {
  dbServiceCount,
  dbServiceDelete,
  dbServiceDeleteMany,
  dbServiceGetWithoutPage,
  dbServiceInsert,
  dbServiceLookup,
  dbServiceUpdate,
} from "../service/MongoDBService";
import { allTypes } from "../type/types";
import {
  Channel,
  ChannelGetByPagePara,
  ChannelGetBySearchPara,
} from "../type/channelType";
import { getChannelSortType } from "../tools/sortFn";
import { DBTableName } from "../type/tableName";
import { getChannelWithMessageLookUpBody } from "../tools/lookup/getChannelWithMessageLookuo";
import { PAGE_SIZE } from "../common/const";

/**
 * insert Channel to database
 * @param channelBody
 */
export const insertChannel = async (
  channelBody: Channel
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<Channel>(DBTableName.CHANNEL, channelBody);

/**
 * get channels according to sortType, sortAscend, page, pageSize
 * @param para
 */
export const getChanelByPage = async (
  para: ChannelGetByPagePara
): Promise<{
  channels: Channel[];
  count: number;
} | null> => {
  try {
    const sortBody = getChannelSortType(para.sortType, para.sortAscend);
    const channels = await dbServiceLookup<Channel>(
      DBTableName.CHANNEL,
      getChannelWithMessageLookUpBody(PAGE_SIZE),
      para.page,
      para.pageSize,
      sortBody
    );
    const count = await dbServiceCount(DBTableName.CHANNEL, {});
    return {
      channels: channels,
      count: count,
    };
  } catch (error) {
    return null;
  }
};

/**
 * filter channels according to name, sortType, sortAscend
 * @param para
 */
export const getChanelBySearch = async (
  para: ChannelGetBySearchPara
): Promise<Channel[] | null> => {
  try {
    const sortBody = getChannelSortType(para.sortType, para.sortAscend);
    const channels = await dbServiceGetWithoutPage<Channel>(
      DBTableName.CHANNEL,
      { name: para.name },
      sortBody
    );
    return channels;
  } catch (error) {
    return null;
  }
};

/**
 * update channel
 * @param para
 */
export const updateChannel = async (
  channel: Channel
): Promise<UpdateWriteOpResult> => {
  const filterObj = { _id: channel._id };
  const body = {
    $set: {
      name: channel.name,
    },
  };
  return dbServiceUpdate<Record<string, unknown>>(
    DBTableName.CHANNEL,
    filterObj,
    body
  );
};

/**
 * delete channel according to channel id and also delete channel's messages 
 * @param para
 */
export const deleteChannel = async (
  channelId: string
): Promise<DeleteWriteOpResultObject | null> => {
  const channels: Channel[] = await dbServiceGetWithoutPage<Channel>(
    DBTableName.CHANNEL,
    {
      _id: channelId,
    },
    {}
  );

  if (channels) {
    //delete all messages related to deleted channel
    await dbServiceDeleteMany(DBTableName.MESSAGE, { channelId: channelId });

    return dbServiceDelete<Channel>(DBTableName.CHANNEL, channels[0]);
  } else {
    return null;
  }
};
