"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelDelete = exports.channelUpdate = exports.channelsGetBySearch = exports.channelsGetByPage = exports.channelInsert = void 0;
const channelController_1 = require("../controller/channelController");
const generateReturnBody_1 = require("../tools/generateReturnBody");
const channelInsert = async (event, context) => {
    const { channelBody } = JSON.parse(event.body) || {};
    return (0, generateReturnBody_1.getResult)(channelBody, channelController_1.insertChannel, "success");
};
exports.channelInsert = channelInsert;
const channelsGetByPage = async (event, context) => {
    const { sortType, sortAscend, page, pageSize } = event.queryStringParameters;
    return (0, generateReturnBody_1.getResult)({
        sortType: sortType,
        sortAscend,
        page,
        pageSize,
    }, channelController_1.getChanelByPage);
};
exports.channelsGetByPage = channelsGetByPage;
const channelsGetBySearch = async (event, context) => {
    const { name, sortType, sortAscend } = event.queryStringParameters;
    console.log(name);
    return (0, generateReturnBody_1.getResult)({ name, sortType, sortAscend }, channelController_1.getChanelBySearch);
};
exports.channelsGetBySearch = channelsGetBySearch;
const channelUpdate = async (event, context) => {
    const { channelBody } = JSON.parse(event.body) || {};
    return (0, generateReturnBody_1.getResult)(channelBody, channelController_1.updateChannel, "success");
};
exports.channelUpdate = channelUpdate;
const channelDelete = async (event, context) => {
    const { channelId } = event.queryStringParameters;
    return (0, generateReturnBody_1.getResult)(channelId, channelController_1.deleteChannel, "success");
};
exports.channelDelete = channelDelete;
