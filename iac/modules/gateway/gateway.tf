resource "aws_apigatewayv2_api" "gateway" {
  name          = var.http_api_name
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lb_integration" {
  api_id           = aws_apigatewayv2_api.gateway.id
  integration_type = "HTTP_PROXY"

  integration_method = "ANY"
  integration_uri    = "http://${var.load_balancer_dns}/{proxy}"
}

resource "aws_apigatewayv2_route" "route" {
  api_id    = aws_apigatewayv2_api.gateway.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lb_integration.id}"
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id      = aws_apigatewayv2_api.gateway.id
  name        = "$default"
  auto_deploy = true
}
