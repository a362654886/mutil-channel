import { call, put, select, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { actions as channelsAction } from ".";
import { Channel, ChannelsFilterPara } from "../../../../types/channelType";
import { GrubResponse } from "../../../../types/GrupResponse";
import { PAGE_SIZE } from "../../../../common/const";
import { ChannelAPI } from "../../../../service/channelAPI";
import { RootState } from "../../../../types/RootState";
import { MessageAPI } from "../../../../service/messageAPI";
import { Message } from "../../../../types/messageType";

export function* getChannelsAsync(action: PayloadAction<ChannelsFilterPara>) {
  try {
    const updatedChannels: GrubResponse<{
      channels: Channel[];
      count: number;
    } | null> = yield call(() =>
      ChannelAPI.getChannelByPage(
        action.payload.sortType,
        action.payload.sortAscend,
        action.payload.page,
        PAGE_SIZE
      )
    );
    if (updatedChannels.data) {
      const { channels, count } = updatedChannels.data;
      yield put(
        channelsAction.updateChannels({
          channels: channels,
          totalChannels: count,
        })
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    // yield put(statusActions.loading(false));
  }
}

export function* addChannelAsync(action: PayloadAction<Channel>) {
  try {
    yield call(() => ChannelAPI.createClient(action.payload));
    const state: RootState = yield select();
    if (state.channels) {
      yield put(channelsAction.getChannels(state.channels.filterPara));
    }
  } catch (err) {
    console.log(err);
  } finally {
    // yield put(statusActions.loading(false));
  }
}

export function* addMessageAsync(
  action: PayloadAction<{
    channelId: string;
    message: Message;
  }>
) {
  try {
    yield call(() => MessageAPI.createMessage(action.payload.message));
  } catch (err) {
    console.log(err);
  } finally {
    // yield put(statusActions.loading(false));
  }
}

export function* deleteMessageAsync(
  action: PayloadAction<{
    channelId: string;
    messageId: string;
  }>
) {
  try {
    yield call(() => MessageAPI.deleteMessage(action.payload.messageId));
  } catch (err) {
    console.log(err);
  } finally {
    // yield put(statusActions.loading(false));
  }
}
export function* deleteChannelAsync(action: PayloadAction<string>) {
  try {
    yield call(() => ChannelAPI.deleteChannel(action.payload));
  } catch (err) {
    console.log(err);
  } finally {
    // yield put(statusActions.loading(false));
  }
}

export function* channelsSaga() {
  yield takeLatest(channelsAction.getChannels.type, getChannelsAsync);
  yield takeLatest(channelsAction.addChannel.type, addChannelAsync);
  yield takeLatest(channelsAction.addMessage.type, addMessageAsync);
  yield takeLatest(channelsAction.deleteMessage.type, deleteMessageAsync);
  yield takeLatest(channelsAction.deleteChannel.type, deleteChannelAsync);
}
