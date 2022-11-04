import { test, expect } from "@playwright/test";

test("homepage has title and links to intro page", async ({ page }) => {
  //1. go to test page
  await page.goto("https://master.d1svl08733sozm.amplifyapp.com/");

  //2. simulate the add operation
  await page.getByRole("button", { name: "Add New Channel" }).click();
  await page.getByPlaceholder("New Channel Name").fill("test NewChannel");

  //3. get the data form add api result
  const [addResult] = await Promise.all([
    page.waitForResponse((response) =>
      response.url().includes("channelInsert")
    ),
    await page.getByRole("button", { name: "Submit" }).click(),
  ]);

  //4. format add result
  const _addResult = await addResult.json();
  //5. add result should be 'success'
  expect(_addResult).toEqual("success");

  //6. get the data form get api result
  const [getResult] = await Promise.all([
    page.waitForResponse((response) =>
      response.url().includes("channelsGetByPage")
    ),
  ]);

  //7. format get result 
  const _getResult = await getResult.json();

  //8. get result should have item which name ===  test NewChannel
  expect(
    _getResult.channels
      .map((item) => item.name)
      .findIndex((e) => e == "test NewChannel") !== -1
  ).toBeTruthy();

  //9. simulate delete
  const [deleteResult] = await Promise.all([
    page.waitForResponse((response) =>
      response.url().includes("channelDelete")
    ),
    await page.getByRole("button", { name: "delete test NewChannel" }).click(),
  ]);

  //10. delete result should be 'success'
  const _deleteResult = await deleteResult.json();
  expect(_deleteResult).toEqual("success");
});
