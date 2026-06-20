const express = require("express");

const {
  PutObjectCommand
} = require("@aws-sdk/client-s3");

const {
  getSignedUrl
} = require("@aws-sdk/s3-request-presigner");

const s3Client = require("../config/s3");

const router = express.Router();

router.get("/presigned-url", async (req, res) => {

  const fileName = req.query.fileName;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: fileName
  });

  const url = await getSignedUrl(
    s3Client,
    command,
    { expiresIn: 300 }
  );

  res.json({
    uploadUrl: url
  });
});

module.exports = router;
