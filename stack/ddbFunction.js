const AWS = require('aws-sdk')
AWS.config.update({region: 'ap-northeast-2'});
const ddbClient = new AWS.DynamoDB.DocumentClient({region:'ap-northeast-2'})

module.exports.send_and_receive_from_ddb = async event => {
    
    
    const d = new Date()
    const time = d.toUTCString()
    
    const input = JSON.parse(event.body).text

    
    const table = "practicerepo-stack-dev-table"

    var params = {
        TableName: table,
        Item: {
            inputText: input,
            inputTime: time,
        }
    }

    var msg = "default"
    await ddbClient.put(params, err => {
        if (err) {
            msg = err
        } else {
            msg = "success with ddb"
        }
    }).promise()

    params = {
        TableName: table,
        ProjectionExpression: "inputText, inputTime"
    }

    try {
        //const data = await ddbClient.scan(params).promise();
        let scanResults = [];
        let items;
        do{
            items =  await ddbClient.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey  = items.LastEvaluatedKey;
        }while(typeof items.LastEvaluatedKey != "undefined");
        return { 
            statusCode: 200,
            body: JSON.stringify(scanResults),
            headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
            },
        };
      } catch (error) {
        return {
          statusCode: 400,
          error: `Could not fetch: ${error.stack}`,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
            },
        };
      }


    // return {
    //     statusCode: 200,
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': '*'
    //     },
    //     body: JSON.stringify(
    //         {
    //         message: msg,
    //         data: dataSet,
    //         },
    //     ),
    // };
}