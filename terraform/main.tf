resource "aws_s3_bucket" "blog_domain" {
  bucket        = local.bucket_name
  acl           = "public"
  force_destroy = false
  tags = merge(
    local.base_tags,
    {
      Name      = "${local.resource_prefix}-${local.bucket_name}"
      directory = basename(path.cwd)
    },
  )
}

resource "aws_s3_bucket" "blog_domain_redirect" {
  bucket        = local.redirect_bucket_name
  acl           = "public"
  force_destroy = false
  tags = merge(
    local.base_tags,
    {
      Name      = "${local.resource_prefix}-${local.redirect_bucket_name}"
      directory = basename(path.cwd)
    },
  )
}
