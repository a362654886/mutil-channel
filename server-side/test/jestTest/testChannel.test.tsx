import { dbObject } from "../../src/service/MongoDBService";

describe("test mongoDb connection", () => {
  it("test mongoDb connection", async () => {
    const users = await dbObject("users");

    const mockUser = { _id: "some-user-id", name: "John" };
    //await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });
});
