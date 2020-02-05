const AWS = require('aws-sdk')
AWS.config.update({region: 'ap-northeast-2'});
const ddbClient = new AWS.DynamoDB.DocumentClient({region:'ap-northeast-2'})

module.exports.receive_image_s3 = async event => {

    const s3 = new AWS.S3()
    const bucketName = "practicerepo-stack-dev-image-bucket"
    const objName = "rascal.png"
    const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: objName,
        Expires: signedUrlExpireSeconds
    })

    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(
          {
            url: url,
          },
        ),
      };
}