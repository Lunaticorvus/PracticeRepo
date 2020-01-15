#!/bin/bash
export SERVICE_FINCH="practicerepo-finch"
export SERVICE_STACK="practicerepo-stack"
export STAGE="dev"

BUCKET=$(aws cloudformation describe-stack-resource --stack-name "${SERVICE_FINCH}-${STAGE}" --logical-resource-id "S3BucketFinch" --query "StackResourceDetail.PhysicalResourceId" --output text)

cd stack && npm install && sls deploy -v && cd - || exit 1

npm install && sls deploy -v && || exit 1

aws s3 sync "./client/dist" "s3://$BUCKET" || exit 1