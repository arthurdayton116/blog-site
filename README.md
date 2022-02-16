# What's here
This is a repo that demonstrates how to build and deploy a Serverless application.

It uses React to create a blog site deployed into an S3 bucket fronted by CloudFront.

You can see a working example, including an explanation of how I designed and built it, at arthurdayton.com

For simplicity I am taking a mono-repo approach and using GitHub actions for deployment and Terraform Cloud for state storage.

## Explanation
<a> 

## Folder Structure

### .github/workflows
Contains workflpw file for GitHub Actions

### ui
Contains React project for deploying UI

### Terraform
Contains multiple subfolders for deploying infrastructure needed to deploy and run blog site on AWS

#### terraform_cf
Contains code for deploying cloudfront distribution of site

##### terraform_dns
Contains code for deploying dns records and certificate 

#### terraform_dynamoDB
Contains code for deploying DynamoDB table and indexes.

#### terraform_grahql
Contains code for building and deploying graphql server on lambda.

#### terraform_s3
Contains code for deploying S3 bucket used as source for cloud front distribution.

#### terraform_shared
Contains code for creating remote state outputs used by other terraform directories.

#### terraform_sns
Contains code for creating simple notification topic.

## Maybe someday 
Azure approach - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website


## Concepts illustrated
DevOps
Team Topologies
Scaling in enterprise context
Growing across the stack
GraphQL
Serverless / S3 / Cloudfront / API Gateway
React
GitHub Actions CI/CD
Terraform / Cloud / Workspaces / Remote State / Tagging
Local development w/ Docker / Cloud development
Automated testing w/ Cypress
Config management
Cognitive load
Authorization w/ Okta
API protection





