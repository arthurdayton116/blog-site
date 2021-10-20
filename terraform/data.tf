variable "base_tags" {
  default = {
    owner       = "blog-site"
    createdBy   = "terraform"
    environment = "dev"
    billTo      = "study"
  }
  description = "base resource tags"
  type        = map(string)
}

variable "resource_prefix" {
  description = "Common prefix for resource names"
  default     = "blog-site"
}

variable "region" {
  description = "Where resources will be deployed"
  default     = "us-west-2"
}

locals {
  base_tags            = var.base_tags
  resource_prefix      = var.resource_prefix
  region               = var.region
  bucket_name          = var.base_domain
  redirect_bucket_name = "www.${var.base_domain}"
}
