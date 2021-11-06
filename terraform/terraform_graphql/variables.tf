variable "OKTA_CLIENT_ID" {
  description = "Client ID from API app in OKTA"
}

variable "OKTA_CLIENT_SECRET" {
  description = "Client Secret from API app in OKTA"
}

variable "OKTA_DOMAIN" {
  description = "From authorization server in OKTA"
  default     = "dev-[YOUR#s].okta.com"
}

variable "OKTA_ISSUER_SUFFIX" {
  description = "From authorization server in OKTA"
  default     = "/oauth2/[YOUR#s]"
}

variable "OKTA_AUDIENCE" {
  description = "From authorization server in OKTA"
  default     = "A mostly arbitrary value"
}
