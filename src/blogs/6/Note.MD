# Static site with S3

https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html

https://docs.aws.amazon.com/athena/latest/ug/cloudfront-logs.html

CREATE EXTERNAL TABLE IF NOT EXISTS default.cloudfront_logs (
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
LOCATION 's3://logs-arthurneedsadomain.com/'
TBLPROPERTIES ( 'skip.header.line.count'='2' )

// athena works straight off of gzip files
select
cl.date,cl.time,cl.location,cl.uri,
cl.request_ip, cl.method,
cl.*
from
cloudfront_logs cl
order by cl.date, cl.time 
