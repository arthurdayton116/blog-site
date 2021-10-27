variable "base_tags" {
  default = {
    owner       = "blog-site"
    createdBy   = "terraform"
    environment = "development"
    billTo      = "study"
  }
  description = "base resource tags"
  type        = map(string)
}

output "base_tags" {
  description = "base resource tags"
  value       = var.base_tags
}

variable "resource_prefix" {
  description = "Common prefix for resource names"
  default     = "blog-site"
}

output "resource_prefix" {
  description = "Common prefix for resource names"
  value       = var.resource_prefix
}

variable "region" {
  description = "Where resources will be deployed"
  default     = "us-east-1"
}

output "region" {
  description = "Where resources will be deployed"
  value       = var.region
}

variable "base_domain" {
  default     = "the name of my bucket"
  description = "What my base bucket name will be for s3 bucket"
}

output "base_domain" {
  description = "What my base bucket name will be for s3 bucket"
  value       = var.base_domain
}
