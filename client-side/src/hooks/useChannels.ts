import { useDispatch, useSelector } from "react-redux";
import { useChannelsSlice } from "../pages/HomePage/slice/channelsSlice";
import { selectChannels } from "../pages/HomePage/slice/channelsSlice/selectors";
import { useEffect } from "react";
import { ChannelsState } from "types/channelType";

export const useChannels = () => {
  const { actions: channelsActions } = useChannelsSlice();
  const dispatch = useDispatch();
  const channels: ChannelsState = useSelector(selectChannels);

  useEffect(() => {
    if (channels.totalChannels === 0) {
      dispatch(
        channelsActions.getChannels({
          sortType: "name",
          sortAscend: true,
          page: 1,
        })
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return channels;
};
