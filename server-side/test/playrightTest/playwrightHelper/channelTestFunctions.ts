import { APIRequestContext, expect } from "@playwright/test";
import { HOST } from "src/common/const";
import { Channel } from "src/type/channelType";

/**
 * test create channel
 * @param request
 * @param channelInfo
 */
export async function createChannel(
  request: APIRequestContext,
  channelInfo: Channel
) {
  // add new channel
  await request.post(`${HOST}/channelInsert`, {
    data: {
      channelBody: channelInfo,
    },
  });
}

/**
 * test get channel
 * @param request
 * @param channelName
 */
export async function filterChannel(
  request: APIRequestContext,
  channelName: string
) {
  const response = await request.get(
    `${HOST}/channelsGetBySearch?name=${channelName}&sortType=name&sortAscend=true`
  );
  const result = await response.json();
  return result;
}

/**
 * test delete channel
 * @param request
 * @param channelId
 */
export async function deleteChannel(
  request: APIRequestContext,
  channelId: string
) {
  await request.delete(`${HOST}/channelDelete?channelId=${channelId}`);
}
