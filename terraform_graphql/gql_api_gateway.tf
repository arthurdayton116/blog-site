# Create an API endpoint for graphql lambda
resource "aws_api_gateway_rest_api" "gql" {
  name        = "BlogGraphql"
  description = "Terraform Serverless GraphQL Example"
}

resource "aws_api_gateway_account" "gql" {
  cloudwatch_role_arn = aws_iam_role.cloudwatch.arn
}

resource "aws_iam_role" "cloudwatch" {
  name = "${local.resource_prefix}-api_gateway_cloudwatch_global_gql"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    "Statement" : [
      {
        Sid : "",
        Effect : "Allow",
        Principal : {
          Service : "apigateway.amazonaws.com"
        },
        Action : "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "cloudwatch_gql" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
  role       = aws_iam_role.cloudwatch.name
}

// Creates method in api gateway for graphql
// https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
resource "aws_api_gateway_resource" "gql_method" {
  rest_api_id = aws_api_gateway_rest_api.gql.id
  parent_id   = aws_api_gateway_rest_api.gql.root_resource_id
  path_part   = "graphql"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.gql.id
  resource_id   = aws_api_gateway_resource.gql_method.id
  http_method   = "POST"
  authorization = "NONE"
}

// point api to lambda for execution
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.gql.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.gql_lambda.invoke_arn
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.gql.id
  resource_id = aws_api_gateway_method.proxy_root.resource_id
  http_method = aws_api_gateway_method.proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.gql_lambda.invoke_arn
}

resource "aws_api_gateway_deployment" "gql" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root,
  ]

  rest_api_id = aws_api_gateway_rest_api.gql.id
  stage_name  = local.stage_name
}

resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.gql.id
  resource_id   = aws_api_gateway_rest_api.gql.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

// Create a custom domain for api
resource "aws_api_gateway_domain_name" "graphql" {
  certificate_arn = local.graphql_cert_arn
  domain_name     = "graphql.${local.bucket_name}"
}

// This creates an A record in Route 53 for graphql subdomain
resource "aws_route53_record" "graphql" {
  name    = aws_api_gateway_domain_name.graphql.domain_name
  type    = "A"
  zone_id = local.zone_id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.graphql.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.graphql.cloudfront_zone_id
  }
}

// this maps the custom domain to the api
resource "aws_api_gateway_base_path_mapping" "example" {
  api_id      = aws_api_gateway_rest_api.gql.id
  stage_name  = local.stage_name
  domain_name = aws_api_gateway_domain_name.graphql.domain_name
}
