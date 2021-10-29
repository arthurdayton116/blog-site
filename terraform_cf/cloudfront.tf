locals {
  s3_origin_id = "${local.resource_prefix}_${local.bucket_name}_a"
}

resource "aws_cloudfront_distribution" "s3_distribution_a" {
  origin {
    domain_name = local.s3_web_endpoint
    origin_id   = local.s3_origin_id

    // https://github.com/hashicorp/terraform-provider-aws/issues/7847
    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  enabled         = true
  is_ipv6_enabled = true
  //  comment             = ""
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = local.log_bucket_name
    prefix          = local.resource_prefix
  }

  aliases = [local.bucket_name, local.alt_name]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_All"

  restrictions {

    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = merge(
    local.base_tags,
    {
      Name      = "${local.resource_prefix}-${local.bucket_name}"
      directory = basename(path.cwd)
    },
  )

  viewer_certificate {
    acm_certificate_arn = local.cert_arn
    ssl_support_method  = "sni-only"
  }
}

// Create subdomain A record pointing to Cloudfront distribution
resource "aws_route53_record" "www" {
  zone_id = local.zone_id
  name    = "www.${local.bucket_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution_a.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution_a.hosted_zone_id
    evaluate_target_health = false
  }
}

// Create domain A record pointing to Cloudfront distribution
resource "aws_route53_record" "a" {
  zone_id = local.zone_id
  name    = local.bucket_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution_a.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution_a.hosted_zone_id
    evaluate_target_health = false
  }
}
