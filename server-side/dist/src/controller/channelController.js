"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChannel = exports.updateChannel = exports.getChanelBySearch = exports.getChanelByPage = exports.insertChannel = void 0;
const MongoDBService_1 = require("../service/MongoDBService");
const sortFn_1 = require("../tools/sortFn");
const tableName_1 = require("../type/tableName");
const const_1 = require("../const");
const getChannelWithMessageLookuo_1 = require("../tools/lookup/getChannelWithMessageLookuo");
const insertChannel = async (channelBody) => (0, MongoDBService_1.dbServiceInsert)(tableName_1.DBTableName.CHANNEL, channelBody);
exports.insertChannel = insertChannel;
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
const getChanelBySearch = async (para) => {
    try {
        const sortBody = (0, sortFn_1.getChannelSortType)(para.sortType, para.sortAscend);
        const channels = await (0, MongoDBService_1.dbServiceGetWithoutPage)(tableName_1.DBTableName.CHANNEL, { name: name }, sortBody);
        return channels;
    }
    catch (error) {
        return null;
    }
};
exports.getChanelBySearch = getChanelBySearch;
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
const deleteChannel = async (channelId) => {
    const anime = await (0, MongoDBService_1.dbServiceGetWithoutPage)(tableName_1.DBTableName.CHANNEL, {
        _id: channelId,
    }, {});
    if (anime) {
        return (0, MongoDBService_1.dbServiceDelete)(tableName_1.DBTableName.CHANNEL, anime[0]);
    }
    else {
        return null;
    }
};
exports.deleteChannel = deleteChannel;
