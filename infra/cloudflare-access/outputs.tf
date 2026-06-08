output "const_access_application_id" {
  description = "Cloudflare Access application ID for the const path. Treat as environment metadata, not a secret."
  value       = cloudflare_zero_trust_access_application.const.id
}

output "const_access_policy_id" {
  description = "Cloudflare Access policy ID attached to the const application. Treat as environment metadata, not a secret."
  value       = cloudflare_zero_trust_access_policy.const.id
}

output "const_access_destination_uris" {
  description = "Exact Access destination coverage for reviewer inspection."
  value       = local.const_access_destination_uris
}
