"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterChannel = exports.createChannel = void 0;
const const_1 = require("src/common/const");
/**
 * test create channel
 * @param request
 * @param channelInfo
 */
async function createChannel(request, channelInfo) {
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
 * @param channelInfo
 */
async function filterChannel(request, channelName) {
    const response = await request.get(`${const_1.HOST}/channelsGetBySearch?name=${channelName}&sortType=name&sortAscend=true`);
    return response;
}
exports.filterChannel = filterChannel;
