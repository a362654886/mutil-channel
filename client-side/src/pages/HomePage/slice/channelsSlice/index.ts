import {
  CaseReducerActions,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import {
  Channel,
  ChannelsFilterPara,
  ChannelsState,
} from "../../../../types/channelType";
import { cloneDeep } from "lodash";
import { channelsSaga } from "./saga";
import { Message } from "../../../../types/messageType";

export const initialState: ChannelsState = {
  channels: [{ _id: "", name: "", messages: [] }],
  totalChannels: 0,
  filterPara: { sortType: "name", sortAscend: true, page: 1 },
};

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    /*
    channel method
    */
    updateChannels(
      state,
      action: PayloadAction<{
        channels: Channel[];
        totalChannels: number;
      }>
    ) {
      const newState: ChannelsState = cloneDeep(state);
      newState.channels = action.payload.channels;
      newState.totalChannels = action.payload.totalChannels;
      return newState;
    },
    getChannels(state, action: PayloadAction<ChannelsFilterPara>) {
      const newState: ChannelsState = cloneDeep(state);
      newState.filterPara = action.payload;
      return newState;
    },
    addChannel(state, action: PayloadAction<Channel>) {
      const newState: ChannelsState = cloneDeep(state);
      //newState.channels.push(action.payload);
      return newState;
    },
    deleteChannel(state, action: PayloadAction<string>) {
      const newState: ChannelsState = cloneDeep(state);
      const index = newState.channels.findIndex(
        (channel) => channel._id === action.payload
      );
      newState.channels.splice(index, 1);
      return newState;
    },
    /*
     message method 
    */
    addMessage(
      state,
      action: PayloadAction<{
        channelId: string;
        message: Message;
      }>
    ) {
      // get channel id
      const newState: ChannelsState = cloneDeep(state);
      const channelIndex = newState.channels.findIndex(
        (channel) => channel._id === action.payload.channelId
      );
      // push message to channel's messages
      if (
        newState.channels[channelIndex] &&
        newState.channels[channelIndex].messages
      ) {
        (newState.channels[channelIndex].messages as Message[]).push(
          action.payload.message
        );
      }
      return newState;
    },
    // add message
    deleteMessage(
      state,
      action: PayloadAction<{
        channelId: string;
        messageId: string;
      }>
    ) {
      // get channel id
      const newState = cloneDeep(state);
      const channelIndex = newState.channels.findIndex(
        (channel: Channel) => channel._id === action.payload.channelId
      );
      // delete channel's message
      if (
        newState.channels[channelIndex] &&
        newState.channels[channelIndex].messages
      ) {
        const messages = newState.channels[channelIndex].messages as Message[];
        const messageIndex = messages.findIndex(
          (message) => (message._id as string) === action.payload.messageId
        );
        (newState.channels[channelIndex].messages as Message[]).splice(
          messageIndex,
          1
        );
      }
      return newState;
    },
  },
});
export const { actions, reducer, name: channelsSlice } = slice;

export const useChannelsSlice = (): {
  actions: CaseReducerActions<{
    updateChannels(
      state: ChannelsState,
      action: PayloadAction<{
        channels: Channel[];
        totalChannels: number;
      }>
    ): void;
    getChannels(
      state: ChannelsState,
      action: PayloadAction<ChannelsFilterPara>
    ): void;
    addChannel(state: ChannelsState, action: PayloadAction<Channel>): void;
    deleteChannel(state: ChannelsState, action: PayloadAction<string>): void;
    addMessage(
      state: ChannelsState,
      action: PayloadAction<{
        channelId: string;
        message: Message;
      }>
    ): void;
    deleteMessage(
      state: ChannelsState,
      action: PayloadAction<{
        channelId: string;
        messageId: string;
      }>
    ): void;
  }>;
} => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: channelsSaga });
  return { actions: slice.actions };
};
