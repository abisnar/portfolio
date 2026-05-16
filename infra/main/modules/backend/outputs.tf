output "api_endpoint"          { value = aws_apigatewayv2_api.http.api_endpoint }
output "track_function_name"   { value = aws_lambda_function.track.function_name }
output "stats_function_name"   { value = aws_lambda_function.stats.function_name }
output "table_name"            { value = aws_dynamodb_table.analytics.name }
