# What's here
This is a repo that demonstrates how to build and deploy a React based blog site to S3 and CloudFront.

It's also Blog Content I use to blog to arthurdayton.com

For simplicity I am taking a mono-repo approach and using GitHub actions for deployment and Terraform Cloud for state storage.

Assumes you have .aws/credentials file set up
https://registry.terraform.io/providers/hashicorp/aws/latest/docs#shared-credentials-file

## Read logs

https://aws.amazon.com/premiumsupport/knowledge-center/analyze-logs-athena/create 

```create database blog_cloudfront_access_logs_db

CREATE EXTERNAL TABLE IF NOT EXISTS blog_cloudfront_access_logs_db.arthurdaytonmybucket_logs (
`date` DATE,
time STRING,
location STRING,
bytes BIGINT,
request_ip STRING,
method STRING,
host STRING,
uri STRING,
status INT,
referrer STRING,
user_agent STRING,
query_string STRING,
cookie STRING,
result_type STRING,
request_id STRING,
host_header STRING,
request_protocol STRING,
request_bytes BIGINT,
time_taken FLOAT,
xforwarded_for STRING,
ssl_protocol STRING,
ssl_cipher STRING,
response_result_type STRING,
http_version STRING,
fle_status STRING,
fle_encrypted_fields INT,
c_port INT,
time_to_first_byte FLOAT,
x_edge_detailed_result_type STRING,
sc_content_type STRING,
sc_content_len BIGINT,
sc_range_start BIGINT,
sc_range_end BIGINT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LOCATION 's3://logs-arthurdayton.com/blog-site/'
TBLPROPERTIES ( 'skip.header.line.count'='2' )
```


##

```
yarn build
```

Run - 
```
yarn start 

or 

nodemon --watch src start
```
Audit - 


to check vulns - https://classic.yarnpkg.com/en/docs/cli/audit/

```
yarn audit --groups dependencies
```


put react-scripts is in dev dependencies - https://github.com/facebook/create-react-app/issues/11102

### This seems way better for managing vulns in React code and CI runs
https://github.com/IBM/audit-ci

Install - 
```
yarn add -D audit-ci

```

Use - 
```
npx audit-ci --config vulns/audit-ci.json

```


## GraphQL
https://www.apollographql.com/docs/react/get-started/


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
Local development / Cloud development
Config management
Cognitive load
Authorization 
API protection

TODO - terratest

Concept is that it is possible for people to understand all of this stuff but very hard to keep it all in memory and not become overly reliant on experts

Setting up x as a service and enabling teams and platform, etc. is necessary

Needs to be open and not black boxed but also usable without 

Exploring the mono-repo

Enabling local development

This proves it can be done but also highlights the hard part that is the value you have to be able to deliver on

Configuring linters and code editors

Begining to think about where team boundries might be
