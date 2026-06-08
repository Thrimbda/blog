variable "account_id" {
  description = "Cloudflare account ID that owns the Zero Trust Access policy. Provide via private tfvars or environment-specific automation."
  type        = string
  sensitive   = true
}

variable "zone_id" {
  description = "Cloudflare zone ID for the public site hostname. Provide via private tfvars or environment-specific automation."
  type        = string
  sensitive   = true
}

variable "site_hostname" {
  description = "Public hostname to protect, without scheme or path, for example example.com. Do not include private team domains."
  type        = string

  validation {
    condition     = can(regex("^[A-Za-z0-9.-]+$", var.site_hostname)) && !can(regex("/", var.site_hostname))
    error_message = "site_hostname must be a hostname only, without scheme or path."
  }
}

variable "const_path" {
  description = "Site path to protect with Cloudflare Access. Defaults to const and is normalized without leading/trailing slashes."
  type        = string
  default     = "const"

  validation {
    condition     = length(trim(var.const_path, "/")) > 0 && !can(regex("//", var.const_path))
    error_message = "const_path must contain a non-empty single path segment or path prefix without duplicate slashes."
  }
}

variable "application_name" {
  description = "Display name for the Cloudflare Access application."
  type        = string
  default     = "const"
}

variable "policy_name" {
  description = "Display name for the reusable Cloudflare Access policy."
  type        = string
  default     = "Allow const access"
}

variable "policy_decision" {
  description = "Cloudflare Access policy decision. Keep allow unless intentionally designing a different private policy."
  type        = string
  default     = "allow"

  validation {
    condition     = contains(["allow", "deny", "non_identity", "bypass"], var.policy_decision)
    error_message = "policy_decision must be one of allow, deny, non_identity, or bypass."
  }
}

variable "access_policy_include" {
  description = "Private Access include rules in Cloudflare provider v5 object syntax, for example [{ group = { id = \"REPLACE_WITH_ACCESS_GROUP_ID\" } }]. Do not commit real emails, domains, group IDs, IdP IDs, or service token IDs."
  type        = any
  sensitive   = true
}

variable "access_policy_require" {
  description = "Optional private Access require rules in Cloudflare provider v5 object syntax."
  type        = any
  sensitive   = true
  default     = null
}

variable "access_policy_exclude" {
  description = "Optional private Access exclude rules in Cloudflare provider v5 object syntax."
  type        = any
  sensitive   = true
  default     = null
}

variable "session_duration" {
  description = "Access application and policy session duration."
  type        = string
  default     = "24h"
}
