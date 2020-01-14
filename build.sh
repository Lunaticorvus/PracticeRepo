#!/bin/bash
export SERVICE="practicerepo"
export STAGE="dev"

npm install && sls deploy -v && cd - || exit 1

BUCKET=$(aws cloudformation describe-stack-resource --stack-name "${SERVICE}-${STAGE}" --logical-resource-id "S3BucketFinch" --query "StackResourceDetail.PhysicalResourceId" --output text)

cd stack && npm install && sls deploy -v && cd - || exit 1

aws s3 sync ./client/dist "s3://$BUCKET" || exit 1