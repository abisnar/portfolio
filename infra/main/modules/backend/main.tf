resource "aws_dynamodb_table" "analytics" {
  name         = "${var.project}-analytics"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "event"

  attribute {
    name = "event"
    type = "S"
  }

  point_in_time_recovery { enabled = true }

  server_side_encryption { enabled = true }
}

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${var.project}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "lambda_ddb" {
  statement {
    actions   = ["dynamodb:UpdateItem", "dynamodb:Scan"]
    resources = [aws_dynamodb_table.analytics.arn]
  }
}

resource "aws_iam_role_policy" "lambda_ddb" {
  role   = aws_iam_role.lambda.id
  policy = data.aws_iam_policy_document.lambda_ddb.json
}

# Placeholder bundle for the first apply (before any CI build has happened).
# After the first deploy CI overwrites the function code via update-function-code.
data "archive_file" "placeholder" {
  type        = "zip"
  output_path = "${path.module}/placeholder.zip"
  source {
    content  = "export const handler = async () => ({ statusCode: 200, body: 'placeholder' });"
    filename = "index.mjs"
  }
}

resource "aws_lambda_function" "track" {
  function_name    = "${var.project}-track"
  role             = aws_iam_role.lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  filename         = data.archive_file.placeholder.output_path
  source_code_hash = data.archive_file.placeholder.output_base64sha256
  timeout          = 5
  memory_size      = 256

  environment {
    variables = {
      TABLE_NAME  = aws_dynamodb_table.analytics.name
      CORS_ORIGIN = var.cors_origin
    }
  }

  lifecycle {
    # CI uploads new bundles; ignore drift on code.
    ignore_changes = [filename, source_code_hash]
  }
}

resource "aws_lambda_function" "stats" {
  function_name    = "${var.project}-stats"
  role             = aws_iam_role.lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  filename         = data.archive_file.placeholder.output_path
  source_code_hash = data.archive_file.placeholder.output_base64sha256
  timeout          = 5
  memory_size      = 256

  environment {
    variables = {
      TABLE_NAME  = aws_dynamodb_table.analytics.name
      CORS_ORIGIN = var.cors_origin
    }
  }

  lifecycle {
    ignore_changes = [filename, source_code_hash]
  }
}

resource "aws_cloudwatch_log_group" "track" {
  name              = "/aws/lambda/${aws_lambda_function.track.function_name}"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "stats" {
  name              = "/aws/lambda/${aws_lambda_function.stats.function_name}"
  retention_in_days = 14
}

resource "aws_apigatewayv2_api" "http" {
  name          = "${var.project}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [var.cors_origin]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_integration" "track" {
  api_id                 = aws_apigatewayv2_api.http.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.track.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_integration" "stats" {
  api_id                 = aws_apigatewayv2_api.http.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.stats.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "track" {
  api_id    = aws_apigatewayv2_api.http.id
  route_key = "POST /track"
  target    = "integrations/${aws_apigatewayv2_integration.track.id}"
}

resource "aws_apigatewayv2_route" "stats" {
  api_id    = aws_apigatewayv2_api.http.id
  route_key = "GET /stats"
  target    = "integrations/${aws_apigatewayv2_integration.stats.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 20
    throttling_rate_limit  = 10
  }
}

resource "aws_lambda_permission" "track_invoke" {
  statement_id  = "AllowAPIGatewayInvokeTrack"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.track.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http.execution_arn}/*/*"
}

resource "aws_lambda_permission" "stats_invoke" {
  statement_id  = "AllowAPIGatewayInvokeStats"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.stats.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http.execution_arn}/*/*"
}
