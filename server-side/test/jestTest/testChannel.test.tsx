import { dbObject } from "../../src/service/MongoDBService";

describe("insert", () => {
  it("should insert a doc into collection", async () => {
    const users = await dbObject("users");

    const mockUser = { _id: "some-user-id", name: "John" };
    //await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });
});
