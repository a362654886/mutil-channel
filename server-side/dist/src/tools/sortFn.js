"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageSortType = exports.getChannelSortType = void 0;
const getChannelSortType = (sortType, ascend) => {
    switch (sortType) {
        case "name":
            return { name: ascend ? 1 : -1 };
        case "_id":
            return { _id: ascend ? 1 : -1 };
    }
};
exports.getChannelSortType = getChannelSortType;
const getMessageSortType = (sortType, ascend) => {
    switch (sortType) {
        case "time":
            return { createAt: ascend ? 1 : -1 };
        case "title":
            return { title: ascend ? 1 : -1 };
    }
};
exports.getMessageSortType = getMessageSortType;
