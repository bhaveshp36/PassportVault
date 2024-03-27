const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const members = mongoose.connection.collection("members");

router.get("/", async (req, res) => {
  const searchTerm = req.query.q;
  try {
    const result = await members
      .aggregate([
        {
          $search: {
            index: "member",
            text: {
              query: searchTerm,
              path: "givenName", // Specify fields to search in
            },
          },
        },
      ])
      .toArray();
    res.json(result);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "An error occurred while searching." });
  }
});

module.exports = router;
