# What's here
This folder contains Terraform code to deploy S3 buckets for deploying React app and logs.

## Set up logs in Athena 
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

