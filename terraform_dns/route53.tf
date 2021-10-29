// hosted zone
resource "aws_route53_zone" "main" {
  name = local.bucket_name
}

// gmail record
resource "aws_route53_record" "gmail_mx" {
  zone_id = aws_route53_zone.main.zone_id
  name    = local.bucket_name
  type    = "MX"

  records = [
    "1  ASPMX.L.GOOGLE.COM",
    "5  ALT1.ASPMX.L.GOOGLE.COM",
    "5  ALT2.ASPMX.L.GOOGLE.COM",
    "10 ALT3.ASPMX.L.GOOGLE.COM",
    "10 ALT4.ASPMX.L.GOOGLE.COM",
  ]

  ttl = "300"
}
