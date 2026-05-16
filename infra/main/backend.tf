terraform {
  backend "s3" {
    # Fill in via `terraform init -backend-config=...` or edit here.
    # bucket         = "resume-app-tfstate-CHANGEME-12345"
    # key            = "main/terraform.tfstate"
    # region         = "us-east-1"
    # dynamodb_table = "resume-app-tf-locks"
    # encrypt        = true
  }
}
