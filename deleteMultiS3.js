const aws = require('aws-sdk');

const deleteMultiS3 = (req,res, next, photoArray) => {

    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-2',
    });   
    var params = {  Bucket: process.env.S3_BUCKET, Delete: {Objects: photoArray} };

    const s3 = new aws.S3();

    s3.deleteObjects(params, function(err, data) {
    if (err) console.log(err, err.stack);  // error
    else     console.log();                 // deleted
    });
    next()
}
module.exports = deleteMultiS3

