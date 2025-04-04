data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "ssm_access_policy" {
  statement {
    effect  = "Allow"
    actions = ["ssm:GetParameters", "secretsmanager:GetSecretValue"]
    resources = [
      aws_ssm_parameter.database_uri.arn,
      aws_ssm_parameter.jwt_secret.arn
    ]
  }
}
