

locals {
  s3_origin_id = "${local.resource_prefix}_${local.bucket_name}_a"
}

resource "aws_cloudfront_distribution" "s3_distribution_a" {
  origin {
    domain_name = data.aws_s3_bucket.a.website_endpoint
    origin_id   = local.s3_origin_id

    // https://github.com/hashicorp/terraform-provider-aws/issues/7847
    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
    //    s3_origin_config {
    //      origin_access_identity = "origin-access-identity/cloudfront/ABCDEFG1234567"
    //    }
  }

  enabled         = true
  is_ipv6_enabled = true
  //  comment             = ""
  default_root_object = "index.html"

  //  logging_config {
  //    include_cookies = false
  //    bucket          = "mylogs.s3.amazonaws.com"
  //    prefix          = "myprefix"
  //  }

  aliases = [local.bucket_name, local.redirect_bucket_name]

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

  # Cache behavior with precedence 0
  //  ordered_cache_behavior {
  //    path_pattern     = "*"
  //    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
  //    cached_methods   = ["GET", "HEAD", "OPTIONS"]
  //    target_origin_id = local.s3_origin_id
  //
  //    forwarded_values {
  //      query_string = false
  //      headers      = ["Origin"]
  //
  //      cookies {
  //        forward = "none"
  //      }
  //    }
  //
  //    min_ttl                = 0
  //    default_ttl            = 86400
  //    max_ttl                = 31536000
  //    compress               = true
  //    viewer_protocol_policy = "redirect-to-https"
  //  }

  //  # Cache behavior with precedence 1
  //  ordered_cache_behavior {
  //    path_pattern     = "/images/*"
  //    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
  //    cached_methods   = ["GET", "HEAD"]
  //    target_origin_id = local.s3_origin_id
  //
  //    forwarded_values {
  //      query_string = false
  //
  //      cookies {
  //        forward = "none"
  //      }
  //    }
  //
  //    min_ttl                = 0
  //    default_ttl            = 3600
  //    max_ttl                = 86400
  //    compress               = true
  //    viewer_protocol_policy = "redirect-to-https"
  //  }

  price_class = "PriceClass_All"

  restrictions {

    geo_restriction {
      restriction_type = "none"
      //          locations        = ["US", "CA", "GB", "DE"]
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
    acm_certificate_arn = data.aws_acm_certificate.amazon_issued.arn
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "www.${local.bucket_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution_a.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution_a.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "a" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = local.bucket_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution_a.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution_a.hosted_zone_id
    evaluate_target_health = false
  }
}
