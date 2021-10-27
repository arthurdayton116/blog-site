locals {
  // Split path into directories
  dir_path_array = split("/", path.cwd)
  // get length of resulting array
  dpl = length(local.dir_path_array)
  // put it back together with last two dirs (non zero index array)
  dir_path_tag = join("/", slice(local.dir_path_array, local.dpl - 2, local.dpl))

  // Common Vars
  base_tags = merge(
    data.terraform_remote_state.shared.outputs.base_tags,
    {
      directory = local.dir_path_tag
    },
  )

  //DB
  dynamo_arn        = data.terraform_remote_state.dynamodb.outputs.dynamo_db_arn
  dynamo_table_name = data.terraform_remote_state.dynamodb.outputs.dynamo_db_table_name
  dynamo_hash_key   = data.terraform_remote_state.dynamodb.outputs.dynamo_db_hash_key
  resource_prefix   = data.terraform_remote_state.shared.outputs.resource_prefix
  region            = data.terraform_remote_state.shared.outputs.region
  bucket_name       = data.terraform_remote_state.shared.outputs.base_domain
  alt_name          = "www.${data.terraform_remote_state.shared.outputs.base_domain}"
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

data "terraform_remote_state" "dynamodb" {
  backend = "remote"

  config = {
    organization = "blog-site"
    workspaces = {
      name = "blog-dynamodb-workspace"
    }
  }
}

