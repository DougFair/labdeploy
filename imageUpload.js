const express = require("express");
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');
const app = express();


aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2',
});
app.use(bodyParser.json());

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3:s3,
    bucket: process.env.S3_BUCKET,
    metadata: function (req, file, cb) {

      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const fileName = Date.now().toString() + "-" + file.originalname;
      cb(null, fileName);
    }
  })
});

module.exports = upload