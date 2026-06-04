# resume-app

Personal portfolio resume site. Static React+TS frontend; serverless analytics backend (Lambda + API Gateway + DynamoDB) for the AWS path.

## Hosting

Live on **GitHub Pages** at https://abisnar.github.io/portfolio/. Pushes to `main` build the frontend and deploy via `.github/workflows/pages.yml`. The frontend degrades gracefully without a backend — when `VITE_API_ENDPOINT` is unset it uses a no-op analytics service, so Pages needs no server.

The original AWS S3/CloudFront + Lambda pipeline (`.github/workflows/deploy.yml`, `infra/`) is preserved but runs only on manual dispatch.

## Prereqs

- Node 22 (`nvm use`)
- Terraform 1.7+
- AWS CLI configured (`aws configure`) with an account you control
- A GitHub repo to push this code to

## Layout

```
frontend/   React + TS (Vite). MVC dirs: models / views / controllers / services.
backend/    Node 22 Lambda (TS). handlers / services / repositories / models.
infra/      Terraform. bootstrap/ runs once; main/ holds the live stack.
.github/    CI (PRs) and deploy (main) workflows.
```

## First-time setup (run once)

```bash
# 1. State bucket + lock table
cd infra/bootstrap
terraform init
terraform apply

# 2. Main stack (creates S3 site bucket, CloudFront, Lambda, DDB, OIDC role)
cd ../main
cp terraform.tfvars.example terraform.tfvars   # edit GitHub org/repo
terraform init
terraform apply

# 3. Wire CI/CD
#    Settings → Secrets and variables → Actions → Variables, add:
#      AWS_DEPLOY_ROLE_ARN        = output `github_actions_role_arn`
#      FRONTEND_BUCKET            = output `frontend_bucket`
#      CLOUDFRONT_DISTRIBUTION_ID = output `cloudfront_distribution_id`
#      API_ENDPOINT               = output `api_endpoint`
#      LAMBDA_TRACK_FUNCTION      = "resume-app-track"
#      LAMBDA_STATS_FUNCTION      = "resume-app-stats"
#      TF_STATE_BUCKET            = your bootstrap state bucket name
```

After that, pushes to `main` deploy automatically.

## Day-to-day

```bash
# Frontend
cd frontend && npm install && npm run dev      # http://localhost:5173
npm test                                       # Vitest
npm run build

# Backend
cd backend && npm install && npm test
npm run build                                  # esbuild → dist/

# Terraform
cd infra/main && terraform plan
```

## Editing your resume

Edit `frontend/src/data/resume.ts`. Sections are config-driven — add an entry, it renders.

## Exporting a PDF

`resume.ts` is the single source of truth for both the site and your PDF résumé. Click **Download PDF** (bottom-right on the site) to open the browser's print dialog and save — a print stylesheet (`@media print` in `index.css`) reflows the page into a clean, light, ATS-friendly one-column résumé (no nav, gradients, or animations). Update `resume.ts`, redeploy, and re-export to keep the PDF current.

## Cost expectations

Free tier covers everything for low-traffic personal use. API Gateway HTTP API drops out of the 12-month free tier at ~$1/M requests. DynamoDB on-demand for an analytics-only workload stays under the 25 RCU/WCU permanent free tier comfortably.

## Security notes

- S3 bucket private; CloudFront reads via Origin Access Control.
- API Gateway CORS locked to the CloudFront origin.
- Lambda IAM role: DDB `UpdateItem` on the one table, nothing else.
- GitHub Actions auths via OIDC — no long-lived AWS keys in repo secrets.
- CSP / HSTS / X-Frame-Options applied via CloudFront response-headers policy.
- Zod validates every Lambda payload at the boundary.
