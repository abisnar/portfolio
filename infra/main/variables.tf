variable "region" {
  type    = string
  default = "us-east-1"
}

variable "project" {
  type    = string
  default = "resume-app"
}

variable "github_owner" {
  type        = string
  description = "GitHub org or user that owns the repo."
}

variable "github_repo" {
  type        = string
  description = "GitHub repo name (without owner)."
}
