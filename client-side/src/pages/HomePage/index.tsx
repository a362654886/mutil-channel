import { Button, Collapse, Pagination } from "antd";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_SIZE } from "../../common/const";
import { useChannels } from "../../hooks/useChannels";
import { Channel } from "../../types/channelType";
import { Message } from "../../types/messageType";
import { useChannelsSlice } from "./slice/channelsSlice";
import { selectChannels } from "./slice/channelsSlice/selectors";
import { StyledHMessageDiv, StyledHomePageDiv } from "./style";
import { DeleteOutlined } from "@ant-design/icons";
import NewChannel from "./components/NewChannel/NewChannel";
import NewMessage from "./components/NewMessage/NewMessage";

const { Panel } = Collapse;

const MainPage = (): JSX.Element => {
  const { actions: channelsActions } = useChannelsSlice();
  const channels = useSelector(selectChannels);

  const allChannels = useChannels();
  const dispatch = useDispatch();

  const [newChannelVisible, setNewChannelVisible] = useState<boolean>(false);
  const [newMessageVisible, setNewMessageVisible] = useState<boolean>(false);
  const [channelId, setChannelId] = useState<string>("");

  const addNewChannel = (channel: Channel) => {
    dispatch(channelsActions.addChannel(channel));
  };

  const addNewMessage = (message: Message) => {
    dispatch(
      channelsActions.addMessage({
        channelId: channelId,
        message: message,
      })
    );
  };

  const deleteMessage = (deleteChannelId: string, messageId: string) => {
    dispatch(
      channelsActions.deleteMessage({
        channelId: deleteChannelId,
        messageId: messageId,
      })
    );
  };

  const filterByPage = (page: number) => {
    const newFilterPara = {
      sortType: channels.filterPara.sortType,
      sortAscend: channels.filterPara.sortAscend,
      page: page,
    };
    dispatch(channelsActions.getChannels(newFilterPara));
  };

  return (
    <>
      <StyledHomePageDiv>
        <h1>multi-channel forum</h1>
        <Button onClick={() => setNewChannelVisible(true)}>
          Add New Channel
        </Button>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={(v) => {
            console.log(v);
          }}
        >
          {allChannels.channels.map((channel, index) => {
            return (
              <Panel header={channel.name} key={`${channel._id}${index}`}>
                <Button
                  onClick={() => {
                    setNewMessageVisible(true);
                    setChannelId(channel._id as string);
                  }}
                >
                  Add New Message
                </Button>
                {channel.messages &&
                  channel.messages.map((message) => {
                    return (
                      <div key={message._id}>
                        <StyledHMessageDiv>
                          <h6>{message.title}</h6>
                          <p>{new Date(message.createAt).toISOString()}</p>
                          <DeleteOutlined
                            onClick={() =>
                              deleteMessage(
                                channel._id as string,
                                message._id as string
                              )
                            }
                          />
                        </StyledHMessageDiv>
                        <p>{message.context}</p>
                      </div>
                    );
                  })}
              </Panel>
            );
          })}
        </Collapse>
        <Pagination
          current={channels.filterPara.page}
          total={channels.totalChannels}
          pageSize={PAGE_SIZE}
          onChange={(v) => filterByPage(v)}
        />
      </StyledHomePageDiv>
      {newChannelVisible && (
        <NewChannel
          addNewChannel={(channel: Channel) => addNewChannel(channel)}
          close={() => setNewChannelVisible(false)}
        />
      )}
      {newMessageVisible && (
        <NewMessage
          channelId={channelId}
          addNewMessage={(message: Message) => addNewMessage(message)}
          close={() => setNewMessageVisible(false)}
        />
      )}
    </>
  );
};

export default MainPage;
