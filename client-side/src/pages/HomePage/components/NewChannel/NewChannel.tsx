import { Button, Input, Modal } from "antd";
import { useChannels } from "hooks/useChannels";
import * as React from "react";
import { useState } from "react";
import { Channel } from "../../../../types/channelType";

interface IProps {
  addNewChannel: (channel: Channel) => void;
  close: () => void;
}

const NewChannel = ({ addNewChannel, close }: IProps): JSX.Element => {
  useChannels();

  const [channelName, setChannelName] = useState<string>("");

  const addChannel = () => {
    addNewChannel({
      _id: `${channelName}${new Date().valueOf()}`,
      name: channelName,
    });
    close();
  };

  return (
    <Modal
      title="Add New Channel"
      open={true}
      footer={
        <div>
          <Button data-testid="addChannel" onClick={() => addChannel()}>
            Submit
          </Button>
          <Button onClick={() => close()}>Cancel</Button>
        </div>
      }
      onCancel={close}
    >
      <h3>Name:</h3>
      <Input
        data-testid="channelName"
        onChange={(v) => setChannelName(v.target.value)}
      />
    </Modal>
  );
};

export default NewChannel;
