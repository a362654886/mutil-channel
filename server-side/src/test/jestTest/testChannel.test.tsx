import {
  Collection,
  DeleteWriteOpResultObject,
  FilterQuery,
  InsertOneWriteOpResult,
  MongoClient,
  SortOptionObject,
  UpdateQuery,
  UpdateWriteOpResult,
} from "mongodb";
import { dbObject } from "../../service/MongoDBService";

describe("insert", () => {
  let connection: any;
  let db: any;

  it("should insert a doc into collection", async () => {
    const users = await dbObject("users");

    const mockUser = { _id: "some-user-id", name: "John" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });
});
