"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDelete = exports.messageUpdate = exports.messagesGetBySearch = exports.messagesGetByPage = exports.messageInsert = void 0;
const generateReturnBody_1 = require("../tools/generateReturnBody");
const messageController_1 = require("../controller/messageController");
/**
 * insert message handler
 */
const messageInsert = async (event, context) => {
    const { messageBody } = JSON.parse(event.body) || {};
    return (0, generateReturnBody_1.getResult)(messageBody, messageController_1.insertMessage, "success");
};
exports.messageInsert = messageInsert;
/**
 * get messages by page handler
 */
const messagesGetByPage = async (event, context) => {
    const { sortType, sortAscend, channelId, page, pageSize } = event.queryStringParameters;
    return (0, generateReturnBody_1.getResult)({
        sortType,
        sortAscend,
        channelId,
        page,
        pageSize,
    }, messageController_1.getMessageByPage);
};
exports.messagesGetByPage = messagesGetByPage;
/**
 * get messages by search handler
 */
const messagesGetBySearch = async (event, context) => {
    const { title, timeStart, timeEnd, sortType, sortAscend } = event.queryStringParameters;
    return (0, generateReturnBody_1.getResult)({ title, timeStart, timeEnd, sortType, sortAscend }, messageController_1.getMessageBySearch);
};
exports.messagesGetBySearch = messagesGetBySearch;
/**
 * update message handler
 */
const messageUpdate = async (event, context) => {
    const { messageBody } = JSON.parse(event.body) || {};
    return (0, generateReturnBody_1.getResult)(messageBody, messageController_1.updateMessage, "success");
};
exports.messageUpdate = messageUpdate;
/**
 * delete message handler
 */
const messageDelete = async (event, context) => {
    const { messageId } = event.queryStringParameters;
    console.log(messageId);
    return (0, generateReturnBody_1.getResult)(messageId, messageController_1.deleteMessage, "success");
};
exports.messageDelete = messageDelete;
