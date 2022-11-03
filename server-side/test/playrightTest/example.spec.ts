import { test, expect } from "@playwright/test";
import {
  createChannel,
  deleteChannel,
  filterChannel,
} from "./playwrightHelper/channelTestFunctions";

test("test channel functions", async ({ request }) => {
  const testChannel = {
    _id: `testChannel`,
    name: "testChannel",
  };

  // test add function
  await createChannel(request, testChannel);
  // test if the new channel added success
  const addResponse = await filterChannel(request, testChannel.name);
  expect(addResponse[0].name).toEqual(testChannel.name);
  // test delete function
  await deleteChannel(request, testChannel._id);
  // test if the new channel deleted success
  const deleteResponse = await filterChannel(request, testChannel.name);
  expect(deleteResponse).toEqual([]);
});
