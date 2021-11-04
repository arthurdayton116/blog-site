// root domain bucket and policy

// Clean up bucket for destroy aws s3 rm s3://bucketname --recursive
resource "aws_s3_bucket" "a" {
  bucket = local.bucket_name

  // For a React site the index needs to be error document as well and React needs to handle errors
  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  logging {
    target_bucket = aws_s3_bucket.log.id
    target_prefix = "s3-log/"
  }
  force_destroy = true
  tags = merge(
    local.base_tags,
    {
      Name      = "${local.resource_prefix}-${local.bucket_name}"
      directory = basename(path.cwd)
    },
  )
}

resource "aws_s3_bucket" "log" {
  bucket = "logs-${local.bucket_name}"

  force_destroy = true

  grant {
    type        = "Group"
    permissions = ["READ_ACP", "WRITE"]
    uri         = "http://acs.amazonaws.com/groups/s3/LogDelivery"
  }

  //CloudFront
  grant {
    id          = "c4c1ede66af53448b93c283ce9448c4ba468c9432aa01d700d3878632f77d2d0"
    permissions = ["FULL_CONTROL", ]
    type        = "CanonicalUser"
  }

  grant {
    id          = data.aws_canonical_user_id.current_user.id
    type        = "CanonicalUser"
    permissions = ["FULL_CONTROL"]
  }

  tags = merge(
    local.base_tags,
    {
      Name = "${local.resource_prefix}-logs-${local.bucket_name}"
    },
  )
}

resource "aws_s3_bucket_object" "log_query_folder" {
  bucket = aws_s3_bucket.log.id
  acl    = "private"
  key    = "queryResults/"
  source = "/dev/null"
}
// This ensures that bucket content can be read publicly
// I like setting it up this way so it's easier to test changes
// Check here for different setups  - https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/
// Policy limits to specific bucket
resource "aws_s3_bucket_policy" "a" {
  bucket = aws_s3_bucket.a.id

  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "${local.resource_prefix}-${local.bucket_name}-policy"
    Statement = [
      {
        Sid       = "PublicRead"
        Effect    = "Allow"
        Principal = "*"
        Action = [
          "s3:GetObject",
          "s3:GetObjectVersion"
        ]
        Resource = [
          aws_s3_bucket.a.arn,
          "${aws_s3_bucket.a.arn}/*",
        ]
      },
    ]
  })
}
