output "frontend_bucket" {
  value = module.frontend.bucket_name
}

output "cloudfront_distribution_id" {
  value = module.frontend.distribution_id
}

output "cloudfront_domain_name" {
  value = module.frontend.cloudfront_domain_name
}

output "api_endpoint" {
  value = module.backend.api_endpoint
}

output "github_actions_role_arn" {
  value = module.github_oidc.role_arn
}
