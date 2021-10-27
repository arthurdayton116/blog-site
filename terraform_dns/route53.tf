resource "aws_route53_zone" "main" {
  name = local.bucket_name
}

//resource "aws_route53_zone" "www" {
//  name = "www.${local.bucket_name}"
//
//  tags = merge(
//    local.base_tags,
//    {
//      Name      = "${local.resource_prefix}-${local.bucket_name}-zone"
//      directory = basename(path.cwd)
//    },
//  )
//}

//resource "aws_route53_record" "dev-ns" {
//  zone_id = aws_route53_zone.main.zone_id
//  name    = "www.${local.bucket_name}"
//  type    = "NS"
//  ttl     = "30"
//  records = aws_route53_zone.main.name_servers
//}

// certificate

resource "aws_acm_certificate" "a" {
  domain_name               = local.bucket_name
  subject_alternative_names = ["www.${local.bucket_name}"]
  validation_method         = "DNS"
}

//data "aws_route53_zone" "example_com" {
//  name         = "example.com"
//  private_zone = false
//}

//data "aws_route53_zone" "example_org" {
//  name         = "example.org"
//  private_zone = false
//}

resource "aws_route53_record" "example" {
  for_each = {
    for dvo in aws_acm_certificate.a.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = aws_route53_zone.main.zone_id
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}

resource "aws_acm_certificate_validation" "example" {
  certificate_arn         = aws_acm_certificate.a.arn
  validation_record_fqdns = [for record in aws_route53_record.example : record.fqdn]
}

resource "aws_route53_record" "gmail_mx" {
  zone_id = aws_route53_zone.main.zone_id
  name    = ""
  type    = "MX"

  records = [
    "1 ASPMX.L.GOOGLE.COM",
    "5 ALT1.ASPMX.L.GOOGLE.COM",
    "5 ALT2.ASPMX.L.GOOGLE.COM",
    "10 ALT3.ASPMX.L.GOOGLE.COM",
    "10 ALT4.ASPMX.L.GOOGLE.COM",
  ]

  ttl = "300"
}
