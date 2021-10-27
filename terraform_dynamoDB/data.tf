locals {
  base_tags       = data.terraform_remote_state.shared.outputs.base_tags
  resource_prefix = data.terraform_remote_state.shared.outputs.resource_prefix
  region          = data.terraform_remote_state.shared.outputs.region
  bucket_name     = data.terraform_remote_state.shared.outputs.base_domain
  alt_name        = "www.${data.terraform_remote_state.shared.outputs.base_domain}"
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
