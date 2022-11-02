import AWS, { AWSError } from "aws-sdk";
import stream from "stream";

AWS.config.update({ region: "us-east-1" });

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });


/*
upload Image function
*/
export const uploadImage = (imgBase64: string, imageName: string) => {
  const uploadParams: {
    Bucket: string;
    Key: string;
    Body: any;
  } = { Bucket: "lei-swagger-bucket", Key: "", Body: "" };

  // Configure the file stream and obtain the upload parameters

  const base64Data = imgBase64.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = Buffer.from(base64Data, "base64");

  const bufferStream = new stream.PassThrough();
  bufferStream.end(dataBuffer);

  uploadParams.Body = bufferStream;
  uploadParams.Key = imageName;

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, (err: any, data: any) => {
    if (err) {
      console.log("Error upload");
    }
    if (data) {
      console.log("Upload Success");
    }
  });
};

/*
delete image function
*/

export const deleteImage = (imageName: string) => {
  const deleteParams: {
    Bucket: string;
    Key: string;
  } = { Bucket: "lei-swagger-bucket", Key: imageName };

  s3.deleteObject(deleteParams, (err: any, data: any) => {
    if (err) {
      console.log("Error delete");
    }
    if (data) {
      console.log("delete Success");
    }
  });
};