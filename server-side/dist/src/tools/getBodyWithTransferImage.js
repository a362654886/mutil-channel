"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBodyWithTransferImage = void 0;
const awsImageHandler_1 = require("../AWS/awsImageHandler");
/*
this function will upload image(bas64 format) to aws s3,
and then get the image link,
and then save this link as image.
so web can directly load the image link to show it
*/
const getBodyWithTransferImage = (body) => {
    const image = body["image"];
    if (image) {
        const name = `${body["name"]}awsImg.png`;
        (0, awsImageHandler_1.uploadImage)(image, name);
        body["image"] = `https://lei-swagger-bucket.s3.amazonaws.com/${name}`;
    }
    return body;
};
exports.getBodyWithTransferImage = getBodyWithTransferImage;
