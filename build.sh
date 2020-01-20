#!/bin/bash
export SERVICE_FINCH="practicerepo-finch"
export SERVICE_STACK="practicerepo-stack"
export STAGE="dev"

# BUCKET=$(aws cloudformation describe-stack-resource --stack-name "$SERVICE_FINCH-$STAGE" --logical-resource-id "S3BucketFinch" --query "StackResourceDetail.PhysicalResourceId" --output text)

cd stack && npm install && sls deploy -v && cd - || exit 1

npm install && sls client deploy -v --no-confirm

#aws s3 sync "./client/dist" "s3://$SERVICE_FINCH-$STAGE" || exit 10

echo "https://practicerepo-finch-dev.s3.ap-northeast-2.amazonaws.com/index.html"