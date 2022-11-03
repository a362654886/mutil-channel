"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const channelTestFunctions_1 = require("./playwrightHelper/channelTestFunctions");
(0, test_1.test)("test channel functions", async ({ request }) => {
    const testChannel = {
        _id: `testChannel`,
        name: "testChannel",
    };
    // test add function
    await (0, channelTestFunctions_1.createChannel)(request, testChannel);
    // test if the new channel added success
    const addResponse = await (0, channelTestFunctions_1.filterChannel)(request, testChannel.name);
    (0, test_1.expect)(addResponse[0].name).toEqual(testChannel.name);
    // test delete function
    await (0, channelTestFunctions_1.deleteChannel)(request, testChannel._id);
    // test if the new channel deleted success
    const deleteResponse = await (0, channelTestFunctions_1.filterChannel)(request, testChannel.name);
    (0, test_1.expect)(deleteResponse).toEqual([]);
});
