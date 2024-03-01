//bucketConnector.js is a common file to connect to S3 bucket which is hosted on Tebi.io
//reference https://docs.tebi.io/code_examples/nodejs_sdk_v3.html
//reference https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html
import { S3Client } from "@aws-sdk/client-s3";
import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const credentials = {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
};

// Create an S3 service client object.
const s3Client = new S3Client({
        endpoint: "https://s3.tebi.io",
        credentials: credentials,
        region: "global"
});

// List buckets
const buckets_data = await s3Client.send(new ListBucketsCommand({}));
console.log(buckets_data);



