export const getChannelWithMessageLookUpBody = (pageSize: string) => {
  const filterBody: Record<string, unknown>[] = [
    {
      $lookup: {
        from: "message",
        as: "messages",
        let: { indicator_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$channelId", "$$indicator_id"] },
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
        messages: {
          _id: 1,
          channelId: 1,
          createAt: 1,
          title: 1,
          context: 1,
        },
      },
    },
  ];

  return filterBody;
};
