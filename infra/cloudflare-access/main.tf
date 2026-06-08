locals {
  normalized_const_path       = trim(var.const_path, "/")
  const_access_path           = "/${local.normalized_const_path}"
  const_access_primary_domain = "${var.site_hostname}${local.const_access_path}"
  const_access_destination_uris = [
    local.const_access_primary_domain,
    "${local.const_access_primary_domain}/",
    "${local.const_access_primary_domain}/*",
  ]
}

resource "cloudflare_zero_trust_access_policy" "const" {
  account_id       = var.account_id
  name             = var.policy_name
  decision         = var.policy_decision
  include          = var.access_policy_include
  require          = var.access_policy_require
  exclude          = var.access_policy_exclude
  session_duration = var.session_duration
}

resource "cloudflare_zero_trust_access_application" "const" {
  zone_id          = var.zone_id
  name             = var.application_name
  type             = "self_hosted"
  domain           = local.const_access_primary_domain
  session_duration = var.session_duration

  destinations = [
    for uri in local.const_access_destination_uris : {
      type = "public"
      uri  = uri
    }
  ]

  policies = [{
    id         = cloudflare_zero_trust_access_policy.const.id
    precedence = 1
  }]
}
