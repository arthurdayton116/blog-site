//data "aws_route53_zone" "main" {
//  name = local.bucket_name
//}

locals {
  base_tags       = data.terraform_remote_state.shared.outputs.base_tags
  resource_prefix = data.terraform_remote_state.shared.outputs.resource_prefix
  region          = data.terraform_remote_state.shared.outputs.region
  bucket_name     = data.terraform_remote_state.shared.outputs.base_domain
  alt_name        = "www.${data.terraform_remote_state.shared.outputs.base_domain}"
  log_bucket_name = data.terraform_remote_state.s3.outputs.log_bucket_name
  cert_arn        = data.terraform_remote_state.cert.outputs.www_cert_arn
  s3_web_endpoint = data.terraform_remote_state.s3.outputs.bucket_website_endpoint
  zone_id         = data.terraform_remote_state.cert.outputs.zone_id
}

data "terraform_remote_state" "shared" {
  backend = "remote"

  config = {
    organization = "blog-site"
    workspaces = {
      name = "blog-shared-workspace"
    }
  }
}

data "terraform_remote_state" "s3" {
  backend = "remote"

  config = {
    organization = "blog-site"
    workspaces = {
      name = "blog-workspace"
    }
  }
}

data "terraform_remote_state" "cert" {
  backend = "remote"

  config = {
    organization = "blog-site"
    workspaces = {
      name = "blog-dns-workspace"
    }
  }
}
