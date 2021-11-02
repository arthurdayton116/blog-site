output "base_url" {
  value = aws_api_gateway_deployment.gql.invoke_url
}

output "graphql_domain_endpoint" {
  value = aws_api_gateway_domain_name.graphql.domain_name
}

output "lambda_function_name" {
  value = aws_lambda_function.gql_lambda.function_name
}
//output "ecr" {
//  value = aws_ecr_repository.lambda
//}
