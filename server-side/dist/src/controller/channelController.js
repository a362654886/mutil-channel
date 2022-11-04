"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChannel = exports.updateChannel = exports.getChanelBySearch = exports.getChanelByPage = exports.insertChannel = void 0;
const MongoDBService_1 = require("../service/MongoDBService");
const sortFn_1 = require("../tools/sortFn");
const tableName_1 = require("../type/tableName");
const getChannelWithMessageLookuo_1 = require("../tools/lookup/getChannelWithMessageLookuo");
const const_1 = require("../common/const");
/**
 * insert Channel to database
 * @param channelBody
 */
const insertChannel = async (channelBody) => (0, MongoDBService_1.dbServiceInsert)(tableName_1.DBTableName.CHANNEL, channelBody);
exports.insertChannel = insertChannel;
/**
 * get channels according to sortType, sortAscend, page, pageSize
 * @param para
 */
const getChanelByPage = async (para) => {
    try {
        const sortBody = (0, sortFn_1.getChannelSortType)(para.sortType, para.sortAscend);
        const channels = await (0, MongoDBService_1.dbServiceLookup)(tableName_1.DBTableName.CHANNEL, (0, getChannelWithMessageLookuo_1.getChannelWithMessageLookUpBody)(const_1.PAGE_SIZE), para.page, para.pageSize, sortBody);
        const count = await (0, MongoDBService_1.dbServiceCount)(tableName_1.DBTableName.CHANNEL, {});
        return {
            channels: channels,
            count: count,
        };
    }
    catch (error) {
        return null;
    }
};
exports.getChanelByPage = getChanelByPage;
/**
 * filter channels according to name, sortType, sortAscend
 * @param para
 */
const getChanelBySearch = async (para) => {
    try {
        const sortBody = (0, sortFn_1.getChannelSortType)(para.sortType, para.sortAscend);
        const channels = await (0, MongoDBService_1.dbServiceGetWithoutPage)(tableName_1.DBTableName.CHANNEL, { name: para.name }, sortBody);
        return channels;
    }
    catch (error) {
        return null;
    }
};
exports.getChanelBySearch = getChanelBySearch;
/**
 * update channel
 * @param para
 */
const updateChannel = async (channel) => {
    const filterObj = { _id: channel._id };
    const body = {
        $set: {
            name: channel.name,
        },
    };
    return (0, MongoDBService_1.dbServiceUpdate)(tableName_1.DBTableName.CHANNEL, filterObj, body);
};
exports.updateChannel = updateChannel;
/**
 * delete channel according to channel id and also delete channel's messages
 * @param para
 */
const deleteChannel = async (channelId) => {
    const channels = await (0, MongoDBService_1.dbServiceGetWithoutPage)(tableName_1.DBTableName.CHANNEL, {
        _id: channelId,
    }, {});
    if (channels) {
        //delete all messages related to deleted channel
        await (0, MongoDBService_1.dbServiceDeleteMany)(tableName_1.DBTableName.MESSAGE, { channelId: channelId });
        return (0, MongoDBService_1.dbServiceDelete)(tableName_1.DBTableName.CHANNEL, channels[0]);
    }
    else {
        return null;
    }
};
exports.deleteChannel = deleteChannel;
