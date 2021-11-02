locals {
  base_tags       = merge(data.terraform_remote_state.shared.outputs.base_tags, { directory = basename(path.cwd) })
  resource_prefix = data.terraform_remote_state.shared.outputs.resource_prefix
  region          = data.terraform_remote_state.shared.outputs.region
  bucket_name     = data.terraform_remote_state.shared.outputs.base_domain
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

