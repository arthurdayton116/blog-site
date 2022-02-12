locals {
  base_tags       = merge(data.terraform_remote_state.shared.outputs.base_tags, { directory = basename(path.cwd) })
  resource_prefix = data.terraform_remote_state.shared.outputs.resource_prefix
  region          = data.terraform_remote_state.shared.outputs.region
  bucket_name     = data.terraform_remote_state.shared.outputs.base_domain
  cf
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

// The Canonical User ID data source allows access to the canonical user ID for the effective account in which Terraform is working.
data "aws_canonical_user_id" "current_user" {}

