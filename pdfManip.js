const PDFImage = require("pdf-image").PDFImage;
const AWS = require('aws-sdk');

const pdfManip = (key) => {
  console.log("DOne1")
AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
);
let s3 = new AWS.S3();
s3.getObject(
  { Bucket: process.env.S3_BUCKET, Key: key },
  function (error, data) {
    if (error != null) {
      alert("Failed to retrieve an object: " + error);
    } else {
      let file = data.Body 
      var pdfImage = new PDFImage(file, {convertOptions: {"-resize" : "300%",}
    });
    pdfImage.convertPage(0).then(function () {    
    console.log("DOne")
    });
    }
  }
);
}
module.exports = pdfManip;