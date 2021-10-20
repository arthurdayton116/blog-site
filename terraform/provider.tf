# Configure the AWS Provider
provider "aws" {
  region = local.region
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
  backend "remote" {
    organization = "blog-site"

    workspaces {
      name = "blog-workspace"
    }
  }
}
