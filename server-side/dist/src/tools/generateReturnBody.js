"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.generateReturnBody = void 0;
const generateReturnBody = (status, body) => {
    return {
        statusCode: status,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: body,
    };
};
exports.generateReturnBody = generateReturnBody;
const getResult = async (body, asyncFn, successInfo) => {
    try {
        const aBody = body;
        const result = await asyncFn(aBody);
        return (0, exports.generateReturnBody)(200, JSON.stringify(successInfo ? successInfo : result));
    }
    catch (error) {
        return (0, exports.generateReturnBody)(400, JSON.stringify(error.toString()));
    }
};
exports.getResult = getResult;
