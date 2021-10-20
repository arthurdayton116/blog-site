# Configure the AWS Provider
provider "aws" {
  region = local.region
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 3.63"
    }
  }
  backend "remote" {
    organization = "blog-site"

    workspaces {
      name = "blog-workspace"
    }
  }
}
