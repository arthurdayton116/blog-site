// root domain bucket and policy
resource "aws_s3_bucket" "a" {
  bucket = local.bucket_name
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
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

resource "aws_s3_bucket_policy" "a" {
  bucket = aws_s3_bucket.a.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression's result to valid JSON syntax.
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

// redirect bucket and policy
resource "aws_s3_bucket" "b" {
  bucket        = local.redirect_bucket_name
  acl           = "public-read"
  force_destroy = true

  website {
    redirect_all_requests_to = "https://${local.bucket_name}"
  }

  tags = merge(
    local.base_tags,
    {
      Name      = "${local.resource_prefix}-${local.redirect_bucket_name}"
      directory = basename(path.cwd)
    },
  )
}

resource "aws_s3_bucket_policy" "b" {
  bucket = aws_s3_bucket.b.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression's result to valid JSON syntax.
  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "${local.resource_prefix}-${local.redirect_bucket_name}-policy"
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
          aws_s3_bucket.b.arn,
          "${aws_s3_bucket.b.arn}/*",
        ]
      },
    ]
  })
}
