import "@testing-library/jest-dom";

import { act, cleanup, render, waitFor, screen } from "@testing-library/react";
import { configureAppStore } from "../../../../store/configureStore";
import MockAdapter from "axios-mock-adapter";
import http from "tools/http";
import { Channel } from "types/channelType";
import { Provider } from "react-redux";
import NewChannel from "./NewChannel";
import { HOST } from "common/const";
import userEvent from "@testing-library/user-event";

describe("channel Test", () => {
  const mock = new MockAdapter(http);

  afterEach(() => {
    cleanup();
  });

  it("01 test add channel functions", async () => {
    // create store
    const store = configureAppStore();

    //mock get function
    mock
      .onGet(
        `http://localhost:3000/dev/channelsGetByPage?sortType=name&sortAscend=true&page=1&pageSize=5`
      )
      .reply(200, {
        message: "Successfully",
        data: {
          channels: [{ _id: "", name: "", messages: [] }],
          count: 1,
        },
        status: 200,
      });

    let newChannel: Channel | null = null;

    render(
      <Provider store={store}>
        <NewChannel
          addNewChannel={(channel: Channel) => {
            newChannel = channel;
          }}
          close={() => {}}
        />
      </Provider>
    );

    // 1.1   test get action
    store.dispatch({
      payload: { sortType: "name", sortAscend: true, page: 1 },
      type: "channels/getChannels",
    });

    await waitFor(() => {
      expect(store.getState().channels).toEqual({
        channels: [{ _id: "", name: "", messages: [] }],
        totalChannels: 0,
        filterPara: { sortType: "name", sortAscend: true, page: 1 },
      });
    });

    // 1.2   test new channel
    const channelName = screen.getByTestId("channelName");
    userEvent.type(channelName, "test channelName");
    const addChannel = screen.getByTestId("addChannel");
    userEvent.click(addChannel);

    await waitFor(() => {
      expect(newChannel?.name).toEqual(`test channelName`);
    });
  });
});
