variable "okta_client_id" {
  description = "Client ID from API app in OKTA"
}

variable "okta_client_secret" {
  description = "Client Secret from API app in OKTA"
  sensitive   = true
}

variable "okta_domain" {
  description = "From authorization server in OKTA"
  default     = "dev-[YOUR#s].okta.com"
}

variable "okta_issuer_suffix" {
  description = "From authorization server in OKTA"
  default     = "/oauth2/[YOUR#s]"
}

variable "okta_audience" {
  description = "From authorization server in OKTA"
  default     = "A mostly arbitrary value"
}
