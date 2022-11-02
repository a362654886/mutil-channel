import { Input, Modal } from "antd";
import * as React from "react";
import { useState } from "react";
import { Message } from "../../../../types/messageType";

interface IProps {
  channelId: string;
  addNewMessage: (message: Message) => void;
  close: () => void;
}

const NewMessage = ({
  channelId,
  addNewMessage,
  close,
}: IProps): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");

  const addMessage = () => {
    addNewMessage({
      channelId: channelId,
      createAt: new Date().valueOf(),
      title: title,
      context: context,
    });
  };

  return (
    <Modal
      title="Add New Message"
      open={true}
      onOk={addMessage}
      onCancel={close}
    >
      <h3>Title:</h3>
      <Input onChange={(v) => setTitle(v.target.value)} />
      <h3>Context:</h3>
      <Input onChange={(v) => setContext(v.target.value)} />
    </Modal>
  );
};

export default NewMessage;
