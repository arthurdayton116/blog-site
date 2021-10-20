resource "aws_s3_bucket" "blog" {
  bucket = local.bucket_name
  acl    = "private"
  force_destroy = false
  tags = merge(
  local.base_tags,
  {
    Name = "${local.resource_prefix}-${local.bucket_name}"
    directory = basename(path.cwd)
  },
  )
}
