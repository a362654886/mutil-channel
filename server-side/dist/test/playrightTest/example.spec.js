"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const channelTestFunctions_1 = require("./playwrightHelper/channelTestFunctions");
(0, test_1.test)("test", async ({ request }) => {
    const response = await (0, channelTestFunctions_1.filterChannel)(request, `testChannel`);
    (0, test_1.expect)(response.ok(), await response.text()).toBeTruthy();
});
