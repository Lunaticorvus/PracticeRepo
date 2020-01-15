#!/bin/bash
export SERVICE_FINCH="practicerepo-finch"
export SERVICE_STACK="practicerepo-stack"
export STAGE="dev"

# BUCKET=$(aws cloudformation describe-stack-resource --stack-name "$SERVICE_FINCH-$STAGE" --logical-resource-id "S3BucketFinch" --query "StackResourceDetail.PhysicalResourceId" --output text)

cd stack && npm install && sls deploy -v && cd - || exit 1

npm install

yes | sls client deploy -v

aws s3 sync "./client/dist" "s3://$SERVICE_FINCH-$STAGE" || exit 1