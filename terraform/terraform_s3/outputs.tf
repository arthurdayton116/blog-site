output "bucket_name" {
  value = aws_s3_bucket.a.bucket
}

output "bucket_website_endpoint" {
  value = aws_s3_bucket.a.website_endpoint
}

output "log_bucket_name" {
  value = aws_s3_bucket.log.bucket_domain_name
}

output "terraform_dir" {
  value = basename(path.cwd)
}


