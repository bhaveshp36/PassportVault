//bucketConnector.js is a common file to connect to S3 bucket which is hosted on Tebi.io
//reference https://docs.tebi.io/code_examples/nodejs_sdk_v3.html
//reference https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html

import { config } from 'dotenv';
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

config();

const credentials = {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
};

// Create an S3 service client object.
const s3Client = new S3Client({
        endpoint: "https://s3.tebi.io",
        credentials: credentials,
        region: "global"
});

// List buckets
const buckets_data = await s3Client.send(
    new ListBucketsCommand({})
);
console.log(buckets_data);

export default s3Client;