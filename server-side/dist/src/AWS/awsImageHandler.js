"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const stream_1 = tslib_1.__importDefault(require("stream"));
aws_sdk_1.default.config.update({ region: "us-east-1" });
const s3 = new aws_sdk_1.default.S3({ apiVersion: "2006-03-01" });
/*
upload Image function
*/
const uploadImage = (imgBase64, imageName) => {
    const uploadParams = { Bucket: "lei-swagger-bucket", Key: "", Body: "" };
    // Configure the file stream and obtain the upload parameters
    const base64Data = imgBase64.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = Buffer.from(base64Data, "base64");
    const bufferStream = new stream_1.default.PassThrough();
    bufferStream.end(dataBuffer);
    uploadParams.Body = bufferStream;
    uploadParams.Key = imageName;
    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, (err, data) => {
        if (err) {
            console.log("Error upload");
        }
        if (data) {
            console.log("Upload Success");
        }
    });
};
exports.uploadImage = uploadImage;
/*
delete image function
*/
const deleteImage = (imageName) => {
    const deleteParams = { Bucket: "lei-swagger-bucket", Key: imageName };
    s3.deleteObject(deleteParams, (err, data) => {
        if (err) {
            console.log("Error delete");
        }
        if (data) {
            console.log("delete Success");
        }
    });
};
exports.deleteImage = deleteImage;
