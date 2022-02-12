//domain certificate
resource "aws_acm_certificate" "a" {
  domain_name               = local.bucket_name
  subject_alternative_names = ["www.${local.bucket_name}"]
  validation_method         = "DNS"
}

// validate that we have control over domain so our certificate is trusted
resource "aws_acm_certificate_validation" "example" {
  certificate_arn = aws_acm_certificate.a.arn
  // loop route records which are the domain name and subject_alternative_names from aws_acm_certificate resource
  validation_record_fqdns = [for record in aws_route53_record.example : record.fqdn]
}


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

// graphql certificate
resource "aws_acm_certificate" "graphql" {
  domain_name               = local.bucket_name
  subject_alternative_names = ["graphql.${local.bucket_name}"]
  validation_method         = "DNS"
}

resource "aws_acm_certificate_validation" "graphql" {
  certificate_arn         = aws_acm_certificate.graphql.arn
  validation_record_fqdns = [for record in aws_route53_record.graphql : record.fqdn]
}


resource "aws_route53_record" "graphql" {
  for_each = {
    for dvo in aws_acm_certificate.graphql.domain_validation_options : dvo.domain_name => {
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
