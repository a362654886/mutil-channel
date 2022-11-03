"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbServiceDeleteMany = exports.dbServiceCount = exports.dbServiceLookup = exports.dbServiceDelete = exports.dbServiceUpdate = exports.dbServiceInsert = exports.dbServiceGetWithoutPage = exports.dbServiceGetByPage = exports.dbObject = void 0;
const mongodb_1 = require("mongodb");
const dbConnectionUrl = "mongodb+srv://leilu0229:AAaa123581321@cluster0.vm8df.mongodb.net/?retryWrites=true&w=majority";
const dbObject = async (dbCollectionName) => {
    const dbInstance = await mongodb_1.MongoClient.connect(dbConnectionUrl);
    const dbObject = dbInstance.db("multi-channel");
    const dbCollection = dbObject.collection(dbCollectionName);
    return dbCollection;
};
exports.dbObject = dbObject;
//query
const dbServiceGetByPage = async (tableName, searchKey, page, pageSize, sort) => {
    const result = await (0, exports.dbObject)(tableName);
    return result
        .find(searchKey)
        .sort(sort)
        .skip(pageSize * (page - 1))
        .limit(pageSize * 1)
        .toArray();
};
exports.dbServiceGetByPage = dbServiceGetByPage;
const dbServiceGetWithoutPage = async (tableName, searchKey, sort) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.find(searchKey).sort(sort).toArray();
};
exports.dbServiceGetWithoutPage = dbServiceGetWithoutPage;
const dbServiceInsert = async (tableName, body) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.insertOne(body);
};
exports.dbServiceInsert = dbServiceInsert;
const dbServiceUpdate = async (tableName, filter, body) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.updateOne(filter, body);
};
exports.dbServiceUpdate = dbServiceUpdate;
const dbServiceDelete = async (tableName, body) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.deleteOne(body);
};
exports.dbServiceDelete = dbServiceDelete;
const dbServiceDeleteMany = async (tableName, matchBody) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.deleteMany(matchBody);
};
exports.dbServiceDeleteMany = dbServiceDeleteMany;
const dbServiceCount = async (tableName, searchKey) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.count(searchKey);
};
exports.dbServiceCount = dbServiceCount;
const dbServiceLookup = async (tableName, lookupObj, page, pageSize, sort) => {
    const collection = await (0, exports.dbObject)(tableName);
    return collection
        .aggregate(lookupObj)
        .sort(sort)
        .skip(pageSize * (page - 1))
        .limit(pageSize * 1)
        .toArray();
};
exports.dbServiceLookup = dbServiceLookup;
