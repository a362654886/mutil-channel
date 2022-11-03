"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChannel = exports.filterChannel = exports.createChannel = void 0;
const const_1 = require("src/common/const");
/**
 * test create channel
 * @param request
 * @param channelInfo
 */
async function createChannel(request, channelInfo) {
    // add new channel
    await request.post(`${const_1.HOST}/channelInsert`, {
        data: {
            channelBody: channelInfo,
        },
    });
}
exports.createChannel = createChannel;
/**
 * test get channel
 * @param request
 * @param channelName
 */
async function filterChannel(request, channelName) {
    const response = await request.get(`${const_1.HOST}/channelsGetBySearch?name=${channelName}&sortType=name&sortAscend=true`);
    const result = await response.json();
    return result;
}
exports.filterChannel = filterChannel;
/**
 * test delete channel
 * @param request
 * @param channelId
 */
async function deleteChannel(request, channelId) {
    await request.delete(`${const_1.HOST}/channelDelete?channelId=${channelId}`);
}
exports.deleteChannel = deleteChannel;
