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
import { PAGE_SIZE } from "../const";
import { getChannelWithMessageLookUpBody } from "../tools/lookup/getChannelWithMessageLookuo";

export const insertChannel = async (
  channelBody: Channel
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<Channel>(DBTableName.CHANNEL, channelBody);

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

export const deleteChannel = async (
  channelId: string
): Promise<DeleteWriteOpResultObject | null> => {
  const anime: Channel[] = await dbServiceGetWithoutPage<Channel>(
    DBTableName.CHANNEL,
    {
      _id: channelId,
    },
    {}
  );

  if (anime) {
    return dbServiceDelete<Channel>(DBTableName.CHANNEL, anime[0]);
  } else {
    return null;
  }
};
