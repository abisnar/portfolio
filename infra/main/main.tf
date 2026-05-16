module "frontend" {
  source  = "./modules/frontend"
  project = var.project
}

module "backend" {
  source      = "./modules/backend"
  project     = var.project
  region      = var.region
  cors_origin = "https://${module.frontend.cloudfront_domain_name}"
}

module "github_oidc" {
  source                      = "./modules/github-oidc"
  project                     = var.project
  github_owner                = var.github_owner
  github_repo                 = var.github_repo
  frontend_bucket_arn         = module.frontend.bucket_arn
  cloudfront_distribution_arn = module.frontend.distribution_arn
  lambda_track_function_name  = module.backend.track_function_name
  lambda_stats_function_name  = module.backend.stats_function_name
}
