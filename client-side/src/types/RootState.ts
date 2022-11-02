import { Channel, ChannelsFilterPara } from "./channelType";
import { Message } from "./messageType";

export interface RootState {
  channels?: {
    channels: Channel[];
    totalChannels: number;
    filterPara: ChannelsFilterPara;
  };
  message?: Message[];
}
