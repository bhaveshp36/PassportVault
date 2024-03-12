//bucketConnector.js is a common file to connect to S3 bucket which is hosted on Tebi.io
//reference https://docs.tebi.io/code_examples/nodejs_sdk_v3.html
//reference https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html
const { S3Client } = require("@aws-sdk/client-s3");
const {
  ListObjectsCommand,
  ListBucketsCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

// Create an S3 service client object.
const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentials,
  region: "global",
});

// List buckets
async function listBuckets() {
  try {
    const bucketsData = await s3Client.send(new ListBucketsCommand({}));
    console.log(bucketsData);
    return bucketsData;
  } catch (error) {
    console.error("Error listing buckets:", error);
    throw error;
  }
}

async function listAllObjects(bucketName) {
  try {
    // Use ListObjectsCommand to get a list of objects in the bucket
    const objects = await s3Client.send(
      new ListObjectsCommand({ Bucket: bucketName })
    );
    console.log(objects);
    return objects.Contents;
  } catch (error) {
    console.error("Error listing objects in the bucket:", error);
    throw error;
  }
}

async function putFile(
  bucketName = process.env.S3_BUCKET_NAME,
  folderName,
  fileName,
  fileContent
) {
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${fileName}`,
    Body: fileContent,
  };

  try {
    const response = await s3Client.send(new PutObjectCommand(params));
    console.log(
      `File ${fileName} uploaded successfully to S3 bucket ${bucketName}`
    );
    return response;
  } catch (error) {
    console.error(
      `Error uploading file ${fileName} to S3 bucket ${bucketName}:`,
      error
    );
    throw error;
  }
}

module.exports = {
  listAllObjects,
  listBuckets,
  putFile,
};

// Example usage:
// const bucketName = "my-bucket";
// const folderName = "my-folder";
// const fileName = "my-file.txt";
// const fileContent = "Hello, world!";

// // await putFileToS3Bucket(bucketName, folderName, fileName, fileContent);
