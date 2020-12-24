const aws = require('aws-sdk');

const deleteS3 = (req,res, next, path) => {
    console.log("path" + path)
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-2',
    });   
    var params = {  Bucket: process.env.S3_BUCKET, Key: path };

    const s3 = new aws.S3();

    s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack);  // error
    else     console.log();                 // deleted
    });
    next()
}
module.exports = deleteS3

