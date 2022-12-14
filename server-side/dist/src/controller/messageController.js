"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.getMessageBySearch = exports.getMessageByPage = exports.insertMessage = void 0;
const MongoDBService_1 = require("../service/MongoDBService");
const sortFn_1 = require("../tools/sortFn");
const tableName_1 = require("../type/tableName");
/**
 * insert message to database
 * @param channelBody
 */
const insertMessage = async (messageBody) => (0, MongoDBService_1.dbServiceInsert)(tableName_1.DBTableName.MESSAGE, messageBody);
exports.insertMessage = insertMessage;
/**
 * get messages according to sortType, sortAscend, channelId, page, pageSize
 * @param para
 */
const getMessageByPage = async (para) => {
    try {
        const sortBody = (0, sortFn_1.getChannelSortType)(para.sortType, para.sortAscend);
        const messages = await (0, MongoDBService_1.dbServiceGetByPage)(tableName_1.DBTableName.CHANNEL, { channelId: para.channelId }, para.page, para.pageSize, sortBody);
        const count = await (0, MongoDBService_1.dbServiceCount)(tableName_1.DBTableName.CHANNEL, {
            channelId: para.channelId,
        });
        return {
            messages: messages,
            count: count,
        };
    }
    catch (error) {
        return null;
    }
};
exports.getMessageByPage = getMessageByPage;
/**
 * filter messages according to title, timeStart, timeEnd, sortType, sortAscend
 * @param para
 */
const getMessageBySearch = async (para) => {
    try {
        const sortBody = (0, sortFn_1.getChannelSortType)(para.sortType, para.sortAscend);
        const filterBody = {
            title: new RegExp(para.title, "gi"),
            createAt: {
                $lt: para.timeEnd,
                $gt: para.timeStart,
            },
        };
        const messages = await (0, MongoDBService_1.dbServiceGetWithoutPage)(tableName_1.DBTableName.MESSAGE, filterBody, sortBody);
        return messages;
    }
    catch (error) {
        return null;
    }
};
exports.getMessageBySearch = getMessageBySearch;
/**
 * update message
 * @param para
 */
const updateMessage = async (messageBody) => {
    const filterObj = { _id: messageBody._id };
    const body = {
        $set: {
            title: messageBody.title,
            context: messageBody.context,
        },
    };
    return (0, MongoDBService_1.dbServiceUpdate)(tableName_1.DBTableName.MESSAGE, filterObj, body);
};
exports.updateMessage = updateMessage;
/**
 * delete message according to message id
 * @param para
 */
const deleteMessage = async (messageId) => {
    const messages = await (0, MongoDBService_1.dbServiceGetWithoutPage)(tableName_1.DBTableName.MESSAGE, {
        _id: messageId,
    }, {});
    console.log(messages);
    if (messages) {
        return (0, MongoDBService_1.dbServiceDelete)(tableName_1.DBTableName.MESSAGE, messages[0]);
    }
    else {
        return null;
    }
};
exports.deleteMessage = deleteMessage;
