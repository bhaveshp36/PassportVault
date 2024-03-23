// routes/fileRouter.js
const express = require("express");
const { listAllObjects } = require("../common/s3Connector");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bucketName = process.env.S3_BUCKET_NAME;
    const objects = await listAllObjects(bucketName);

    // Create a map of all folders
    const folders = objects.reduce((acc, object) => {
      const parts = object.Key.split("/");
      const type = parts[parts.length - 1] === "" ? "folder" : "file";
      if (type === "folder") {
        const name = parts[parts.length - 2];
        acc[object.Key] = { id: object.Key, title: name, type, children: [] };
      }
      return acc;
    }, {});

    // Assign each file to its parent folder
    objects.forEach((object) => {
      const parts = object.Key.split("/");
      const type = parts[parts.length - 1] === "" ? "folder" : "file";
      if (type === "file") {
        const name = parts.pop();
        const parentFolderKey = parts.join("/") + "/";
        if (folders[parentFolderKey]) {
          folders[parentFolderKey].children.push({
            id: object.Key,
            title: name,
            type,
          });
        }
      }
    });

    // Convert the folders map to an array
    const files = Object.values(folders);

    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Error fetching files" });
  }
});

module.exports = router;
