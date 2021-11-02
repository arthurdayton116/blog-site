output "graphql_cert_arn" {
  value = aws_acm_certificate.graphql.arn
}

output "www_cert_arn" {
  value = aws_acm_certificate.a.arn
}

output "zone_id" {
  value = aws_route53_zone.main.zone_id
}
