output "bucket_name" {
  value = aws_s3_bucket.blog_domain.bucket
}

output "redirect_bucket_name" {
  value = aws_s3_bucket.blog_domain_redirect.bucket
}
